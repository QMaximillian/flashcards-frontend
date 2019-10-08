import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import SignUpOrLogin from './pages/SignUpOrLogin'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import NavDrawer from './components/NavDrawer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateCardSetForm from './components/CreateCardSetForm'
import UserCardSets from './pages/UserCardSets'
import CardSetShow from './pages/CardSetShow'
import EditCardSet from "./pages/EditCardSet";
import { fetchUser } from './fetchRequests/user'


// import { fetchUser } from "./fetchRequests/user";

function App(props) {

    const [response, setResponse] = useState(null);
    const [navBar, setNavBar] = useState(null);
    
    useEffect(() => {
            fetchUser().then(r => setResponse(r))
    }, [])
    
    useEffect(() => {
      console.log(props)
    }, [props])

  return (
    <div className="">
      <Router>
        <Navigation user={response && response.user} />
        <div className="flex w-full h-full">
          <div className="w-1/4 h-full">
              <Route path="/" component={NavDrawer} />
          </div>
          <div className="w-3/4 h-full overflow-auto mx-10">
            <Route exact path="/login" component={Login} />
            <Route exact path="/card-sets" component={UserCardSets} />
            <Switch>
              <Route
                exact
                path="/card-sets/new"
                component={CreateCardSetForm}
              />
              <Route exact path="/card-sets/:id" component={CardSetShow} />
            </Switch>
            <Route exact path="/sign-up" component={SignUp} />
            <Route
              exact
              path="/home"
              component={() => <Home setNavBar={setNavBar} />}
            />
            <Route exact path="/" component={Landing} />
            <Route exact path="/card-sets/:id/edit" component={EditCardSet}/>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
