import React, { useState } from 'react';
import generateResponseGOR from './generateResponseGOR';
import botAvatar from './bot.png';
import './App.css'; // Make sure the path is correct
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [chat, setChat] = useState([
    {
      text: 'Hello! How can I help you today?',
      sender: 'bot',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
	setIsLoading(true);
  
	const userMessage = {
	  text: input,
	  sender: 'user',
	};
  
	setChat([...chat, userMessage]); // Show user's input immediately

  
	const botResponse = await generateResponseGOR(input, chatHistory);
  
	const botMessage = {
	  text: botResponse,
	  sender: 'bot',
	};
  
	setChat((prevChat) => [...prevChat, botMessage]); // Show bot's response
  
	await AsyncStorage.setItem(
	  'chatHistory',
	  JSON.stringify([
		...chatHistory,
		{ role: 'user', text: input  },
		{ role: 'model', text: botResponse  },
	  ])
	);
  
	setChatHistory([
	  ...chatHistory,
	  { role: 'user', text: input  },
	  { role: 'model', text: botResponse  },
	]);
  
	setIsLoading(false);
	setInput('');
  };

  return (
    <div className="chat">
      <div className="message-container">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
            style={{ marginBottom: index === chat.length - 1 ? '10px' : '5px' }}
          >
            {msg.sender === 'bot' && (
              <div className="avatar">
                <img src={botAvatar} alt="bot avatar" width="36" height="36" />
              </div>
            )}

            <div className={`bubble ${msg.sender}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />

        <button onClick={handleSend} disabled={isLoading}>
          {isLoading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
