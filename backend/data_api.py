import os
import httpx
from dotenv import load_dotenv

load_dotenv()

DATA_API_URL = os.getenv("MONGODB_DATA_API_URL")
DATA_API_KEY = os.getenv("MONGODB_DATA_API_KEY")
DATA_SOURCE = os.getenv("MONGODB_DATA_SOURCE", "Cluster0")
DATABASE_NAME = os.getenv("MONGO_DB_NAME", "about_me")


async def _call(action: str, body: dict) -> dict:
    if not DATA_API_URL or not DATA_API_KEY:
        raise RuntimeError("MONGODB_DATA_API_URL and MONGODB_DATA_API_KEY must be set")

    url = f"{DATA_API_URL}/action/{action}"
    headers = {
        "Content-Type": "application/json",
        "api-key": DATA_API_KEY,
    }
    payload = {
        "dataSource": DATA_SOURCE,
        "database": DATABASE_NAME,
        **body,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(url, json=payload, headers=headers)
        resp.raise_for_status()
        return resp.json()


async def data_insert_contact(name: str, email: str, phone_num: str, message: str | None = None) -> bool:
    try:
        result = await _call("insertOne", {
            "collection": "contact",
            "document": {
                "name": name,
                "email": email,
                "phone_num": phone_num,
                "message": message,
            },
        })
        return result.get("insertedId") is not None
    except Exception as e:
        print(f"Error inserting contact info via Data API: {e}")
        return False


async def data_rag_pipeline(
    embedding_vector: list[float],
    query_text: str,
    collection_name: str = "about",
    index_name: str = "vector_index",
    vector_field: str = "question_embeddings",
    text_field: str = "answer",
    top_k: int = 2,
    candidate_pool: int = 10,
    alpha: float = 0.5,
) -> list[dict]:
    try:
        from rank_bm25 import BM25Okapi

        result = await _call("aggregate", {
            "collection": collection_name,
            "pipeline": [
                {
                    "$vectorSearch": {
                        "index": index_name,
                        "queryVector": embedding_vector,
                        "path": vector_field,
                        "numCandidates": candidate_pool,
                        "limit": candidate_pool,
                    }
                },
                {
                    "$project": {
                        text_field: 1,
                        "score": {"$meta": "vectorSearchScore"},
                    }
                },
            ],
        })

        documents = result.get("documents", [])
        if not documents:
            return []

        corpus = [doc.get(text_field, "") for doc in documents]
        tokenized_corpus = [doc.split() for doc in corpus]
        bm25 = BM25Okapi(tokenized_corpus)
        tokenized_query = query_text.split()
        bm25_scores = bm25.get_scores(tokenized_query)

        vector_scores = [doc.get("score", 0.0) for doc in documents]

        def normalize(scores):
            lo, hi = min(scores), max(scores)
            if hi - lo == 0:
                return [0.0 for _ in scores]
            return [(s - lo) / (hi - lo) for s in scores]

        norm_vector = normalize(vector_scores)
        norm_bm25 = normalize(bm25_scores)

        for doc, v, b in zip(documents, norm_vector, norm_bm25):
            doc["hybrid_score"] = alpha * v + (1 - alpha) * b

        documents.sort(key=lambda d: d["hybrid_score"], reverse=True)

        context = []
        for doc in documents[:top_k]:
            context.append({
                "answer": doc.get(text_field, ""),
                "score": doc.get("hybrid_score", 0.0),
            })

        return context

    except Exception as e:
        print(f"Error performing vector search via Data API: {e}")
        return []
