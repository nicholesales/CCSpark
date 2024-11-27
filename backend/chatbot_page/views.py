from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import pymongo
from groq import Groq
import os
from dotenv import load_dotenv
from admin_page.utils import decrypt_data

load_dotenv()

# MongoDB Setup
client = pymongo.MongoClient(settings.MONGODB_URI)
db = client['chatbot']
collection = db['faqs']

# Groq API Setup
groq_api_key = os.getenv('GROQ_API_KEY')
groq_client = Groq(api_key=groq_api_key)

# Constants
MAX_HISTORY_LENGTH = 4  # Keep last 4 exchanges
MAX_TOKENS = 520
SYSTEM_PROMPT = """You are a chatbot named V.I.C. (Virtual Institute Chatbot) that answers only about the College of Computer Studies (CCS) Department in TIP Manila. The users can ask about CCS Faculty-related queries, CCS Student Organizations, and CCS Events. You cannot reveal all available data points when asked but can explain your purpose as a chatbot. Use relevant emoticons to make conversations pleasing. Format responses properly with proper spacing and bold styling for important information."""

class ConversationManager:
    def __init__(self):
        self.conversation_history = []
        self.faq_cache = None
        
    def get_faq_data(self):
        if self.faq_cache is None:
            faqs = list(collection.find({}, {"_id": 0}))
            formatted_data = ""
            for faq in faqs:
                question = decrypt_data(faq['question'])
                answer = decrypt_data(faq['answer'])
                formatted_data += f"Q: {question}\nA: {answer}\n\n"
            self.faq_cache = formatted_data
        return self.faq_cache

    def add_message(self, role, content):
        self.conversation_history.append({"role": role, "content": content})
        # Keep only the last MAX_HISTORY_LENGTH exchanges
        if len(self.conversation_history) > MAX_HISTORY_LENGTH * 2:  # *2 because each exchange has 2 messages
            self.conversation_history = self.conversation_history[-MAX_HISTORY_LENGTH * 2:]

    def get_messages_for_api(self):
        faq_data = self.get_faq_data()
        system_message = {
            "role": "system",
            "content": f"{SYSTEM_PROMPT} Use this data: {faq_data}"
        }
        return [system_message] + self.conversation_history

conversation_manager = ConversationManager()

@api_view(['POST'])
def chatbot_view(request):
    try:
        question = request.data.get('question')
        if not question:
            return Response(
                {'error': 'No question provided'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Add user's question to conversation history
        conversation_manager.add_message("user", question)

        # Get response from Groq
        try:
            chat_completion = groq_client.chat.completions.create(
                messages=conversation_manager.get_messages_for_api(),
                model="llama-3.2-1b-preview",
                max_tokens=MAX_TOKENS,
            )
            chatbot_response = chat_completion.choices[0].message.content
            
            # Add bot's response to conversation history
            conversation_manager.add_message("assistant", chatbot_response)
            
            return Response({'response': chatbot_response}, status=status.HTTP_200_OK)

        except Exception as api_error:
            # If we get a token-related error, try with reduced context
            conversation_manager.conversation_history = conversation_manager.conversation_history[-2:]
            chat_completion = groq_client.chat.completions.create(
                messages=conversation_manager.get_messages_for_api(),
                model="llama-3.2-1b-preview",
                max_tokens=MAX_TOKENS,
            )
            chatbot_response = chat_completion.choices[0].message.content
            
            # Add bot's response to conversation history
            conversation_manager.add_message("assistant", chatbot_response)
            
            return Response({'response': chatbot_response}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(
            {'error': 'An error occurred while processing your request'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )