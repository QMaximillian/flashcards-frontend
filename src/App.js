import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUpOrLogin from './pages/SignUpOrLogin'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateCardSetForm from './components/CreateCardSetForm'

import { fetchUser } from "./fetchRequests/user";

function App(props) {

    const [response, setResponse] = useState(null);
    const [navBar, setNavBar] = useState(null);
    
    useEffect(() => {
            async function fetchUser(){
              const result = await fetch('http://localhost:8000/user', {
                credentials: 'include'
              })

              return result
            }

            fetchUser().then(r => r.json()).then(r => setResponse(r))

    }, [])
    


  return (
    <div className="h-screen w-screen">
      <Router>
        <Navigation user={response && response.user}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/card-sets/new" component={CreateCardSetForm} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/home" component={() => <Home setNavBar={setNavBar}/>} />
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
}

export default App;
