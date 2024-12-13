import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const API_COURSES = "http://127.0.0.1:8000/api/courses/";


const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        program: '',
        year_level: '',
        semester: '',
        category: '',
        number: '',
        title: '',
        prerequisites: '',
        lecture_hours: '',
        lab_hours: '',
        units: '',
        status: 'active'
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [filters, setFilters] = useState({
        year_level: '',
        semester: '',
        lecture_hours: '',
        lab_hours: '',
        units: '',
        category: '',
        program: ''
    });

    // Add useEffects here
    useEffect(() => {
        fetchCourses();
    }, []); // Initial load

    useEffect(() => {
        console.log('Filters changed, fetching courses...'); // Debug effect trigger
        fetchCourses();
    }, [filters]); // Dependency on filters

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        console.log(`Filter changed: ${name} = ${value}`); // Debug log
        setFilters(prev => {
            const newFilters = {
                ...prev,
                [name]: value
            };
            console.log('New filters:', newFilters); // Debug log
            return newFilters;
        });
    };

    const fetchCourses = async () => {
        try {
            // Build query params explicitly
            const validFilters = Object.entries(filters).filter(([_, value]) => value !== '');
            const queryParams = new URLSearchParams(validFilters);
            console.log('Filters being applied:', filters); // Debug current filters
            console.log('Valid filters:', validFilters); // Debug filtered key-value pairs
            console.log('Final query string:', queryParams.toString()); // Debug final query string

            // Make API call with query params
            const response = await fetch(`${API_COURSES}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('API Response:', data); // Debug server response
            console.log('Number of courses returned:', data.length); // Debug result count
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_COURSES + 'add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowAddModal(false);
                setFormData({
                    program: '',
                    year_level: '',
                    semester: '',
                    category: '',
                    number: '',
                    title: '',
                    prerequisites: '',
                    lecture_hours: '',
                    lab_hours: '',
                    units: '',
                    status: 'active'
                });
                fetchCourses();
            } else {
                console.error('Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await fetch(API_COURSES + `update/${editingCourse._id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingCourse)
            });
            setShowEditModal(false);
            fetchCourses();
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await fetch(API_COURSES + `delete/${courseId}/`, {
                method: 'DELETE'
            });
            setShowDeleteModal(false);
            setCourseToDelete(null);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div className="p-6 bg-[#1e293b] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Course Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <FaPlus /> Add Course
                </button>
            </div>
            <div className="bg-[#2d3a52] p-4 rounded-lg mb-6">
                <h2 className="text-lg font-bold text-white mb-4">Filter by:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <select
                        name="program"
                        value={filters.program}
                        onChange={handleFilterChange}
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    >
                        <option value="">All Programs</option>
                        <option value="IT">IT</option>
                        <option value="IS">IS</option>
                        <option value="EMC">EMC</option>
                        <option value="DSA">DSA</option>
                        <option value="CS">CS</option>
                    </select>

                    <select
                        name="year_level"
                        value={filters.year_level}
                        onChange={handleFilterChange}
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    >
                        <option value="">All Year Level</option>
                        <option value="1st">1st Year</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                        <option value="4th">4th Year</option>
                    </select>

                    <select
                        name="semester"
                        value={filters.semester}
                        onChange={handleFilterChange}
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    >
                        <option value="">All Semester</option>
                        <option value="1st Semester">1st Semester</option>
                        <option value="2nd Semester">2nd Semester</option>
                        <option value="Summer">Summer</option>
                    </select>

                    <input
                        type="text"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        placeholder="Filter by Category"
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    />

                    <input
                        type="text"
                        name="lecture_hours"
                        value={filters.lecture_hours}
                        onChange={handleFilterChange}
                        placeholder="Filter by Lecture Hours"
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    />

                    <input
                        type="text"
                        name="lab_hours"
                        value={filters.lab_hours}
                        onChange={handleFilterChange}
                        placeholder="Filter by Lab Hours"
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    />

                    <input
                        type="text"
                        name="units"
                        value={filters.units}
                        onChange={handleFilterChange}
                        placeholder="Filter by Units"
                        className="bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                    />

                    <button
                        onClick={() => {
                            setFilters({
                                year_level: '',
                                semester: '',
                                lecture_hours: '',
                                lab_hours: '',
                                units: '',
                                category: '',
                                program: ''
                            });
                            fetchCourses();
                        }}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course._id} className="bg-[#2d3a52] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                        {/* Header */}
                        <div className="border-b border-gray-700 pb-3 mb-3">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                                <span className="text-xl text-blue-400">{course.program}</span>
                            </div>
                            <p className="text-gray-400 text-sm">{course.category} {course.number}</p>
                        </div>

                        {/* Course Details */}
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Year Level:</span>
                                <span className="text-gray-200">{course.year_level}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Semester:</span>
                                <span className="text-gray-200">{course.semester}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Prerequisites:</span>
                                <span className="text-gray-200">{course.prerequisites || 'None'}</span>
                            </div>
                        </div>

                        {/* Hours and Units */}
                        <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-[#1e293b] rounded">
                            <div className="text-center">
                                <p className="text-xs text-gray-400">Lec Hrs</p>
                                <p className="text-gray-200">{course.lecture_hours}</p>
                            </div>
                            <div className="text-center border-x border-gray-700">
                                <p className="text-xs text-gray-400">Lab Hrs</p>
                                <p className="text-gray-200">{course.lab_hours}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-400">Units</p>
                                <p className="text-gray-200">{course.units}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3">
                            <button
                                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-full transition-colors"
                                onClick={() => {
                                    setEditingCourse(course);
                                    setShowEditModal(true);
                                }}
                            >
                                <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full transition-colors"
                                onClick={() => {
                                    setCourseToDelete(course);
                                    setShowDeleteModal(true);
                                }}
                            >
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#2d3a52] p-6 rounded-lg w-full max-w-4xl h-auto overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Add New Course</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Program</label>
                                <select
                                    name="program"
                                    value={formData.program}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Program</option>
                                    <option value="IT">IT</option>
                                    <option value="IS">IS</option>
                                    <option value="EMC">EMC</option>
                                    <option value="DSA">DSA</option>
                                    <option value="CS">CS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Year Level</label>
                                <select
                                    name="year_level"
                                    value={formData.year_level}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Year Level</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Semester</label>
                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Semester</option>
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="Summer">Summer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Course Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Course Number</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={formData.number}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Descriptive Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Prerequisite/s</label>
                                <input
                                    type="text"
                                    name="prerequisites"
                                    value={formData.prerequisites}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Lec Hrs/Wk</label>
                                <input
                                    type="text"
                                    name="lecture_hours"
                                    value={formData.lecture_hours}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Lab Hrs/Wk</label>
                                <input
                                    type="text"
                                    name="lab_hours"
                                    value={formData.lab_hours}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Units</label>
                                <input
                                    type="text"
                                    name="units"
                                    value={formData.units}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Add Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#2d3a52] p-6 rounded-lg w-full max-w-4xl h-auto overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Edit Course</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Program</label>
                                <select
                                    value={editingCourse?.program || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, program: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Program</option>
                                    <option value="IT">IT</option>
                                    <option value="IS">IS</option>
                                    <option value="EMC">EMC</option>
                                    <option value="DSA">DSA</option>
                                    <option value="CS">CS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Year Level</label>
                                <select
                                    value={editingCourse?.year_level || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, year_level: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Year Level</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Semester</label>
                                <select
                                    value={editingCourse?.semester || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, semester: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                >
                                    <option value="">Select Semester</option>
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>
                                    <option value="Summer">Summer</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Cat.</label>
                                <input
                                    type="text"
                                    value={editingCourse?.category || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">No.</label>
                                <input
                                    type="text"
                                    value={editingCourse?.number || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, number: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Descriptive Title</label>
                                <input
                                    type="text"
                                    value={editingCourse?.title || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Prerequisite/s</label>
                                <input
                                    type="text"
                                    value={editingCourse?.prerequisites || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, prerequisites: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Lec Hrs/Wk</label>
                                <input
                                    type="text"
                                    value={editingCourse?.lecture_hours || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, lecture_hours: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Lab Hrs/Wk</label>
                                <input
                                    type="text"
                                    value={editingCourse?.lab_hours || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, lab_hours: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-1">Units</label>
                                <input
                                    type="text"
                                    value={editingCourse?.units || ''}
                                    onChange={(e) => setEditingCourse({ ...editingCourse, units: e.target.value })}
                                    className="w-full bg-[#1e293b] text-gray-200 border border-gray-600 rounded-lg p-2"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Update Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#2d3a52] p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold text-white mb-4">Delete Course</h2>
                        {courseToDelete && (
                            <div className="mb-4">
                                <p className="text-gray-300">Program: {courseToDelete.program}</p>
                                <p className="text-gray-300">Year Level: {courseToDelete.year_level}</p>
                                <p className="text-gray-300">Semester: {courseToDelete.semester}</p>
                                <p className="text-gray-300">Category: {courseToDelete.category}</p>
                                <p className="text-gray-300">Number: {courseToDelete.number}</p>
                                <p className="text-gray-300">Title: {courseToDelete.title}</p>
                            </div>
                        )}
                        <p className="text-gray-300 mb-4">
                            Are you sure you want to delete this course? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-400 hover:text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(courseToDelete._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseManagement;