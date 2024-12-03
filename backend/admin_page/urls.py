from django.urls import path
from . import views

urlpatterns = [
    path('queries/', views.get_queries, name='get_queries'),
    path('queries/add/', views.add_query, name='add_query'),
    path('queries/edit/<str:query_id>/', views.edit_query, name='edit_query'),
    path('queries/delete/<str:query_id>/', views.delete_query, name='delete_query'),
    path('user-queries/', views.get_user_queries, name='get_user_queries'),
    path('user-queries/delete/<str:query_id>/', views.delete_user_query, name='delete_user_query'),
    path('user-queries/edit/<str:query_id>/', views.edit_user_query, name='edit_user_query'),
]
