from pymongo import MongoClient
from datetime import datetime


# MongoDB connection
def connect_to_mongodb():
    try:
        client = MongoClient(
            "mongodb+srv://mcnsales:paths@chatbotdb.l51tq.mongodb.net/?retryWrites=true&w=majority&appName=chatbotDB"
        )
        db = client["courses"]
        return db.courses
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None


def create_course_document(
    category,
    number,
    title,
    prerequisites,
    lec_hours,
    lab_hours,
    units,
    program,
    year_level,
    semester,
):
    return {
        "program": program,
        "year_level": year_level,
        "semester": semester,
        "category": category,
        "number": number,
        "title": title,
        "prerequisites": prerequisites,
        "lecture_hours": lec_hours,
        "lab_hours": lab_hours,
        "units": units,
        "created_at": datetime.now().isoformat(),
        "status": "active",
    }


def insert_courses():
    collection = connect_to_mongodb()
    if collection == None:
        return

    firstyr_firstsem_prerequisites = [
        ["GEC", "002", "Reading in Philippine History", "", "3", "0", "3"],
    ]

    # firstyr_secondsem_prerequisites = [
    #     ["GEC", "001", "Understanding the Self", "", "3", "0", "3"],
    #     ["GEC", "005", "Purposive Communication", "", "3", "0", "3"],
    #     ["GEC", "006", "Art Appreciation", "", "3", "0", "3"],
    #     ["MATH", "025", "Discrete Mathematics", "MATH 031", "3", "0", "3"],
    #     ["CITE", "003", "Computer Programming 2", "CITE 002", "2", "3", "3"],
    #     ["CITE", "012", "Introduction to Human Computer Interaction", "CITE 002", "2", "3", "3"],
    #     ["PE", "102", "Physical Education 2", "PE 101", "2", "0", "2"],
    #     ["NSTP", "002", "National Service Training Program 2", "NSTP 001", "(3)", "0", "(3)"]
    # ]

    # secondyr_firstsem_prerequisites = [
    #     ["CITE", "004", "Data Structures and Algorithms", "CITE 003", "2", "3", "3"],
    #     ["PELEC", "001", "Pref. Elective 1", "", "2", "3", "3"],
    #     ["CIT", "202", "Web Systems and Technologies", "CITE 003, CITE 012", "2", "3", "3"],
    #     ["CIT", "201", "System Analysis and Design", "CITE 003, CITE 012", "2", "3", "3"],
    #     ["BIO", "001A", "Modern Biology", "", "2", "3", "3"],
    #     ["GEC", "008", "Ethics", "", "3", "0", "3"],
    #     ["GEC", "007", "Science, Technology, and Society", "", "3", "0", "3"],
    #     ["PE", "201", "Physical Education 3", "PE 102", "2", "0", "2"]
    # ]

    # secondyr_secondsem_prerequisites = [
    #     ["GEM", "001", "Life and Works of Rizal", "", "3", "0", "3"],
    #     ["GEC", "003", "The Contemporary World", "", "3", "0", "3"],
    #     ["MATH", "028", "Applied Statistics", "MATH 022", "2", "3", "3"],
    #     ["CITE", "005A", "Information Management", "CITE 003, CITE 004", "2", "3", "3"],
    #     ["PELEC", "002", "Prof. Elective 2", "", "2", "3", "3"],
    #     ["CIT", "203", "Platform Technologies", "CITE 004", "2", "3", "3"],
    #     ["CHM", "001A", "General Chemistry", "", "2", "3", "3"],
    #     ["PE", "202", "Physical Education 4", "PE 201", "2", "0", "2"]
    # ]

    # thirdyr_firstsem_prerequisites = [
    #     ["GEE", "001B", "GE Elective 1 - Gender and Society", "", "3", "0", "3"],
    #     ["ITELEC", "001", "IT Elective 1", "", "2", "3", "3"],
    #     ["CIT", "301", "Integrative Programming and Technologies", "CIT 202, CITE 005A", "2", "3", "3"],
    #     ["CIT", "302", "Quantitative Methods (incl Modeling and Simulation)", "MATH 025, MATH 028", "2", "3", "3"],
    #     ["CIT", "303", "Networking 1", "CIT 202, CIT 203", "2", "3", "3"],
    #     ["CIT", "304", "Advanced Database Systems", "CITE 005A", "2", "3", "3"],
    #     ["CITE", "009", "Technopreneurship", "3rd Year Standing", "3", "0", "3"],
    #     ["CIT", "305", "Systems Integration and Architecture", "CIT 202, CIT 303(C)", "2", "3", "3"]
    # ]

    # thirdyr_secondsem_prerequisites = [
    #     ["GEE", "002B", "GE Elective 2 - Living in the IT Era", "GEE 001B", "3", "0", "3"],
    #     ["CIS", "202", "Data Mining and Warehousing", "MATH 028, CIT 304", "2", "3", "3"],
    #     ["CIT", "306", "Mobile Computing", "CITE 003, CIT 304", "2", "3", "3"],
    #     ["PELEC", "003", "Prof. Elective 3", "", "2", "3", "3"],
    #     ["ITELEC", "002", "IT Elective 2", "ITELEC 001", "2", "3", "3"],
    #     ["CITE", "007A", "Information Assurance and Security", "CIT 304", "2", "3", "3"],
    #     ["CITE", "006", "Application Development and Emerging Technologies", "CITE 005A", "2", "3", "3"],
    #     ["CIT", "307", "Networking 2", "CIT 303", "2", "3", "3"]
    # ]

    # thirdyear_summer_prerequisites = [
    #     ["CIT", "308", "Capstone 1", "CITE 006, CITE 007A", "2", "3", "3"],
    #     ["CIT", "309", "IT Project Management", "CITE 006", "2", "3", "3"],
    #     ["CIT", "310", "Information Assurance and Security 2", "CITE 007A", "2", "3", "3"]
    # ]

    # fourthyear_firstsem_prerequisites = [
    #     ["GEE", "004", "GE Elective 3 - Great Books", "GEE 002B", "3", "0", "3"],
    #     ["PELEC", "004", "Prof. Elective 4", "", "2", "3", "3"],
    #     ["ITELEC", "003", "IT Elective 3", "ITELEC 002", "2", "3", "3"],
    #     ["CIT", "400", "Capstone 2", "CIT 308", "0", "9", "3"],
    #     ["CITE", "008", "Social Issues and Professional Practice", "3rd Year Standing", "3", "0", "3"],
    #     ["CIT", "401", "Systems Administration and Maintenance", "CIT 310", "2", "3", "3"]
    # ]

    # fourthyear_secondsem_prerequisites = [
    #     ["CIT", "402", "Internship In Computing", "Graduating", "0", "18", "6"],
    #     ["ITELEC", "004", "IT Elective 4", "ITELEC 003", "2", "3", "3"],
    #     ["CIT", "403", "Systems Integration and Architecture 2", "CIT 307, CIT 305, CIT 401", "2", "3", "3"],
    # ]

    # Insert first year first semester courses
    for course in firstyr_firstsem_prerequisites:
        doc = create_course_document(
            category=course[0],
            number=course[1],
            title=course[2],
            prerequisites=course[3],
            lec_hours=course[4],
            lab_hours=course[5],
            units=course[6],
            program="IT",
            year_level="1st",
            semester="1st Semester",
        )
        try:
            collection.insert_one(doc)
            print(f"Inserted: {course[2]}")
        except Exception as e:
            print(f"Error inserting {course[2]}: {e}")

    # for course in firstyr_secondsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="1st",
    #         semester="2nd Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # # Insert first year first semester courses
    # for course in secondyr_firstsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="2nd",
    #         semester="1st Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # # Insert first year first semester courses
    # for course in secondyr_secondsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="2nd",
    #         semester="2nd Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # # Insert first year first semester courses
    # for course in thirdyr_firstsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="3rd",
    #         semester="1st Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # # Insert first year first semester courses
    # for course in thirdyr_secondsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="3rd",
    #         semester="2nd Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # for course in thirdyear_summer_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="3rd",
    #         semester="Summer",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # for course in fourthyear_firstsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="4th",
    #         semester="1st Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")

    # for course in fourthyear_secondsem_prerequisites:
    #     doc = create_course_document(
    #         category=course[0],
    #         number=course[1],
    #         title=course[2],
    #         prerequisites=course[3],
    #         lec_hours=course[4],
    #         lab_hours=course[5],
    #         units=course[6],
    #         program="IT",
    #         year_level="4th",
    #         semester="2nd Semester",
    #     )
    #     try:
    #         collection.insert_one(doc)
    #         print(f"Inserted: {course[2]}")
    #     except Exception as e:
    #         print(f"Error inserting {course[2]}: {e}")


if __name__ == "__main__":
    insert_courses()
