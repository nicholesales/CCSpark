import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function Admin({ handleLogout }) {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [appliedFilter, setAppliedFilter] = useState('all');
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to control visibility of the edit form
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('CCS Faculty-related Queries'); 
  const [editingQueryId, setEditingQueryId] = useState(null); // Track the ID of the query being edited
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    const response = await fetch('http://52.62.64.107/api/queries/'); // Adjust according to your Django server
    const data = await response.json();
    setQueries(data);
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

      await fetch('http://52.62.64.107/api/queries/add/', {
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
    const response = await fetch(`http://52.62.64.107/api/queries/delete/${queryId}/`, {
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
    setNewCategory(query.category);
    setShowEditForm(true); // Show the edit form
  };

  const updateQuestion = async () => {
    if (editingQueryId) { // Check if editingQueryId is valid
      if (newQuestion.trim() !== '' && newAnswer.trim() !== '') {
        const updatedQuery = {
          question: newQuestion,
          answer: newAnswer,
          category: newCategory,
        };
  
        const response = await fetch(`http://52.62.64.107/api/queries/edit/${editingQueryId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedQuery),
        });
  
        const result = await response.json(); // Parse response for error handling
        if (response.ok) {
          setQueries(queries.map(query => (query._id === editingQueryId ? { ...query, ...updatedQuery } : query)));
          setShowEditForm(false); // Hide the edit form
          // Reset the input fields
          setNewQuestion('');
          setNewAnswer('');
          setNewCategory('CCS Faculty-related Queries');
        } else {
          console.error('Update failed:', result); // Log error message for debugging
          alert(`Failed to update the query: ${result.message || 'Unknown error'}`);
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
          </ul>
          <button className="apply-filter-btn" onClick={applyFilter}>Apply Filter</button>
        </aside>

        <main className="filter-results">
          {Object.keys(groupedByCategory).length === 0 ? (
            <p>No queries found.</p>
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
          )}
        </main>

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
