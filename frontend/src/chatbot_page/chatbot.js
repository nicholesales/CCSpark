import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatbot.css';
import userIcon from "./icons/user-icon.png";
import botIcon from "./icons/bot-icon.png";
import chatIcon from "./icons/chat.png";
import './sidebar.css'; // Import CSS for styling

const GOOGLE_SPEECH_API_KEY = '';

function UserIconHandler({ sender }) {
  return (
    <div className="icon-container user-icon-container">
      <img className="icon user-icon" src={userIcon} alt="User Icon" />
    </div>
  )
}

function BotIconHandler({ sender }) {
  return (
    <div className="icon-container bot-icon-container">
      <img className="icon bot-icon" src={botIcon} alt="Bot Icon" />
    </div>
  )
}

const MicIcon = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const Chatbot = () => {
  const [conversation, setConversation] = useState([]);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [faqValue, setFaqValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCheckboxChange = (event) => {
    // Collapse the sidebar if checked, expand if unchecked
    setIsCollapsed(event.target.checked);
  };
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    const userMessage = { sender: 'user', text: question };
    setConversation((prevConversation) => [...prevConversation, userMessage]);

    try {
      const res = await axios.post('http://localhost:8000/api/chatbot/', { question });
      const chatbotResponse = { sender: 'bot', text: res.data.response };

      setConversation((prevConversation) => [...prevConversation, chatbotResponse]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }

    setQuestion('');
  };

  const handleSidebarToggle = async () => {

  }

  const faqButtonSubmit = async (predefinedQuestion) => {
    const userMessage = { sender: 'user', text: predefinedQuestion };
    setConversation((prevConversation) => [...prevConversation, userMessage]);

    try {
      // const res = await axios.post('http://localhost:8000/api/chatbot/', { question: predefinedQuestion });
      const chatbotResponse = { sender: 'bot', text: "res.data.response" };

      setConversation((prevConversation) => [...prevConversation, chatbotResponse]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 48000
        }
      });
      setStream(audioStream);

      const recorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
      setMediaRecorder(recorder);
      setIsRecording(true);

      const audioChunks = [];
      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioBase64 = await blobToBase64(audioBlob);

        const requestBody = {
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
            model: 'default'
          },
          audio: {
            content: audioBase64.split(',')[1]
          }
        };

        try {
          const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_SPEECH_API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.results && data.results.length > 0) {
            const transcription = data.results
              .map(result => result.alternatives[0].transcript)
              .join('\n');
            setQuestion(transcription);
          } else {
            setError('No speech detected. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('Error processing speech. Please try again.');
        }
      };

      recorder.start(1000); // Collect data in 1-second chunks
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Error accessing microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Helper function to convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className='full-container-chatbot'>
      <div className='for-mobile-only '>
        <div className="sidebar-container">
          <input
            type="checkbox"
            id="checkbox"
            checked={isCollapsed}
            onChange={handleCheckboxChange} />
          <label htmlFor='checkbox' className='toggle'>
            <div className='bars' id="bar1"></div>
            <div className='bars' id="bar2"></div>
            <div className='bars' id="bar3"></div>
          </label>
          <div className={`sidebar ${!isCollapsed ? 'collapsed' : ''}`}>
            <div className='faq-buttons'>
              {[...Array(10)].map((_, index) => (
                <input
                  key={index}
                  className='faq-button'
                  type="button"
                  value={`I Asked A FAQ ${index + 1} to make this shit longer just to test the responsiveness type thingamajig`}
                  onClick={() => faqButtonSubmit(`What is the ${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} most frequent asked question?`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='faq-side-panel'>
        <div className='vic-logo-container'>
          <img className='vic-logo' src={chatIcon}>
          </img>
        </div>
        <div className='faq-buttons'>
          {[...Array(10)].map((_, index) => (
            <input
              key={index}
              className='faq-button'
              type="button"
              value={`I Asked A FAQ ${index + 1} to make this shit longer just to test the responsiveness type thingamajig`}
              onClick={() => faqButtonSubmit(`What is the ${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} most frequent asked question?`)}
            />
          ))}
        </div>
      </div>
      <div className='parent-container-chatbot'>
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {conversation.map((message, index) => (
              <div key={index} className={`${message.sender}-chat`}>
                {message.sender === "bot" && <BotIconHandler sender={message.sender} />}
                {message.sender === "user" && <UserIconHandler sender={message.sender} />}
                <div className={`chatbot-message ${message.sender}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input-container">
            <input
              type="text"
              value={question}
              onChange={(e) => { setQuestion(e.target.value); setError("") }}
              placeholder="Ask a question..."
              className="chatbot-input"
            />
            <button
              type="button"
              onClick={toggleRecording}
              className={`chatbot-mic-button ${isRecording ? 'recording' : ''}`}
            >
              <MicIcon color={isRecording ? 'red' : 'black'} />
            </button>
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