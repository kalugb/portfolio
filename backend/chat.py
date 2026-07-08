from openai import OpenAI
from dotenv import load_dotenv
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

NVIDIA_NIM_API_KEY = os.getenv("NVIDIA_NIM_API_KEY")
NVIDIA_NIM_LLM_MODEL_NAME = os.getenv("NVIDIA_NIM_LLM_MODEL_NAME")
NVIDIA_NIM_EMBEDDING_MODEL_NAME = os.getenv("NVIDIA_NIM_EMBEDDING_MODEL_NAME")
NVIDIA_NIM_API_URL = os.getenv("NVIDIA_NIM_API_URL")

def get_chat_response(message: str) -> str:
    """
    Placeholder chat logic.
    Replace this with real logic (LLM call, DB lookup, etc.) later.
    """
    return f"This is a placeholder response to: '{message}'"

def llm(user_input: str) -> str:
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    load_dotenv()

    client = OpenAI(
        base_url=NVIDIA_NIM_API_URL,
        api_key=NVIDIA_NIM_API_KEY
    )

    completion = client.chat.completions.create(
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