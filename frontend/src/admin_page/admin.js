import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import AWS from 'aws-sdk';
import UploadImage from "./assets/upload.png";

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
  const [activeTab, setActiveTab] = useState('faqs');
  const [userQueries, setUserQueries] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [panoramics, setPanoramics] = useState([]);

  const API_USER_QUERIES = "http://127.0.0.1:8000/api/user-queries/";
  const API_QUERY = "http://127.0.0.1:8000/api/queries/";
  const API_PANORAMICS = "http://127.0.0.1:8000/api/panoramics/";

  // const API_QUERY = "http://ec2-13-238-141-127.ap-southeast-2.compute.amazonaws.com/api/queries/";
  //  const API_USER_QUERIES = "http://ec2-13-238-141-127.ap-southeast-2.compute.amazonaws.com/api/user-queries/";
  //  const API_PANORAMICS = "http://ec2-13-238-141-127.ap-southeast-2.compute.amazonaws.com/api/panoramics/";

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
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload to S3 and MongoDB
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    try {
      // Upload to S3
      const s3Result = await uploadFileToS3(selectedFile);

      // Store reference in MongoDB
      const imageData = {
        fileName: selectedFile.name,
        s3Url: s3Result.Location,
        uploadDate: new Date()
      };

      // Add your MongoDB API endpoint
      const response = await fetch(API_PANORAMICS + 'add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setSelectedFile(null);
      } else {
        throw new Error('Failed to store file reference in MongoDB');
      }
    } catch (error) {
      console.error('Error in file upload:', error);
      alert('Failed to upload file');
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

  // Delete panoramic from both S3 and MongoDB
  const deletePanoramic = async (panoramicId, s3Key) => {
    try {
      // Delete from S3
      const s3Params = {
        Bucket: 'capstoneimagesbucket',
        Key: s3Key
      };
      await s3.deleteObject(s3Params).promise();

      // Delete from MongoDB
      const response = await fetch(`${API_PANORAMICS}delete/${panoramicId}/`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Panoramic deleted successfully');
        fetchPanoramics(); // Refresh the list
      } else {
        throw new Error('Failed to delete panoramic reference from MongoDB');
      }
    } catch (error) {
      console.error('Error deleting panoramic:', error);
      alert('Failed to delete panoramic');
    }
  };












  const fetchUserQueries = async () => {
    const response = await fetch(API_USER_QUERIES);
    const data = await response.json();
    setUserQueries(data);
  };

  useEffect(() => {
    if (activeTab === 'faqs') {
      fetchQueries();
    } else {
      fetchUserQueries();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchQueries();
  }, []);

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
      };

      await fetch(API_QUERY + 'add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuery),
      });

      setQueries([...queries, newQuery]);
      setNewQuestion('');
      setNewAnswer('');
      setNewCategory('CCS Faculty-related Queries');
      setShowAddForm(false);
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
    setNewAnswer(query.answer)
    setNewCategory(query.category || 'CCS Faculty-related Queries'); // Default category for promoted queries
    setShowEditForm(true); // Show the edit form
  };

  const updateQuestion = async () => {

    if (editingQueryId) {
      if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {

        // Ensure category has a default if somehow undefined
        const category = newCategory || 'CCS Faculty-related Queries';

        const updatedQuery = {
          question: newQuestion,
          answer: newAnswer,
          category: newCategory,
        };
        console.log('Category being sent:', category); // Debug log
        console.log('Full update data:', updatedQuery); // Debug log
        try {
          const endpoint = activeTab === 'queries'
            ? `${API_USER_QUERIES}edit/${editingQueryId}/`
            : `${API_QUERY}edit/${editingQueryId}/`;

          console.log('Sending update request:', {
            endpoint,
            queryId: editingQueryId,
            data: updatedQuery
          });

          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedQuery),
          });

          // Log the full response for debugging
          const responseBody = await response.text();
          console.log('Response status:', response.status);
          console.log('Response body:', responseBody);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, body: ${responseBody}`);
          }

          const result = await JSON.parse(responseBody);

          if (result.status === 'success') {
            if (activeTab === 'queries') {
              setUserQueries(userQueries.map(query =>
                query._id === editingQueryId
                  ? {
                    ...query,
                    ...updatedQuery,
                    status: 'answered'
                  }
                  : query
              ));
            } else {
              setQueries(queries.map(query =>
                query._id === editingQueryId
                  ? { ...query, ...updatedQuery }
                  : query
              ));
            }

            setShowEditForm(false);
            setNewQuestion('');
            setNewAnswer('');
            setNewCategory('CCS Faculty-related Queries');
            alert('Query updated successfully!');
          } else {
            console.error('Update failed:', result);
            alert(`Failed to update the query: ${result.message || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error updating query:', error);
          alert(`Failed to update the query: ${error.message}`);
        }
      }
    } else {
      alert("Editing query ID is not set. Please select a query to edit.");
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

  return (
    <div className="admin-container">
      <nav className="navbar">
        <span className="welcome-message">Welcome, Admin</span>
        <div className="navbar-brand">CCSpark</div>
        <div className="nav-buttons">
          <button className={`nav-btn ${activeTab === 'faqs' ? 'active' : ''}`} onClick={() => setActiveTab('faqs')}>FAQs</button>
          <button className={`nav-btn ${activeTab === 'queries' ? 'active' : ''}`} onClick={() => setActiveTab('queries')}>User Queries</button>
        </div>
        <button className="logout-btn" onClick={logout}>LOG OUT</button>
      </nav>

      <div className="content">
        <aside className="filters">
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
            <li>
              <input
                type="radio"
                name="filter"
                id="panoramics"
                value="panoramics"
                checked={selectedFilter === 'Panoramic Images'}
                onChange={() => setSelectedFilter('Panoramic Images')}
              />
              <label htmlFor="events">Panoramic Images</label>
            </li>
          </ul>
          <button className="apply-filter-btn" onClick={applyFilter}>Apply Filter</button>
        </aside>

        <main className="filter-results">
          {activeTab === 'faqs' ? (
            // FAQ content
            Object.keys(groupedByCategory).length === 0 ? (
              <div className="panoramic-list">
                {panoramics.map(panoramic => (
                  <div key={panoramic._id} className="panoramic-item">
                    <img
                      src={panoramic.s3url}
                      alt={panoramic.filename}
                      className='panoramic-image'
                    />
                    <div>
                      <p className='file-name-title'> File Name: </p>
                      {panoramic.filename}
                    </div>
                    <p>{panoramic.fileName}</p>
                    <button className="delete-btn" onClick={() => deletePanoramic(panoramic._id, panoramic.filename)}>
                      Delete
                    </button>
                  </div>
                ))}
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
          ) : (
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
          )}
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

            <button className="save-btn" onClick={addQuestion}>Save</button>
            <button className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        )}

        {showUploadForm && (
          <>
            <div className="upload-image-form">
              <h3>Upload Panoramic Image</h3>
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
              />
              <button className="save-btn" onClick={handleFileUpload} disabled={!selectedFile}>Upload Image</button>
              <button className="cancel-btn" onClick={() => setShowUploadForm(false)}>Cancel</button>
            </div>
          </>
        )}

        {showEditForm && ( // Add Edit Form UI
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

            <button className="save-btn" onClick={updateQuestion}>Update</button>
            <button className="cancel-btn" onClick={() => setShowEditForm(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
