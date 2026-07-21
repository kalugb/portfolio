import pymongo
import os
import sys
from rank_bm25 import BM25Okapi

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


async def insert_contact_info(
    mongodb_client: pymongo.MongoClient | None,
    name: str,
    email: str,
    phone_num: str,
    message: str = None,
) -> bool:
    if mongodb_client is None:
        print("MongoDB client is not available. Cannot insert contact info.")
        return False

    try:
        collection = mongodb_client["contact"]
        contact_info = {
            "name": name,
            "email": email,
            "phone_num": phone_num,
            "message": message,
        }

        result = collection.insert_one(contact_info)

        if result.acknowledged:
            print(f"Contact info inserted with ID: {result.inserted_id}")
            return result.acknowledged
        else:
            print("Failed to insert contact info.")
            return False

    except Exception as e:
        print(f"Error inserting contact info: {e}")
        return False


async def rag_pipeline(
    mongodb_client: pymongo.MongoClient | None,
    embedding_vector: list,
    query_text: str,
    collection_name: str = "about",
    index_name: str = "vector_index",
    vector_field: str = "question_embeddings",
    text_field: str = "answer",
    top_k: int = 2,
    candidate_pool: int = 10,
    alpha: float = 0.5,
) -> list:
    if mongodb_client is None:
        print("MongoDB client is not available. Skipping RAG pipeline.")
        return []

    try:
        collection = mongodb_client[collection_name]

        pipeline = [
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
        ]

        candidates = list(collection.aggregate(pipeline))

        if not candidates:
            return []

        corpus = [doc.get(text_field, "") for doc in candidates]
        tokenized_corpus = [doc.split() for doc in corpus]

        bm25 = BM25Okapi(tokenized_corpus)
        tokenized_query = query_text.split()
        bm25_scores = bm25.get_scores(tokenized_query)

        vector_scores = [doc.get("score", 0.0) for doc in candidates]

        def normalize(scores):
            lo, hi = min(scores), max(scores)
            if hi - lo == 0:
                return [0.0 for _ in scores]
            return [(s - lo) / (hi - lo) for s in scores]

        norm_vector = normalize(vector_scores)
        norm_bm25 = normalize(bm25_scores)

        for doc, v, b in zip(candidates, norm_vector, norm_bm25):
            doc["hybrid_score"] = alpha * v + (1 - alpha) * b

        candidates.sort(key=lambda d: d["hybrid_score"], reverse=True)

        using_candidates = candidates[:top_k]
        context = []

        for doc in using_candidates:
            context.append({
                "answer": doc.get(text_field, ""),
                "score": doc.get("hybrid_score", 0.0),
            })

        return context

    except Exception as e:
        print(f"Error performing vector search: {e}")
        return []
