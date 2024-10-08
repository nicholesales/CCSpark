from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import pymongo
import json
from bson.objectid import ObjectId  # Import ObjectId to convert IDs

client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['chatbot']
collection = db['faqs']

@csrf_exempt
def get_queries(request):
    if request.method == 'GET':
        queries = list(collection.find())
        for query in queries:
            query['_id'] = str(query['_id'])  # Convert ObjectId to string
        return JsonResponse(queries, safe=False)

@csrf_exempt
def add_query(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        collection.insert_one(data)
        return JsonResponse({'status': 'success'})

@csrf_exempt
def edit_query(request, query_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        collection.update_one({'_id': ObjectId(query_id)}, {'$set': data})  # Convert to ObjectId
        return JsonResponse({'status': 'success'})

@csrf_exempt
def delete_query(request, query_id):
    if request.method == 'DELETE':
        result = collection.delete_one({'_id': ObjectId(query_id)})  # Convert to ObjectId
        
        # Check if deletion was successful
        if result.deleted_count == 1:
            return JsonResponse({'status': 'success'}, status=200)
        else:
            return JsonResponse({'status': 'failed', 'message': 'Query not found'}, status=404)
