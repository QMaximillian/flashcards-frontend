import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUpOrLogin from './pages/SignUpOrLogin'
import Landing from './pages/Landing'
import Home from './pages/Home'

function App(props) {
  return (
    <div className="h-screen w-screen">
      <Router>
        <Route exact path="/sign-up-or-login" component={SignUpOrLogin} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
}

export default App;
