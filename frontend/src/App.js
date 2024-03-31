import './App.css';
import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/home/home';
import Login from './components/login/login';
import Signup from './components/signup/Signup';
import Upload from './components/upload/Upload';
import Chat from './components/chat/Chat'
import { initializeSessionTimer } from './sessionTimer';
import ProfileDetail from './components/profileDetail/ProfileDetail';
import PostDetails from './components/PostDetail/PostDetails';

import { useSelector } from 'react-redux';
import ArticleForm from './components/Article/ArticleForm';
import ArticleList from './components/Article/ArticleLists';

function App() {
 const {user} = useSelector((state) => state.auth)


 useEffect(() => {
  initializeSessionTimer(); // Start the session timer when the application starts
}, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/upload' element={user ? <Upload /> : <Navigate to='/login' />} />
        <Route path='/profileDetail/:id' element={user ? <ProfileDetail /> : <Navigate to='/login' />} />
        <Route path='/postDetails/:id' element={user ? <PostDetails /> : <Navigate to='/login' />} />
        <Route path='/chat' element={user ? <Chat /> : <Navigate to='/login' />} />
        <Route path='/articleform' element={user ? <ArticleForm /> : <Navigate to='/login' />} />
        <Route path='/articlelist' element={user ? <ArticleList /> : <Navigate to='/login' />} />
       
      </Routes>
    
    </div>
  );
}

export default App;