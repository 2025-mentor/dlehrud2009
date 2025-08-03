from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EchoInput(BaseModel):
    text: str

@app.get("/")
def root():
    return {"message": "Welcome!"}

@app.get("/time")
def time():
    return {"current_time": datetime.now().isoformat()}

@app.get("/hello")
def hello():
    return {"message": "Hello, FastAPI!"}

@app.post("/echo")
def echo(data: EchoInput):
    return {"you_said": data.text}