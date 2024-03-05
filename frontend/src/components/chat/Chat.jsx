import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chat.css'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    // Fetch messages from the backend
    axios.get('http://localhost:5000/chat/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/chat/messages', { text: inputText, username });

    // Fetch updated messages from the backend
    const response = await axios.get('http://localhost:5000/chat/messages');
    setMessages(response.data);

    // Clear the input field
    setInputText('');
  };

  return (
    <div className="chat-container">
    <div className="main-container">
      <div className="left-panel">
        <h2>Mental Health Information</h2>
       
        <h2>News and Articles</h2>
        {/* Add news and articles here */}
        <p>News 1</p>
        <p>News 2</p>
        <p>Article 1</p>
        <p>Article 2</p>
      </div>
      <div className="right-panel">
        <div className="chatbox-container">
          <header>
            <h1>ANONYMOUS CHATBOX</h1>
          </header>
          <div className="message-container">
            
          {messages && messages.map((message) => (
  <div key={message._id} className="message">
    <strong>{message.username}: </strong>
    {message.text}
  </div>
))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Type your message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <br />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Chat