import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';

const Chatbot = () => {
  const [conversation, setConversation] = useState([]);  // Store entire conversation
  const [question, setQuestion] = useState('');  // User's current input
  const [error, setError] = useState('');  // Error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    // Append the user's question to the conversation
    const userMessage = { sender: 'user', text: question };
    setConversation((prevConversation) => [...prevConversation, userMessage]);

    try {
      const res = await axios.post('http://localhost:8000/api/chatbot/', { question });
      const chatbotResponse = { sender: 'bot', text: res.data.response };

      // Append the chatbot's response to the conversation
      setConversation((prevConversation) => [...prevConversation, chatbotResponse]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    // Clear the input field after the message is sent
    setQuestion('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {conversation.map((message, index) => (
          <div className={`${message.sender}-chat`}>
            <div key={index} className={`chatbot-message ${message.sender}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chatbot-input-container">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-submit">
          Send
        </button>
      </form>

      {error && <div className="chatbot-error">{error}</div>}
    </div>
  );
};

export default Chatbot;
