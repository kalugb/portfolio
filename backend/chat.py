from openai import OpenAI
from dotenv import load_dotenv
import os
import sys
import pymongo

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

from backend.embeddings.embedding import EmbeddingGenerator
from backend.db.db_ops import rag_pipeline

NVIDIA_NIM_API_KEY = os.getenv("NVIDIA_NIM_API_KEY")
NVIDIA_NIM_LLM_MODEL_NAME = os.getenv("NVIDIA_NIM_LLM_MODEL_NAME")
NVIDIA_NIM_EMBEDDING_MODEL_NAME = os.getenv("NVIDIA_NIM_EMBEDDING_MODEL_NAME")
NVIDIA_NIM_API_URL = os.getenv("NVIDIA_NIM_API_URL")

class ChatService:
    def __init__(self):
        self.embedding_generator = None
        self.llm_client = None
        self.sys_instruction = """
You are a helpful assistant that answer user's question in concise and clear manner. 
You should not answer questions that are not related to the user's query. 
If you don't know the answer, you should say "I don't know".
You are given relevant context information to help you answer the user's question. If the context information is not sufficient to answer the question, say "I don't know".

Relevant context information: {context}
"""
        
    async def testing_response(self, user_input: str) -> str:
        return f"Echo: {user_input}"
        
    @classmethod
    async def create(cls):
        self = cls()
        
        self.embedding_generator = await EmbeddingGenerator.create()
        self.llm_client = OpenAI(
            base_url=NVIDIA_NIM_API_URL,
            api_key=NVIDIA_NIM_API_KEY
        )
        
        return self

    async def llm(self, user_input: str, mongodb_client: pymongo.MongoClient) -> str:
        # get relevant info first
        embedding = await self.embedding_generator.generate_embedding(user_input)
        relevant_info = await rag_pipeline(
            mongodb_client=mongodb_client,
            embedding_vector=embedding,
            query_text=user_input
        )
        
        full_sys_instruction = self.sys_instruction.format(context=relevant_info)
        
        completion = self.llm_client.chat.completions.create(
            model=NVIDIA_NIM_LLM_MODEL_NAME,
            messages=[{ "role": "system", "content": full_sys_instruction}, {"role": "user", "content": user_input}],
            temperature=1,
            top_p=0.95,
            max_tokens=16384,
            extra_body={"chat_template_kwargs": {"enable_thinking": False}, "reasoning_budget": 16384},
            stream=False
        )

        message = completion.choices[0].message
        
        final_msg = message.content.split("</think>")[1] if "</think>" in message.content else message.content
        
        return final_msg


if __name__ == "__main__":
    import asyncio

    async def main():
        user_input = "Hello, how are you?"
        chat_service = await ChatService.create()
        response = await chat_service.llm(user_input)
        print("Chat Response:", response)

        embedding_generator = await EmbeddingGenerator.create()
        embedding = await embedding_generator.generate_embedding(user_input)
        print("Embedding:", embedding)
        print("Embedding Length:", len(embedding))

    asyncio.run(main())