import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegistrationForm from './components/registrationForm';
import NavBar from './components/navBar';
import PostsList from './components/postsList';
import UserPage from './components/userPage';
import MessageList from './components/messageList';
import './components/main.css'

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<PostsList />}/>
        <Route path="/user" element={<UserPage />}/>
        <Route path="/message" element={<MessageList />}/>
      </Routes>
    </Router>
  );
}

export default App;
