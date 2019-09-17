import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUpOrLogin from './pages/SignUpOrLogin'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Navigation from './components/Navigation'

import { fetchUser } from "./fetchRequests/user";
import { useCookies } from "react-cookie";

function App(props) {

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [response, setResponse] = useState(null);
    
    useEffect(() => {
         if (cookies.token) {
            fetchUser().then(r => setResponse(r));
         } else {
             setResponse(null)
         }
    }, [cookies.token])
    

  return (
    <div className="h-screen w-screen">
      <Router>
        <Navigation user={response} removeCookie={removeCookie} />
        <Route exact path="/sign-up-or-login" component={SignUpOrLogin} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
}

export default App;
