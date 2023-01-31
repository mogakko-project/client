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
import ProjectPostPage from './components/Posts/ProjectPostPage'

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
          <Route exact path="/posts/project" element = {<ProjectPostPage/>}/>
        </Routes>
      </div>
   </BrowserRouter>
  )
}

export default App