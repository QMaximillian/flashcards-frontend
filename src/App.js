import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteDecider from './components/RouteDecider'
import { AuthProvider } from './context/AuthContext.js'
import { FetchProvider } from './context/FetchContext.js'

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <RouteDecider />
        </FetchProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
