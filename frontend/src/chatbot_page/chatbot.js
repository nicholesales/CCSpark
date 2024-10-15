import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css';

const Chatbot = () => {
  const [conversation, setConversation] = useState([]);  // Store entire conversation
  const [question, setQuestion] = useState('');  // User's current input
  const [error, setError] = useState('');  // Error handling
  const [faqValue, setFaqValue] = useState(''); // Storing the FAQ selected by the user

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

  const faqButtonSubmit = async (predefinedQuestion) => {

    // Append the user's question to the conversation
    const userMessage = { sender: 'user', text: predefinedQuestion };
    setConversation((prevConversation) => [...prevConversation, userMessage]);

    try {
      const res = await axios.post('http://localhost:8000/api/chatbot/', { question: predefinedQuestion });
      const chatbotResponse = { sender: 'bot', text: res.data.response };

      // Append the chatbot's response to the conversation
      setConversation((prevConversation) => [...prevConversation, chatbotResponse]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='full-container-chatbot'>
      <div className='faq-side-panel'>
        <input
          className='faq-button'
          type="button"
          value="I Asked A FAQ"
          onClick={() => faqButtonSubmit('What is the first most frequent asked question?')}>
        </input>
        <input
          className='faq-button'
          type="button"
          value="I Asked A FAQ 2"
          onClick={() => faqButtonSubmit('What is the second most frequent asked question?')}
        />
        <input
          className='faq-button'
          type="button"
          value="I Asked A FAQ 3"
          onClick={() => faqButtonSubmit('What is the third most frequent asked question?')}
        />
        <input
          className='faq-button'
          type="button"
          value="I Asked A FAQ 4"
          onClick={() => faqButtonSubmit('What is the fourth most frequent asked question?')}
        />
        <input
          className='faq-button'
          type="button"
          value="I Asked A FAQ 5"
          onClick={() => faqButtonSubmit('What is the fifth most frequent asked question?')}
        />
      </div>
      <div className='parent-container-chatbot'>
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
              onChange={(e) => {setQuestion(e.target.value); setError("")}}
              placeholder="Ask a question..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-submit">
              Send
            </button>
          </form>

          {error && <div className="chatbot-error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
