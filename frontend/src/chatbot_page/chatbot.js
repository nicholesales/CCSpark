import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';
import userIcon from "./icons/user-icon.png";
import botIcon from "./icons/bot-icon.png";
import chatIcon from "./icons/vic-logo.png";
import sendIcon from "./icons/send.png";
import './sidebar.css'; // Import CSS for styling
import ReactMarkdown from 'react-markdown';

const GOOGLE_SPEECH_API_KEY = process.env.REACT_APP_GOOGLE_SPEECH_API_KEY; // Load API key from .env

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

function BackToLanding() {
  return (
    <>
      <a className="go-to-landing" href="/">
        <div className="landing-icon">
          Back to Virtual Tour
        </div>
      </a>
    </>
  );
}

const Chatbot = () => {
  const [conversation, setConversation] = useState([]); // For display
  const [internalContext, setInternalContext] = useState([]); // For bot context
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [placeholder, setPlaceholder] = useState('Ask a question...');
  const chatbotMessagesRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [faqs, setFaqs] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/chatbot/', {
          question: 'Introduce yourself. make it short and concise.'
        });

        const chatbotResponse = {
          sender: 'bot',
          text: res.data.response
        };

        setConversation([chatbotResponse]);
      } catch (err) {
        console.error(err);
        // Fallback to a default message if API call fails
        const defaultMessage = {
          sender: 'bot',
          text: 'Hello! I am V.I.C, your virtual chatbot assistant. How can I help you today?'
        };
        setConversation([defaultMessage]);
      }
    };

    fetchInitialMessage();
  }, []);

  faqs = [
    <>What are the programs covered by the CCS Department?</>,
    <></>,
    <></>,
    <></>,
    <></>,
    <></>
  ]

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
    setConversation(prev => [...prev, userMessage]);

    try {
      // Get last N messages for context (e.g., last 10 messages)
      const contextToUse = internalContext.length > 0
        ? [...internalContext.slice(-5), userMessage] // Last 5 messages from internal context
        : [...conversation.slice(-10), userMessage];  // Last 10 messages from full conversation

      const res = await axios.post('http://127.0.0.1:8000/api/chatbot/', {
        question,
        context: contextToUse
      }, {
        timeout: 50000
      });

      // Add check for complete response
      if (!res.data.response) {
        throw new Error('Incomplete response received');
      }

      const chatbotResponse = { sender: 'bot', text: res.data.response };

      // Update display conversation
      setConversation(prev => [...prev, chatbotResponse]);

      // Rest of the code...
    } catch (err) {
      console.error('Error details:', err);
      setError('The response was incomplete. Please try asking again.');
    }
  };

  const faqButtonSubmit = async (predefinedQuestion) => {
    const userMessage = { sender: 'user', text: predefinedQuestion };
    setConversation(prev => [...prev, userMessage]);

    try {
      const contextToUse = internalContext.length > 0
        ? [...internalContext, userMessage]
        : [...conversation, userMessage];

      const res = await axios.post('http://127.0.0.1:8000/api/chatbot/', {
        question: predefinedQuestion,
        context: contextToUse
      });

      const chatbotResponse = { sender: 'bot', text: res.data.response };
      setConversation(prev => [...prev, chatbotResponse]);

      // Check if we need to summarize
      const updatedConversation = [...conversation, userMessage, chatbotResponse];
      if (updatedConversation.length >= 8 && updatedConversation.length % 8 === 0) {
        const conversationText = updatedConversation
          .map(msg => `${msg.sender}: ${msg.text}`)
          .join('\n');

        const summaryRes = await axios.post('http://127.0.0.1:8000/api/chatbot/', {
          question: `Please summarize this conversation concisely, preserving key points: ${conversationText}`
        });

        const summaryMessage = {
          sender: 'bot',
          text: summaryRes.data.response
        };

        setInternalContext([summaryMessage]);
      }

      setError('');
      setIsCollapsed(!isCollapsed);
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
          sampleRate: 48000,
          sampleSize: 16
        }
      });
      setStream(audioStream);

      const recorder = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 48000
      });

      setMediaRecorder(recorder);
      setIsRecording(true);
      setPlaceholder('Recording...');

      const processAudioChunk = async (chunk) => {
        const audioBlob = new Blob([chunk], { type: 'audio/webm;codecs=opus' });
        const audioBase64 = await blobToBase64(audioBlob);

        const requestBody = {
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'en-US',
            model: 'default',
            audioChannelCount: 1,
            enableAutomaticPunctuation: false,
            enableWordTimeOffsets: false
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
              .join(' ');

            setQuestion(prev => {
              return (prev + ' ' + transcription).trim();
            });
            setPlaceholder(prev => (prev + ' ' + transcription).trim());
          }
        } catch (error) {
          console.error('Error details:', error);
        }
      };

      let timesliceMs = 2000;
      let chunks = [];

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          await processAudioChunk(event.data);
        }
      };

      recorder.onstop = () => {
        chunks = [];
      };

      recorder.start(timesliceMs);

      const intervalId = setInterval(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
          chunks = [];
          recorder.start(timesliceMs);
        }
      }, timesliceMs * 1);

      recorder.intervalId = intervalId;

    } catch (error) {
      console.error('Microphone error details:', error);
      setError('Error accessing microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      if (mediaRecorder.intervalId) {
        clearInterval(mediaRecorder.intervalId);
      }

      if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
      }
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setPlaceholder('Ask a question...');
  };

  useEffect(() => {
    return () => {
      if (mediaRecorder) {
        if (mediaRecorder.intervalId) {
          clearInterval(mediaRecorder.intervalId);
        }
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaRecorder, stream]);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Add this updated effect and render logic:
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/faqs/', {
          params: { category: 'Frequently Asked Questions' }
        });
        const faqsData = res.data.faqs.map(faq => faq.question);
        setFaqs(faqsData); // Dynamically set FAQs
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFAQs();
  }, []);
  console.log(faqs); // Add this to check if the data is present

  return (
    <div className='full-container-chatbot'>
      {/* Mobile Sidebar */}
      <div className='for-mobile-only'>
        <div className="sidebar-container">
          <div className='checkbox-container'>
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
          </div>
          <div className={`sidebar ${!isCollapsed ? 'collapsed' : ''}`}>
            <div className='faq-title-container'>
              <div className='faq-title'>Frequently Asked Questions</div>
            </div>
            <div className={`sidebar ${!isCollapsed ? 'collapsed' : ''}`}>
              <div className='faq-title-container'>
                <div className='faq-title'>Frequently Asked Questions</div>
              </div>
              <div className='faq-buttons'>
                {[...Array(10)].map((_, index) => (
                  <input
                    key={index}
                    className='faq-button'
                    type="button"
                    value={`I Asked A FAQ ${index + 1} that is about something lorem ipsum dolor et `}
                    onClick={() => faqButtonSubmit(`This is the question`)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='vic-logo-parent'>
            <div className='vic-logo-container'>
              <img className='icon vic-icon' src={chatIcon} />
            </div>
          </div>
          <BackToLanding />
        </div>
        <div className='faq-side-panel'>
          <BackToLanding />
          <div className='vic-logo-container'>
            <img className='vic-logo' src={chatIcon} alt='logo'>
            </img>
          </div>
          <div className='faq-title-container'>
            <div className='faq-title'>Frequently Asked Questions</div>
          </div>
          <div className='faq-buttons'>
            {[...Array(10)].map((_, index) => (
              <input
                key={index}
                className='faq-button'
                type="button"
                value={`I Asked FAQ ${index + 1} that is about something lorem ipsum dolor et `}
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
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              <div className='faq-buttons'>
                {faqs.map((faq, index) => (
                  <input
                    key={index}
                    className='faq-button'
                    type="button"
                    value={faq}
                    onClick={() => faqButtonSubmit(faq)}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        </div>
        <div className='vic-logo-parent'>
          <div className='vic-logo-container'>
            <img className='icon vic-icon' src={chatIcon} alt='Chat Icon' />
          </div>
        </div>
        <BackToLanding />
      </div>

      {/* Web Sidebar */}
      <div className='faq-side-panel'>
        <BackToLanding />
        <div className='vic-logo-container'>
          <img className='vic-logo' src={chatIcon} alt='logo' />
        </div>
        <div className='faq-title-container'>
          <div className='faq-title'>Frequently Asked Questions</div>
        </div>
        <div className='faq-buttons'>
          {faqs.map((faq, index) => (
            <input
              key={index}
              className='faq-button'
              type="button"
              value={faq}
              onClick={() => faqButtonSubmit(faq)}
            />
          ))}
        </div>
      </div>

      {/* Main Chatbot Container */}
      <div className='parent-container-chatbot'>
        <div className="chatbot-container">
          <div className="chatbot-messages">
            {conversation.map((message, index) => (
              <div key={index} className={`${message.sender}-chat`}>
                {message.sender === "bot" && <BotIconHandler sender={message.sender} />}
                {message.sender === "user" && <UserIconHandler sender={message.sender} />}
                <div className={`chatbot-message ${message.sender}`}>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chatbot-input-container">
            <textarea
              value={question}
              rows={1}
              onChange={(e) => { setQuestion(e.target.value); setError("") }}
              placeholder={placeholder}
              className="chatbot-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // Prevent the default behavior of adding a new line
                  handleSubmit(e); // Call the submit handler
                }
              }}
            />
            <button
              type="button"
              onClick={toggleRecording}
              className={`chatbot-mic-button ${isRecording ? 'recording' : ''}`}
            >
              <MicIcon color={isRecording ? 'red' : 'black'} />
            </button>
            <button type="submit" className="chatbot-submit">
              <img className='send-logo' src={sendIcon} alt='send-icon' />
            </button>
          </form>

          {error && <div className="chatbot-error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Chatbot;