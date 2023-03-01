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
import PostFormPage from './components/Posts/PostFormPage'
import GroupDetailPage from './Groups/GroupDetailPage/GroupDetailPage'
import StudyPostFormPage from './Groups/StudyPostPage/StudyPostFormPage'
import StudyPostsDetailPage from './Groups/StudyPostPage/StudyPostDetailPage'
import MyGroupsPage from './components/MyGroupsPage/MyGroupsPage'

function App() {
  return (
   <BrowserRouter basename={process.env.PUBLIC_URL}>
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
          <Route exact path="/posts/new" element = {<PostFormPage/>}/>
          <Route exact path="/posts/edit/:postId" element = {<PostFormPage/>}/>
          <Route exact path="/groups/detail/:groupId" element = {<GroupDetailPage/>}/>
          <Route exact path="/groups/:groupId/posts/study/new" element = {<StudyPostFormPage/>}/>
          <Route exact path="/posts/study/detail/:postId" element = {<StudyPostsDetailPage/>}/>
          <Route exact path="/myGroups" element = {<MyGroupsPage/>}/>
        </Routes>
      </div>
   </BrowserRouter>
  )
}

export default App