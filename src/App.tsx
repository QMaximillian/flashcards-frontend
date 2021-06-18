import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import RouteDecider from './components/RouteDecider'
import {AuthProvider} from './context/AuthContext.js'
import {FetchProvider} from './context/FetchContext'

function App() {
  return (
    <Router>
      <FetchProvider>
        <AuthProvider>
          <RouteDecider />
        </AuthProvider>
      </FetchProvider>
    </Router>
  )
}

export default App
