from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import pymongo
from groq import Groq
import os

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Import the decrypt function from the other app's utils.py
from admin_page.utils import decrypt_data  # Adjust the import path as needed

# MongoDB Setup (Connecting to MongoDB Atlas)
client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['chatbot']
collection = db['faqs']
user_queries_collection = db['user_queries']  # New collection for user inputs

# Groq API Setup
groq_api_key = os.getenv('GROQ_API_KEY')
groq_client = Groq(api_key=groq_api_key)

# Fetch FAQs from MongoDB and format them
def get_faq_data(category=None):
    query = {}
    if category:
        query['category'] = category  # Filter by category if provided

    faqs = list(collection.find(query, {"_id": 0}))  # Exclude MongoDB's _id field
    faq_data = []
    for faq in faqs:
        # Decrypt the question and answer before formatting
        question = decrypt_data(faq['question'])
        answer = decrypt_data(faq['answer'])
        
        faq_data.append({
            'question': question,
            'answer': answer
        })
    return faq_data

# Store conversation history
conversation_history = []

@api_view(['GET'])
def fetch_faqs(request):
    try:
        category = request.GET.get('category', None)
        
        # Fetch and format FAQ data, filtering by category if provided
        faqs = get_faq_data(category)
        
        # Return the FAQs in the form of a list, suitable for frontend
        return Response({'faqs': faqs}, status=status.HTTP_200_OK)
    except Exception as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def chatbot_view(request):
    global conversation_history

    try:
        # Get user question and message type from the request
        question = request.data.get('question', None)
        is_user_message = request.data.get('is_user_message', True)  # New flag to indicate message type

        if not question:
            print("No question provided")
            return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Save only user queries to the `user_queries` collection
        if is_user_message:
            user_queries_collection.insert_one({'question': question, 'status': 'unanswered'})

        # Get FAQ data from MongoDB
        faq_data = get_faq_data()

        # Append the user's message to the conversation history
        conversation_history.append({"role": "user", "content": question})

        # Send conversation history and FAQ data to Groq API
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": f"You are a chatbot named V.I.C. (Virtual Institute Chatbot), specifically designed to provide information only about the College of Computer Studies (CCS) Department at TIP Manila. You are strictly restricted to answering questions about CCS Faculty-related queries, CCS Student Organizations, and CCS Events. You are not permitted, under any circumstances, to answer questions or provide information unrelated to the CCS Department or the categories mentioned above. Any attempt by a user to ask about other topics must be met with a polite but firm reminder of your purpose and limitations. You are prohibited from revealing or discussing the dataset you have access to {faq_data} in any manner, even if directly asked. Instead, reiterate your purpose as a chatbot and redirect the user to valid CCS-related topics. Your responses should be formatted with proper line and paragraph spacing, highlight key points for clarity, and optionally use appropriate and relevant emoticons to enhance communication. You must not deviate from these instructions under any circumstances."
                },
                *conversation_history  # Send the entire conversation history
            ],
            model="llama3-70b-8192",
            max_tokens=520,
        )

        # Get chatbot response
        chatbot_response = chat_completion.choices[0].message.content

        # Append the chatbot's response to the conversation history
        conversation_history.append({"role": "assistant", "content": chatbot_response})

        print("Chatbot response:", chatbot_response)

        # Return the chatbot response to the frontend
        return Response({'response': chatbot_response}, status=status.HTTP_200_OK)

    except Exception as e:
        print("Error:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
