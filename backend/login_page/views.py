from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import pymongo
import json

client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['login']
users_collection = db['admin_credentials']

@api_view(['POST'])
def login_user(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({"username": username, "password": password})

    if user:
        return Response({"message": "Login successful", "authenticated": True}, status=200)
    else:
        return Response({"message": "Invalid username or password", "authenticated": False}, status=401)
