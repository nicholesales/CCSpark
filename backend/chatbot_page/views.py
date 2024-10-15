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


# MongoDB Setup (Connecting to MongoDB Atlas)
client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['chatbot']
collection = db['faqs']

# Groq API Setup
groq_api_key = os.getenv('GROQ_API_KEY')
groq_client = Groq(api_key=groq_api_key)

# Fetch FAQs from MongoDB and format them
def get_faq_data():
    faqs = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB's _id field
    formatted_data = ""
    for faq in faqs:
        formatted_data += f"Question: {faq['question']}\n"
        formatted_data += f"Answer: {faq['answer']}\n\n"
    return formatted_data

# Store conversation history
conversation_history = []

@api_view(['POST'])
def chatbot_view(request):
    global conversation_history

    try:
        # Get user question from the request
        question = request.data.get('question', None)
        if not question:
            print("No question provided")
            return Response({'error': 'No question provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Get FAQ data from MongoDB
        formatted_data = get_faq_data()

        # Append the user's message to the conversation history
        conversation_history.append({"role": "user", "content": question})

        # Send conversation history and FAQ data to Groq API
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": f"You are a chatbot named V.I.C. (stands for Virtual Institute Chatbot) that answers only about the College of Computer Studies (CCS) Department in TIP Manila. The users can ask about CCS Faculty-related queries, CCS Student Organizations, and CCS Events. I will give you data to use but keep in mind that you are strictly not allowed, in any circumstances to reveal it all at once when the user asks what data points and how many data points you currently have but instead you can say what your purpose is as chatbot. Use this data: {formatted_data}. You can use relavant emoticons to make the conversation between you and the user more pleasing.",
                },
                *conversation_history  # Send the entire conversation history
            ],
            model="llama3-8b-8192",
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
