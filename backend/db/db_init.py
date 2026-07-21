import ssl
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
    
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE
    ssl_context.minimum_version = ssl.TLSVersion.TLSv1_2
    ssl_context.maximum_version = ssl.TLSVersion.TLSv1_2
    
    client = MongoClient(mongo_uri, ssl_context=ssl_context)
    _ = client.admin.command("ping")
    
    db = client[database_name]
    
    return db