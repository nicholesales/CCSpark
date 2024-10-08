from django.urls import path
from . import views

urlpatterns = [
    path('queries/', views.get_queries, name='get_queries'),
    path('queries/add/', views.add_query, name='add_query'),
    path('queries/edit/<str:query_id>/', views.edit_query, name='edit_query'),
    path('queries/delete/<str:query_id>/', views.delete_query, name='delete_query'),
]
