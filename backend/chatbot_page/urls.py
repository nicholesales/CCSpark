from django.urls import path
from .views import chatbot_view, fetch_faqs

urlpatterns = [
    path('chatbot/', chatbot_view, name='chatbot'),
    path('faqs/', fetch_faqs, name='fetch_faqs'),
]
