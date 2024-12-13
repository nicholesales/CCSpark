import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import AWS from 'aws-sdk';
import UploadImage from "./assets/upload.png";
import { FaChartLine, FaQuestion, FaUsers, FaImage, FaExclamationCircle, FaBook } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import CourseManagement from './CourseManagement.js';
import "react-datepicker/dist/react-datepicker.css";
import { API_USER_QUERIES, API_QUERY, API_PANORAMICS, API_DASHBOARD } from '../config.js';

function Admin({ handleLogout }) {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [appliedFilter, setAppliedFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to control visibility of the edit form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('CCS Faculty-related Queries');
  const [editingQueryId, setEditingQueryId] = useState(null); // Track the ID of the query being edited
  const [queries, setQueries] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userQueries, setUserQueries] = useState([]);
  const [panoramics, setPanoramics] = useState([]);
  const [selectedThumbnailFile, setSelectedThumbnailFile] = useState(null);
  const [selectedPanoramicFile, setSelectedPanoramicFile] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [needsReminder, setNeedsReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState(null);
  const [reminderQueries, setReminderQueries] = useState([]);
  const [editReminderNeeded, setEditReminderNeeded] = useState(false);
  const [editReminderDate, setEditReminderDate] = useState(null);
  const [dueReminders, setDueReminders] = useState([]);

  // Add this function to fetch dashboard stats

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(API_DASHBOARD);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dashboard stats:', data);
      setDashboardStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const checkDueReminders = async () => {
    try {
      const response = await fetch(API_QUERY + 'reminders/');
      const data = await response.json();
      const currentDate = new Date();

      // Filter queries that are due
      const dueQueries = data.filter(query => {
        if (!query.reminder_date) return false;
        const reminderDate = new Date(query.reminder_date);
        return reminderDate <= currentDate;
      });

      if (dueQueries.length > 0 && activeTab === 'dashboard') {
        setDueReminders(dueQueries);

        // Create alert message
        const message = `The following queries need to be updated:\n\n${dueQueries.map((query, index) =>
          `${index + 1}. ${query.question} (${new Date(query.reminder_date).toLocaleDateString()})`
        ).join('\n')
          }`;

        alert(message);
      }
    } catch (error) {
      console.error('Error checking due reminders:', error);
    }
  };


  const fetchReminderQueries = async () => {
    try {
      const response = await fetch(API_QUERY + 'reminders/');
      const data = await response.json();
      setReminderQueries(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  };

  // Bucket config for images
  AWS.config.update({
    region: 'ap-southeast-2', // e.g., 'ap-southeast-2'
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'ap-southeast-2:287275ca-edd8-4bac-b50d-a496dd0f9e29'
    })
  });

  const s3 = new AWS.S3();

  // Uploading files to S3 Bucket
  const uploadFileToS3 = async (file) => {
    try {
      const params = {
        Bucket: 'capstoneimagesbucket',
        Key: file.name,
        Body: file,
        ContentType: file.type
      };

      const result = await s3.upload(params).promise();
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const { id, files } = event.target;
    console.log(`File selected for ${id}:`, files[0]); // Debug log
    if (id === 'thumbnail') {
      setSelectedThumbnailFile(files[0]);
    } else if (id === 'panoramic') {
      setSelectedPanoramicFile(files[0]);
    }
  };

  const handleFileUpload = async () => {
    console.log('handleFileUpload called'); // Debug log

    // Check if both files are selected
    if (!selectedThumbnailFile || !selectedPanoramicFile) {
      alert('Please select both thumbnail and panoramic files!');
      return;
    }

    try {
      // Upload thumbnail to S3
      const thumbnailS3Result = await uploadFileToS3(selectedThumbnailFile);
      console.log('Thumbnail uploaded:', thumbnailS3Result); // Debug log

      // Upload panoramic to S3
      const panoramicS3Result = await uploadFileToS3(selectedPanoramicFile);
      console.log('Panoramic uploaded:', panoramicS3Result); // Debug log

      // Prepare image data for MongoDB
      const imageData = [
        {
          fileName: selectedThumbnailFile.name,
          s3Url: thumbnailS3Result.Location,
          uploadDate: new Date(),
          category: 'thumbnail', // Specify category as thumbnail
          groupName: newGroupName, // Get the Group Name
          location: newLocation, // Get the Location of the image
          description: newDescription, // Get the Description of the image
        },
        {
          fileName: selectedPanoramicFile.name,
          s3Url: panoramicS3Result.Location,
          uploadDate: new Date(),
          category: 'panoramic', // Specify category as panoramic
          groupName: newGroupName, // Get the Group Name for the panoramic
          location: newLocation, // Get the Location of the image for the panoramic
          description: newDescription, // Get the Description of the image for the panoramic
        }
      ];

      // Add your MongoDB API endpoint
      const response = await fetch(API_PANORAMICS + 'add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
      });

      if (response.ok) {
        alert('Files uploaded successfully!');
        setSelectedThumbnailFile(null);
        setSelectedPanoramicFile(null);
        setNewGroupName(null);
        setShowUploadForm(false);
        fetchPanoramics(); // Refresh the list of panoramics
      } else {
        throw new Error('Failed to store file references in MongoDB');
      }
    } catch (error) {
      console.error('Error in file upload:', error);
      alert('Failed to upload files');
    }
  };

  const fetchPanoramics = async () => {
    try {
      const response = await fetch(API_PANORAMICS);
      const data = await response.json();
      setPanoramics(data);
    } catch (error) {
      console.error('Error fetching panoramics:', error);
    }
  };

  useEffect(() => {
    fetchPanoramics();
  }, []);

  // No update of images

  const deletePanoramicsByGroupName = async (groupName) => {
    try {
      // Fetch all panoramics by group name
      const response = await fetch(`${API_PANORAMICS}?groupname=${groupName}`);
      const panoramics = await response.json();

      // Filter panoramics that belong to the group
      const groupPanoramics = panoramics.filter(p => p.groupname === groupName);

      // Delete each panoramic from S3 and MongoDB
      for (const panoramic of groupPanoramics) {
        // Delete from S3
        const s3Params = {
          Bucket: 'capstoneimagesbucket',
          Key: panoramic.filename
        };
        await s3.deleteObject(s3Params).promise();

        // Delete from MongoDB
        await fetch(`${API_PANORAMICS}delete-by-groupname/${groupName}/`, {
          method: 'DELETE'
        });
      }

      alert('All panoramics in the group deleted successfully');
      fetchPanoramics(); // Refresh the list
    } catch (error) {
      console.error('Error deleting panoramics:', error);
      alert('Failed to delete panoramics');
    }
  };

  const groupPanoramicsByGroupName = (panoramics) => {
    return panoramics.reduce((groups, panoramic) => {
      const groupName = panoramic.groupname;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(panoramic);
      return groups;
    }, {});
  };

  const groupedPanoramics = groupPanoramicsByGroupName(panoramics);

  const fetchUserQueries = async () => {
    const response = await fetch(API_USER_QUERIES);
    const data = await response.json();
    setUserQueries(data);
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
      fetchReminderQueries();
      checkDueReminders();
    } else if (activeTab === 'faqs') {
      fetchQueries();
    } else if (activeTab === 'queries') {
      fetchUserQueries();
    } else if (activeTab === 'images') {
      fetchPanoramics();
    }
  }, [activeTab]);

  const fetchQueries = async () => {
    const response = await fetch(API_QUERY); // Adjust according to your Django server
    const data = await response.json();
    setQueries(data);
  };

  const promoteToFAQ = async (query) => {
    try {
      // First add to FAQs
      const newFAQ = {
        question: query.question,
        answer: query.answer,
        category: query.category
      };

      const addResponse = await fetch(API_QUERY + 'add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFAQ)
      });

      if (!addResponse.ok) {
        throw new Error('Failed to add to FAQs');
      }

      // Then delete from user queries
      const deleteResponse = await fetch(API_USER_QUERIES + `delete/${query._id}/`, {
        method: 'DELETE'
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete user query');
      }

      // Update both states
      await fetchQueries(); // Refresh FAQs
      setUserQueries(userQueries.filter(q => q._id !== query._id)); // Update user queries state

      alert('Query has been successfully promoted to FAQ!');
    } catch (error) {
      console.error('Error promoting query:', error);
      alert('Failed to promote query: ' + error.message);
    }
  };

  const deleteUserQuery = async (queryId) => {
    const response = await fetch(API_USER_QUERIES + `delete/${queryId}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error deleting query:', error);
      alert("Failed to delete user query.");
    } else {
      setUserQueries(userQueries.filter(query => query._id !== queryId));
      alert("User query deleted successfully.");
    }
  };

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  const applyFilter = () => {
    setAppliedFilter(selectedFilter);
  };

  const addQuestion = async () => {
    if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
      const newQuery = {
        category: newCategory,
        question: newQuestion,
        answer: newAnswer,
        needs_reminder: needsReminder,
        reminder_date: needsReminder ? reminderDate.toISOString() : null
      };

      try {
        const response = await fetch(API_QUERY + 'add/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newQuery),
        });

        if (response.ok) {
          setQueries([...queries, newQuery]);
          setNewQuestion('');
          setNewAnswer('');
          setNewCategory('CCS Faculty-related Queries');
          setNeedsReminder(false);
          setReminderDate(null);
          setShowAddForm(false);
          if (activeTab === 'dashboard') {
            fetchReminderQueries();
            checkDueReminders();
          }
        }
      } catch (error) {
        console.error('Error adding query:', error);
      }
    }
  };

  const deleteQuery = async (queryId) => {
    const response = await fetch(API_QUERY + `delete/${queryId}/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Error deleting query:', error);
      alert("Failed to delete query from the database.");
    } else {
      setQueries(queries.filter(query => query._id !== queryId));
      alert("Query deleted successfully from the database.");
    }
  };


  const handleEditClick = (query) => {
    setEditingQueryId(query._id);
    setNewQuestion(query.question);
    setNewAnswer(query.answer);
    setNewCategory(query.category || 'CCS Faculty-related Queries');
    setEditReminderNeeded(query.needs_reminder || false);
    setEditReminderDate(query.reminder_date ? new Date(query.reminder_date) : null);
    setShowEditForm(true);
  };

  const updateQuestion = async () => {
    if (editingQueryId && newQuestion.trim() !== '' && newAnswer.trim() !== '') {
      const updatedQuery = {
        question: newQuestion,
        answer: newAnswer,
        category: newCategory,
        needs_reminder: editReminderNeeded,
        reminder_date: editReminderNeeded ? editReminderDate.toISOString() : null
      };

      try {
        const endpoint = activeTab === 'queries'
          ? `${API_USER_QUERIES}edit/${editingQueryId}/`
          : `${API_QUERY}edit/${editingQueryId}/`;

        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedQuery),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === 'success') {
          // Update the queries state
          if (activeTab === 'queries') {
            setUserQueries(userQueries.map(query =>
              query._id === editingQueryId
                ? { ...query, ...updatedQuery }
                : query
            ));
          } else {
            setQueries(queries.map(query =>
              query._id === editingQueryId
                ? { ...query, ...updatedQuery }
                : query
            ));
          }

          // Reset form and close
          setShowEditForm(false);
          setNewQuestion('');
          setNewAnswer('');
          setNewCategory('CCS Faculty-related Queries');
          setEditReminderNeeded(false);
          setEditReminderDate(null);

          // Refresh reminders if we're on dashboard
          if (activeTab === 'dashboard') {
            fetchReminderQueries();
          }

          alert('Query updated successfully!');
        }
      } catch (error) {
        console.error('Error updating query:', error);
        alert(`Failed to update the query: ${error.message}`);
      }
    } else {
      alert("Please fill in all required fields");
    }
  };

  const groupedQueries = appliedFilter === 'all'
    ? queries
    : queries.filter(query => query.category === appliedFilter);

  const groupedByCategory = groupedQueries.reduce((grouped, query) => {
    if (!grouped[query.category]) {
      grouped[query.category] = [];
    }
    grouped[query.category].push(query);
    return grouped;
  }, {});


  // Add this component for the stat card
  const StatCard = ({ title, count, icon }) => (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );

  return (
    <div className="admin-container">
      <nav className="navbar">
        <span className="welcome-message">Welcome, Admin</span>
        <div className="navbar-brand">CCSpark</div>
        <div className="admin-nav">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartLine className="mr-2" />
            Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <FaQuestion className="mr-2" />
            FAQs
          </button>
          <button
            className={`nav-btn ${activeTab === 'queries' ? 'active' : ''}`}
            onClick={() => setActiveTab('queries')}
          >
            <FaExclamationCircle className="mr-2" />
            User Queries
          </button>
          <button
            className={`nav-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            <FaImage className="mr-2" />
            Images
          </button>
          <button
            className={`nav-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FaBook className="mr-2" />
            Course Management
          </button>
        </div>
        <button className="logout-btn" onClick={logout}>LOG OUT</button>
      </nav>

      <div className="content">
        {activeTab == 'faqs' && (<aside className="filters">
          <h2>Filters</h2>
          <ul>
            <li>
              <input
                type="radio"
                name="filter"
                id="all"
                value="all"
                checked={selectedFilter === 'all'}
                onChange={() => setSelectedFilter('all')}
              />
              <label htmlFor="all">ALL</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="faculty"
                value="Frequently Asked Questions"
                checked={selectedFilter === 'Frequently Asked Questions'}
                onChange={() => setSelectedFilter('Frequently Asked Questions')}
              />
              <label htmlFor="faculty">Frequently Asked Questions</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="faculty"
                value="CCS Faculty-related Queries"
                checked={selectedFilter === 'CCS Faculty-related Queries'}
                onChange={() => setSelectedFilter('CCS Faculty-related Queries')}
              />
              <label htmlFor="faculty">CCS Faculty-related Queries</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="orgs"
                value="CCS Student Orgs"
                checked={selectedFilter === 'CCS Student Orgs'}
                onChange={() => setSelectedFilter('CCS Student Orgs')}
              />
              <label htmlFor="orgs">CCS Student Orgs</label>
            </li>
            <li>
              <input
                type="radio"
                name="filter"
                id="events"
                value="CCS Events"
                checked={selectedFilter === 'CCS Events'}
                onChange={() => setSelectedFilter('CCS Events')}
              />
              <label htmlFor="events">CCS Events</label>
            </li>
          </ul>
          <button className="apply-filter-btn" onClick={applyFilter}>Apply Filter</button>
        </aside>
        )}

        <main className="filter-results">
          {activeTab === 'dashboard' ? (
            <div className="dashboard-container">
              {dashboardStats && (
                <>
                  <div className="dashboard-header">
                    <h2>Dashboard Overview</h2>
                  </div>
                  <div className="stats-container">
                    <div className="stats-grid">
                      <StatCard
                        title="Frequently Asked Questions"
                        count={dashboardStats.faq_stats["Frequently Asked Questions"]}
                        icon={<FaQuestion />}
                      />
                      <StatCard
                        title="Faculty Queries"
                        count={dashboardStats.faq_stats["CCS Faculty-related Queries"]}
                        icon={<FaUsers />}
                      />
                      <StatCard
                        title="Student Orgs"
                        count={dashboardStats.faq_stats["CCS Student Orgs"]}
                        icon={<FaUsers />}
                      />
                      <StatCard
                        title="CCS Events"
                        count={dashboardStats.faq_stats["CCS Events"]}
                        icon={<FaUsers />}
                      />
                      <StatCard
                        title="Panoramic Groups"
                        count={dashboardStats.panoramic_groups}
                        icon={<FaImage />}
                      />
                      <StatCard
                        title="Unanswered Queries"
                        count={dashboardStats.pending_queries}
                        icon={<FaExclamationCircle />}
                      />
                    </div>
                  </div>
                  <div className="reminder-queries">
                    <h3 style={{ color: 'white', marginBottom: '15px' }}>Queries Due for Update</h3>
                    {reminderQueries.length > 0 ? (
                      reminderQueries.map(query => {
                        const isDue = new Date(query.reminder_date) <= new Date();

                        return (
                          <div key={query._id} className="reminder-item" style={{
                            borderLeft: isDue ? '4px solid #ff4d4d' : 'none'
                          }}>
                            <div className="reminder-content">
                              <p><strong>Question:</strong> {query.question}</p>
                              <p><strong>Answer:</strong> {query.answer}</p>
                              <p><strong>Category:</strong> {query.category}</p>
                              <p><strong>Update Due:</strong> {' '}
                                <span style={{ color: isDue ? '#ff4d4d' : 'inherit' }}>
                                  {new Date(query.reminder_date).toLocaleDateString()}
                                </span>
                              </p>
                            </div>
                            <div className="action-buttons">
                              <button className="edit-btn" onClick={() => handleEditClick(query)}>
                                Update Now
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ color: 'white' }}>No queries pending update</p>
                    )}
                  </div>
                </>
              )}

            </div>
          ) : activeTab === 'faqs' ? (
            // FAQ content
            Object.keys(groupedByCategory).length === 0 ? (
              <div>
                NO FAQs FOUND
              </div>
            ) : (
              Object.keys(groupedByCategory).map(category => (
                <div key={category} className="query-section">
                  <div className="query-category">{category}</div>
                  {groupedByCategory[category].map(query => (
                    <div key={query._id} className="query-box">
                      <p><strong>Q:</strong> {query.question}</p>
                      <p><strong>A:</strong> {query.answer}</p>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEditClick(query)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteQuery(query._id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )
          ) : activeTab === 'queries' ? (
            // User queries content
            <div>
              {userQueries.length === 0 ? (
                <p>No user queries found.</p>
              ) : (
                <div className="query-section">
                  <div className="query-category">User Queries</div>
                  {userQueries.map(query => (
                    <div key={query._id} className="query-box">
                      <p><strong>Question:</strong> {query.question}</p>
                      <p><strong>Answer:</strong> {query.answer}</p>
                      <p><strong>Category:</strong> {query.category}</p>
                      <p><strong>Status:</strong> {query.status}</p>
                      <div className="action-buttons">
                        <button className="promote-btn" onClick={() => promoteToFAQ(query)}>
                          Promote to FAQ
                        </button>
                        <button className="edit-btn" onClick={() => handleEditClick(query)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => deleteUserQuery(query._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === 'images' ? (
            <div className="panoramic-list">
              {Object.keys(groupedPanoramics).map(groupName => (
                <div key={groupName} className="panoramic-item rounded-lg shadow-md p-4 mb-6">
                  <div className="panoramic-header border-b-2 border-deep-sea pb-4 mb-6">
                    <h3 className="text-3xl font-bold text-deep-sea tracking-wide uppercase">{groupName}</h3>
                  </div>
                  <div className="grid grid-cols-10 gap-4">
                    {groupedPanoramics[groupName].map(panoramic => (
                      <div
                        key={panoramic._id}
                        className={panoramic.category === 'thumbnail' ? 'thumbnail-image-container col-span-4' : 'panoramic-image-container col-span-5'}
                        style={{ flex: panoramic.category === 'thumbnail' ? '0 0 30%' : '1' }}
                      >
                        <p className='image-title font-bold'>
                          {panoramic.category === 'thumbnail' ? "Thumbnail Image" : "Panoramic Image"}
                        </p>
                        <img
                          src={panoramic.s3url}
                          alt={panoramic.filename}
                          className={`w-full h-64 object-cover rounded-lg ${panoramic.category === 'thumbnail' ? 'thumbnail-image' : 'panoramic-image'} admin-image`}
                        />
                        {panoramic.category === 'thumbnail' && (
                          <>
                            <p className='image-location image-caption'><strong>Location:</strong> {panoramic.location}</p>

                          </>
                        )}
                        {panoramic.category === 'panoramic' && (
                          <>
                            <p className='image-description image-caption'><strong>Description: </strong>{panoramic.description}</p>
                          </>
                        )}
                      </div>
                    ))}
                    <button className="delete-btn col-span-1" onClick={() => deletePanoramicsByGroupName(groupName)}>
                      Delete Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'courses' ? (
            <CourseManagement />
          ) : null}
        </main>
        <button className="add-image-btn" onClick={() => setShowUploadForm(true)}><img src={UploadImage} className='upload-image-icon'></img></button>
        <button className="add-question-btn" onClick={() => setShowAddForm(true)}>+</button>

        {showAddForm && (
          <div className="add-question-form">
            <h3>Add New Question</h3>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="CCS Faculty-related Queries">CCS Faculty-related Queries</option>
              <option value="CCS Student Orgs">CCS Student Orgs</option>
              <option value="CCS Events">CCS Events</option>
              <option value="Frequently Asked Questions">FAQs</option>
            </select>

            <label htmlFor="question">Question</label>
            <input
              id="question"
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter your question"
            />

            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Enter the answer"
            />

            <div className="reminder-section">
              <div className="reminder-checkbox">
                <input
                  type="checkbox"
                  id="needs-reminder"
                  checked={needsReminder}
                  onChange={(e) => setNeedsReminder(e.target.checked)}
                />
                <label htmlFor="needs-reminder">Set Update Reminder</label>
              </div>

              {needsReminder && (
                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={reminderDate}
                    onChange={(date) => setReminderDate(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select reminder date"
                    className="date-picker-input"
                  />
                </div>
              )}
            </div>

            <button className="save-btn" onClick={addQuestion}>Save</button>
            <button className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        )}

        {showUploadForm && (
          <>
            <div className="upload-image-form">
              <div className='upload-title-container'>
                <h3>Upload Images</h3>
              </div>
              <div className='group-name-container'>
                <label htmlFor="groupname">Image For:</label>
                <input
                  type="text"
                  id='groupname'
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder='ex: Computer Laboratory'
                />
              </div>
              <div className='upload-container'>
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*"
                  id='thumbnail'
                />
              </div>
              <div className='upload-container'>
                <label htmlFor="panoramic">Panoramic</label>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept="image/*"
                  id='panoramic'
                />
              </div>
              <div className='upload-container'>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  onChange={(e) => setNewLocation(e.target.value)}
                  id='location'
                />
              </div>
              <div className='upload-container'>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  onChange={(e) => setNewDescription(e.target.value)}
                  id='description'
                />
              </div>
              <div className='image-button-containers'>
                <button className="upload-btn" onClick={handleFileUpload} disabled={!selectedThumbnailFile || !selectedPanoramicFile}>Upload Image</button>
                <button className="cancel-btn" onClick={() => setShowUploadForm(false)}>Cancel</button>
              </div>
            </div>
          </>
        )}

        {showEditForm && (
          <div className="edit-question-form">
            <h3>Edit Question</h3>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="CCS Faculty-related Queries">CCS Faculty-related Queries</option>
              <option value="CCS Student Orgs">CCS Student Orgs</option>
              <option value="CCS Events">CCS Events</option>
              <option value="Frequently Asked Questions">FAQs</option>
            </select>

            <label htmlFor="question">Question</label>
            <input
              id="question"
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Edit your question"
            />

            <label htmlFor="answer">Answer</label>
            <input
              id="answer"
              type="text"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Edit the answer"
            />

            <div className="reminder-section">
              <div className="reminder-checkbox">
                <input
                  type="checkbox"
                  id="edit-needs-reminder"
                  checked={editReminderNeeded}
                  onChange={(e) => setEditReminderNeeded(e.target.checked)}
                />
                <label htmlFor="edit-needs-reminder">Set Update Reminder</label>
              </div>

              {editReminderNeeded && (
                <div className="date-picker-wrapper">
                  <DatePicker
                    selected={editReminderDate}
                    onChange={(date) => setEditReminderDate(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    placeholderText="Select reminder date"
                    className="date-picker-input"
                  />
                </div>
              )}
            </div>

            <button className="save-btn" onClick={updateQuestion}>Update</button>
            <button className="cancel-btn" onClick={() => setShowEditForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
