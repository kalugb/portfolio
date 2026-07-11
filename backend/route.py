from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager

from chat import ChatService

chat_service = None
embedding_generator = None

@asynccontextmanager
async def init_items(app: FastAPI):
    global chat_service
    chat_service = await ChatService.create()
    
    yield

app = FastAPI(lifespan=init_items)

# Allow your React dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # adjust for Vite/CRA port (remove the hardcoded url later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str


@app.post("/api/chat", response_model=ChatResponse)
async def llm_chat(request: ChatRequest):
    reply = await chat_service.llm(request.message)
    return ChatResponse(reply=reply)

@app.post("/api/temp_chat_test", response_model=ChatResponse)
async def temp_chat_test(request: ChatRequest):
    reply = await chat_service.testing_response(request.message)
    return ChatResponse(reply=reply)


@app.get("/")
async def root():
    return {"status": "ok"}