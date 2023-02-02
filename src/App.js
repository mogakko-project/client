import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import NavBar from './components/NavBar/NavBar'
import EditProfilePage from './components/EditProfilePage/EditProfilePage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import PostPage from './components/Posts/PostPage'
import PostDetailPage from './components/PostDetailPage/PostDetailPage'
import NewPostPage from './components/Posts/NewPostPage'

function App() {
  return (
   <BrowserRouter>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route exact path="/" element = {<LandingPage/>}/>
          <Route exact path="/login" element = {<LoginPage/>}/>
          <Route exact path="/register" element = {<RegisterPage/>}/>
          <Route exact path="/initProfile" element = {<EditProfilePage/>}/>
          <Route exact path="/editProfile" element = {<EditProfilePage/>}/>
          <Route exact path="/profile/:userId" element = {<ProfilePage/>}/>
          <Route exact path="/posts/:postType" element = {<PostPage/>}/>
          <Route exact path="/posts/detail/:postId" element = {<PostDetailPage/>}/>
          <Route exact path="/posts/new" element = {<NewPostPage/>}/>
        </Routes>
      </div>
   </BrowserRouter>
  )
}

export default App