import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import NavDrawer from './components/NavDrawer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CreateCardSetForm from './components/CreateCardSetForm'
import UserCardSetsPage from './pages/UserCardSetsPage'
import ShowCardSet from './pages/ShowCardSet'
import EditCardSet from "./pages/EditCardSet";
import CardSetSearchResults from "./pages/CardSetSearchResults.js";
import { fetchUser } from './fetchRequests/user'
import {UserProvider} from './context/UserContext'


// import { fetchUser } from "./fetchRequests/user";

function App(props) {
    const [response, setResponse] = useState(null);
    // const [navBar, setNavBar] = useState(null);
    
    useEffect(() => {
            fetchUser().then(r => setResponse(r))
    }, [])
    
    // useEffect(() => {
    //   console.log(props)
    // }, [props])

  return (
    <UserProvider value={response && response.user}>
      <div className="">
        <Router>
          <Navigation />
          <div className="flex w-full h-full">
            <Route path="/" component={NavDrawer} />

            <div className="w-full h-full">
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/card-sets/" component={UserCardSetsPage} /> */}
              <Switch>
                <Route
                  exact
                  path="/card-sets/new"
                  component={CreateCardSetForm}
                />
                <Route exact path="/card-sets/:id" component={ShowCardSet} />

                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/" component={Home} />
                <Redirect exact path="/home" component={Home} />
                <Route
                  exact
                  path="/card-sets/:id/edit"
                  component={EditCardSet}
                />
                <Route
                  path="/search/:search"
                  component={CardSetSearchResults}
                />
                <Route path="/:user/" component={UserCardSetsPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
