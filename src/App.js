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
import SetProfilePage from './components/SetProfilePage/SetProfilePage'

function App() {
  return (
   <BrowserRouter>
        <NavBar />
    <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route exact path="/login" element = {<LoginPage/>}/>
      <Route exact path="/register" element = {<RegisterPage/>}/>
      <Route exact path="/setProfile" element = {<SetProfilePage/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App