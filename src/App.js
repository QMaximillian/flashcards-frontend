import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SignUpOrLogin from './pages/SignUpOrLogin'

function App(props) {
  return (
    <div className="h-screen w-screen">
      <Router>
        <Route path="/sign-up-or-login" component={SignUpOrLogin} />
      </Router>
    </div>
  );
}

export default App;
