from pymongo import MongoClient
import os
import sys
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv()

async def get_mongo_client():
    mongo_uri = os.getenv("MONGO_URI")
    database_name = os.getenv("MONGO_DB_NAME")
    
    if not mongo_uri:
        raise ValueError("MONGO_URI environment variable is not set.")
    
    client = MongoClient(mongo_uri, tlsInsecure=True, tlsAllowInvalidCertificates=True)
    _ = client.admin.command("ping")  # Check if the MongoDB connection is alive
    
    db = client[database_name]
    
    return db