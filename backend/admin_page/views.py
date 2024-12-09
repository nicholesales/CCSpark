from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import pymongo
import json
from bson.objectid import ObjectId
from .utils import encrypt_data, decrypt_data  # Import encryption/decryption functions
import environ
from datetime import datetime

# Load environment variables
env = environ.Env()
environ.Env.read_env()  # Read the .env file

client = pymongo.MongoClient(settings.MONGODB_URI)
db = client["chatbot"]
collection = db["faqs"]
user_queries_collection = db["user_queries"]
panoramics_collection = db["panoramics"]


@csrf_exempt
def get_user_queries(request):
    if request.method == "GET":
        queries = list(user_queries_collection.find())
        for query in queries:
            query["_id"] = str(query["_id"])
        return JsonResponse(queries, safe=False)


@csrf_exempt
def delete_user_query(request, query_id):
    if request.method == "DELETE":
        result = user_queries_collection.delete_one({"_id": ObjectId(query_id)})
        if result.deleted_count == 1:
            return JsonResponse({"status": "success"}, status=200)
        return JsonResponse({"status": "failed"}, status=404)


@csrf_exempt
def edit_user_query(request, query_id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debug log
            print("Category received:", data.get("category"))  # Debug log

            # Define a default category if not provided
            update_data = {
                "question": data["question"],
                "answer": data["answer"],
                "status": data.get("status", "answered"),  # Default to 'answered'
                "category": data["category"],
            }

            user_queries_collection.update_one(
                {"_id": ObjectId(query_id)}, {"$set": update_data}
            )
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
def get_queries(request):
    if request.method == "GET":
        queries = list(collection.find())
        for query in queries:
            query["_id"] = str(query["_id"])  # Convert ObjectId to string
            # Decrypt the question and answer fields only
            query["question"] = decrypt_data(query["question"])
            query["answer"] = decrypt_data(query["answer"])
            # Ensure category is passed as it is (not encrypted)
            query["category"] = query.get("category", "No Category Specified")
        return JsonResponse(queries, safe=False)


@csrf_exempt
def add_panoramics(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if isinstance(data, list):
                for item in data:
                    panoramics_collection.insert_one(
                        {
                            "filename": item["fileName"],
                            "s3url": item["s3Url"],
                            "uploaddate": item["uploadDate"],
                            "category": item["category"],
                            "groupname": item["groupName"],
                            "location": item["location"],
                            "description": item["description"],
                        }
                    )
            else:
                return JsonResponse(
                    {"status": "error", "message": "Expected a list of items"},
                    status=400,
                )
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)


@csrf_exempt
def get_panoramics(request):
    if request.method == "GET":
        queries = list(panoramics_collection.find())
        for query in queries:
            query["_id"] = str(query["_id"])  # Convert ObjectId to string
        return JsonResponse(queries, safe=False)
    return


@csrf_exempt
def delete_panoramics(request, panoramic_id):
    if request.method == "DELETE":
        result = panoramics_collection.delete_one({"_id": ObjectId(panoramic_id)})
        if result.deleted_count == 1:
            return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "failed"}, status=404)

@csrf_exempt
def delete_panoramics_by_groupname(request, groupname):
    if request.method == "DELETE":
        # Find all panoramics with the given groupname
        panoramics = list(panoramics_collection.find({"groupname": groupname}))

        # Delete each panoramic
        for panoramic in panoramics:
            panoramics_collection.delete_one({"_id": panoramic["_id"]})

        return JsonResponse({"status": "success"}, status=200)
    return JsonResponse({"status": "failed"}, status=404)

@csrf_exempt
def get_reminder_queries(request):
    if request.method == "GET":
        current_date = datetime.now()
        queries = list(collection.find({"needs_reminder": True}))
        
        for query in queries:
            query["_id"] = str(query["_id"])
            query["question"] = decrypt_data(query["question"])
            query["answer"] = decrypt_data(query["answer"])
            
        return JsonResponse(queries, safe=False)
    
@csrf_exempt
def add_query(request):
    if request.method == "POST":
        data = json.loads(request.body)
        encrypted_question = encrypt_data(data["question"])
        encrypted_answer = encrypt_data(data["answer"])
        category = data["category"]
        
        query_data = {
            "question": encrypted_question,
            "answer": encrypted_answer,
            "category": category,
            "needs_reminder": data.get("needs_reminder", False),
            "reminder_date": data.get("reminder_date", None),
            "created_at": datetime.now().isoformat()
        }
        
        collection.insert_one(query_data)
        return JsonResponse({"status": "success"})


@csrf_exempt
def edit_query(request, query_id):
    if request.method == "PUT":
        data = json.loads(request.body)
        encrypted_question = encrypt_data(data["question"])
        encrypted_answer = encrypt_data(data["answer"])
        category = data["category"]
        
        update_data = {
            "question": encrypted_question,
            "answer": encrypted_answer,
            "category": category,
            "needs_reminder": data.get("needs_reminder", False),
            "reminder_date": data.get("reminder_date", None)
        }
        
        collection.update_one(
            {"_id": ObjectId(query_id)},
            {"$set": update_data}
        )
        return JsonResponse({"status": "success"})


@csrf_exempt
def delete_query(request, query_id):
    if request.method == "DELETE":
        result = collection.delete_one({"_id": ObjectId(query_id)})

        # Check if deletion was successful
        if result.deleted_count == 1:
            return JsonResponse({"status": "success"}, status=200)
        else:
            return JsonResponse(
                {"status": "failed", "message": "Query not found"}, status=404
            )

@csrf_exempt
def get_dashboard_stats(request):
    if request.method == "GET":
        try:
            # Get counts for each FAQ category with error checking
            faq_stats = {}
            categories = [
                "Frequently Asked Questions",
                "CCS Faculty-related Queries", 
                "CCS Student Orgs",
                "CCS Events"
            ]
            
            for category in categories:
                try:
                    count = collection.count_documents({"category": category})
                    faq_stats[category] = count
                except Exception as e:
                    print(f"Error counting {category}: {str(e)}")
                    faq_stats[category] = 0
            
            # Get count of panoramic groups with error checking
            try:
                panoramic_groups = len(list(panoramics_collection.distinct("groupname")))
            except Exception as e:
                print(f"Error counting panoramic groups: {str(e)}")
                panoramic_groups = 0
            
            # Get count of pending queries with error checking
            try:
                pending_queries = user_queries_collection.count_documents({"status": "unanswered"})
            except Exception as e:
                print(f"Error counting pending queries: {str(e)}")
                pending_queries = 0
            
            response_data = {
                "faq_stats": faq_stats,
                "panoramic_groups": panoramic_groups,
                "pending_queries": pending_queries
            }
            
            print("Response data:", response_data)  # Debug print
            return JsonResponse(response_data)
            
        except Exception as e:
            print(f"Main error in get_dashboard_stats: {str(e)}")  # Server-side logging
            return JsonResponse({
                "error": str(e),
                "detail": "An error occurred while fetching dashboard stats"
            }, status=500)
            
    return JsonResponse({"error": "Method not allowed"}, status=405)