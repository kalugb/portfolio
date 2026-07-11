from openai import OpenAI
from dotenv import load_dotenv
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

from backend.embedding import EmbeddingGenerator

NVIDIA_NIM_API_KEY = os.getenv("NVIDIA_NIM_API_KEY")
NVIDIA_NIM_LLM_MODEL_NAME = os.getenv("NVIDIA_NIM_LLM_MODEL_NAME")
NVIDIA_NIM_EMBEDDING_MODEL_NAME = os.getenv("NVIDIA_NIM_EMBEDDING_MODEL_NAME")
NVIDIA_NIM_API_URL = os.getenv("NVIDIA_NIM_API_URL")

class ChatService:
    def __init__(self):
        self.embedding_generator = None
        self.llm_client = None
        
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

    async def llm(self, user_input: str) -> str:
        completion = self.llm_client.chat.completions.create(
            model=NVIDIA_NIM_LLM_MODEL_NAME,
            messages=[{"role": "user", "content": user_input}],
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

        embedding = await chat_service.get_embedding(user_input)
        print("Embedding:", embedding)

    asyncio.run(main())