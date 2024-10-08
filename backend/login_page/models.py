import pymongo
from django.conf import settings

client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['login']
users_collection = db['admin_credentials']  # Adjust the collection name as needed

