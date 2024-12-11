from django.urls import path
from . import views

urlpatterns = [
    path('courses/', views.get_courses),
    path('courses/add/', views.add_course),
    path('courses/update/<str:course_id>/', views.edit_course),
    path('courses/delete/<str:course_id>/', views.delete_course),
]