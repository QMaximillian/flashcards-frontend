import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import RouteDecider from './components/RouteDecider'
import {UserProvider} from './context/user-context.js'

function App(props) {
  return (
    <Router>
      <UserProvider>
        <RouteDecider />
      </UserProvider>
    </Router>
  )
}

export default App
