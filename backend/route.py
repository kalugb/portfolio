from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.chat import ChatService
from backend.db.db_init import get_mongo_client
from backend.embeddings.embedding import EmbeddingGenerator
from backend.db.db_ops import insert_contact_info

chat_service = None
embedding_generator = None
mongodb_db = None

@asynccontextmanager
async def init_items(app: FastAPI):
    global chat_service, mongodb_db, embedding_generator
    chat_service = await ChatService.create()
    embedding_generator = await EmbeddingGenerator.create()

    try:
        mongodb_db = await get_mongo_client()
        print("MongoDB client initialized successfully.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        mongodb_db = None

    print("Chat service initialized.")
    yield

app = FastAPI(lifespan=init_items)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: list = []

class ChatResponse(BaseModel):
    reply: str
    history: list

class ContactRequest(BaseModel):
    name: str
    email: str
    phone_num: str
    message: str = None

class ContactResponse(BaseModel):
    reply: str


@app.post("/api/chat", response_model=ChatResponse)
async def llm_chat(request: ChatRequest):
    reply, updated_history = await chat_service.llm(
        request.message,
        mongodb_client=mongodb_db,
        history=request.history
    )

    return ChatResponse(reply=reply, history=updated_history)

@app.post("/api/temp_chat_test", response_model=ChatResponse)
async def temp_chat_test(request: ChatRequest):
    reply = await chat_service.testing_response(request.message)
    return ChatResponse(reply=reply)

@app.post("/api/talk_to_me", response_model=ContactResponse)
async def talk_to_me(request: ContactRequest):
    name = request.name
    email = request.email
    phone_num = request.phone_num
    message = request.message if hasattr(request, 'message') else None

    if name is None or email is None or phone_num is None:
        return ContactResponse(reply="Error: Missing required fields (name, email, phone_num).")

    try:
        ok = await insert_contact_info(
            mongodb_client=mongodb_db,
            name=name,
            email=email,
            phone_num=phone_num,
            message=message
        )
    except Exception as e:
        return ContactResponse(reply=f"Error inserting contact info into MongoDB: {str(e)}")

    if not ok:
        return ContactResponse(reply="Could not save your information. Please try again later.")

    return ContactResponse(reply=f"Received your information: name={name}, email={email}, phone_num={phone_num}, message={message}")

@app.get("/")
async def root():
    return {"status": "ok"}
