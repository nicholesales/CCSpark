from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import pymongo
from datetime import datetime
import json
from bson.objectid import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import environ


# Load environment variables
env = environ.Env()
environ.Env.read_env()  # Read the .env file

client = pymongo.MongoClient(settings.MONGODB_URI)
db = client["courses"]
courses_collection = db["courses"]


@api_view(["GET"])
def get_courses(request):
    try:
        print("==== DEBUG: Get Courses Request ====")
        print(f"Query Parameters: {request.GET}")

        # Get filter parameters
        filter_query = {}
        for key, value in request.GET.items():
            if value:  # Only add non-empty values
                filter_query[key] = value

        print(f"MongoDB Query: {filter_query}")

        # Apply filters
        courses = list(courses_collection.find(filter_query))
        print(f"Found {len(courses)} courses matching filters")

        # Convert ObjectId to string for JSON serialization
        for course in courses:
            course["_id"] = str(course["_id"])

        return JsonResponse(courses, safe=False)
    except Exception as e:
        print(f"Error in get_courses: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def add_course(request):
    try:
        print("==== DEBUG: Add Course Request ====")
        print(f"Request Method: {request.method}")
        print(f"Request Headers: {request.headers}")

        if request.method == "POST":
            data = json.loads(request.body)
            print(f"Received Data: {json.dumps(data, indent=2)}")

            course_data = {
                "program": data["program"],
                "year_level": data["year_level"],
                "semester": data["semester"],
                "category": data["category"],
                "number": data["number"],
                "title": data["title"],
                "prerequisites": data["prerequisites"],
                "lecture_hours": data["lecture_hours"],
                "lab_hours": data["lab_hours"],
                "units": data["units"],
                "status": "active",
                "created_at": datetime.now().isoformat(),
            }

            print(f"Formatted Course Data: {json.dumps(course_data, indent=2)}")

            result = courses_collection.insert_one(course_data)
            print(f"Insertion Result: {result.inserted_id}")

            return JsonResponse({"status": "success"})

    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {str(e)}")
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except KeyError as e:
        print(f"Missing Field Error: {str(e)}")
        return JsonResponse({"error": f"Missing required field: {str(e)}"}, status=400)
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def edit_course(request, course_id):
    if request.method == "PUT":
        data = json.loads(request.body)

        update_data = {
            "program": data["program"],
            "year_level": data["year_level"],
            "semester": data["semester"],
            "category": data["category"],
            "number": data["number"],
            "title": data["title"],
            "prerequisites": data["prerequisites"],
            "lecture_hours": data["lecture_hours"],
            "lab_hours": data["lab_hours"],
            "units": data["units"],
        }

        courses_collection.update_one(
            {"_id": ObjectId(course_id)}, {"$set": update_data}
        )
        return JsonResponse({"status": "success"})


@csrf_exempt
def delete_course(request, course_id):
    if request.method == "DELETE":
        result = courses_collection.delete_one({"_id": ObjectId(course_id)})

        # Check if deletion was successful
        if result.deleted_count == 1:
            return JsonResponse({"status": "success"}, status=200)
        else:
            return JsonResponse(
                {"status": "failed", "message": "Course not found"}, status=404
            )
