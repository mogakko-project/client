import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import LandingPage from './components/LandingPage/LandingPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element = {<LandingPage/>}/>
      <Route exact path="/login" element = {<LoginPage/>}/>
      <Route exact path="/register" element = {<RegisterPage/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App