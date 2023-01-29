import React from 'react'
import Auth from '../../hoc/auth'

function LandingPage() {
  return (
    <div>LandingPage</div>
  )
}

export default Auth(LandingPage, null)