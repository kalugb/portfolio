from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

class EmbeddingGenerator:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = os.getenv("GEMINI_EMBEDDING_MODEL_NAME")
        self.client = None
        
    @classmethod
    async def create(cls):
        self = cls()
        
        self.client = await self.initialize()
        
        return self
        
    async def initialize(self) -> list:
        client = genai.Client(api_key=self.api_key)
        
        return client
    
    async def generate_embedding(self, text: str) -> list:
        if not self.client:
            raise ValueError("Client is not initialized. Call 'await EmbeddingGenerator.create()' first.")
        
        response = self.client.models.embed_content(
            model=self.model_name,
            contents=text
        )
        
        response_list = response.embeddings[0].values if response.embeddings else []
        
        return response_list

if __name__ == "__main__":
    import asyncio

    async def main():
        generator = await EmbeddingGenerator.create()
        text = "Hello, world!"
        embedding = await generator.generate_embedding(text)
        print(embedding)
        print(type(embedding))
        print(len(embedding))

    asyncio.run(main())