from pymongo import MongoClient
import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

def get_mongo_client() -> MongoClient:
    mongo_uri = os.getenv("MONGO_URI")
    database_name = os.getenv("MONGO_DB_NAME")
    collection_name = os.getenv("MONGO_COLLECTION_NAME")
    
    if not mongo_uri:
        raise ValueError("MONGO_URI environment variable is not set.")
    
    client = MongoClient(mongo_uri)
    db = client[database_name]
    collection = db[collection_name]
    
    return collection