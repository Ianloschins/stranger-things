import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessageList, deleteMessage, updateMessage } from './utils/messageLists';

const MessageList = () => {
  const [messageData, setMessageData] = useState(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Check for the presence of a token
      const token = localStorage.getItem('token');

      if (!token) {
        // If no token is found, redirect the user to the root path
        navigate('/login');
        return; // Stop further execution of this component
      }

      const result = await getMessageList();
      if (result) {
        setMessageData(result);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (messageId) => {
    const response = await deleteMessage(messageId);
    console.log('Delete Response:', response);
    if (response.success) {
      // Reload the message list after successful deletion
      const updatedData = await getMessageList();
      setMessageData(updatedData);
    } else {
      console.error('Delete failed:', response.error);
    }
  };

  const handleUpdate = async (messageId) => {
    const response = await updateMessage(messageId, newMessageContent);
    if (response.success) {
      // Reload the message list after successful update
      const updatedData = await getMessageList();
      console.log('Updated Data:', updatedData);
      setMessageData(updatedData);
      setNewMessageContent('');
    } else {
      console.error('Update failed:', response.error);
    }
  };

  return (
    <div className="message-list-container">
      <div className='message-list'>
      {messageData && messageData.data && messageData.data.messages && messageData.data.messages.length > 0 ? (
        <ul>
          <h2>Your Message's: {messageData.data.username}</h2>
          {messageData.data.messages.map((message) => (
            <li key={message._id}>
              <p><strong>From User:</strong> {message.fromUser.username}</p>
              <p><strong>Content:</strong> {message.content}</p>
              
              {/* Add Delete and Update buttons */}
              <button onClick={() => handleDelete(message._id)}>Delete</button>
              <button onClick={() => handleUpdate(message._id)}>Update</button>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages available.</p>
      )}

      {/* Add a text input for updating messages */}
      <div>
        <input
          type="text"
          placeholder="New message content"
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
        />
        <button onClick={() => handleUpdate(messageData._id)}>Update My Message</button>
      </div>
    </div>
  </div>
  );
};

export default MessageList;
