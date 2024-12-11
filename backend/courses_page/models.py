from django.db import models

course_schema = {
    "program": str,  # IT, IS, EMC, DSA, CS
    "year_level": str,  # 1st, 2nd, 3rd, 4th
    "semester": str,  # 1st Semester, 2nd Semester, Summer
    "category": str,  # Cat.
    "number": str,  # No.
    "title": str,  # Descriptive Title
    "prerequisites": str,  # Can be empty
    "lecture_hours": str,  # Lec Hrs/Wk
    "lab_hours": str,    # Lab Hrs/Wk
    "units": str,
    "status": str,  # active/inactive
    "created_at": str,  # Timestamp
    "updated_at": str   # Timestamp
}