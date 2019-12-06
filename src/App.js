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
import UserProvider from './context/user-context'
import UserContext from './context/UserContext';
import { fetchUser } from './fetchRequests/user'
// import UserContext from './context/UserContext'
// import FlashcardsNavDrawer from "./components/FlashcardNavDrawer";


// import { fetchUser } from "./fetchRequests/user";

function App(props) {
    // const [navBar, setNavBar] = useState(null);
    const [response, setResponse] = useState(null);
    // console.log(response)
    useEffect(() => {
            fetchUser().then(r => setResponse(r))
    }, [])

    console.log(response)
    
    const LoggedInRoutes = () => {
      return (
        
              <div className="flex w-full h-full">
                <Route path="/" component={NavDrawer} />

                <div className="w-full h-full">
                  {/* <Route exact path="/card-sets/" component={UserCardSetsPage} /> */}
                  <Switch>
                    <Route
                      exact
                      path="/card-sets/new"
                      component={CreateCardSetForm}
                    />
                    {/* <div className="w-full h-full flex-col-reverse"> */}
                    <Route
                      exact
                      path="/card-sets/:id"
                      render={props => (
                        <div className="w-full h-full flex-col-reverse">
                          <ShowCardSet {...props} />
                        </div>
                      )}
                    />

                    <Redirect to="/" from="/home" component={Home} />
                    <Route
                      exact
                      path="/card-sets/:id/edit"
                      component={EditCardSet}
                    />
                    <Route
                      path="/search/:search"
                      component={CardSetSearchResults}
                    />
                    <Route exact path="/sign-up" component={SignUp} />
                    

                    <Route path="/:user/" component={UserCardSetsPage} />
                    <Route exact path="/" component={Home} />
                  </Switch>
                </div>
              </div>

      );
    };

    const LoggedOutRoutes = () => {
      return (
        <>
          <Route
            exact
            path="/"
            component={() => (
              <div>
                <Login />
              </div>
            )}
          />
          <Switch>
            {/* <Route exact path="/card-sets/new" component={CreateCardSetForm} /> */}
            <Route
              exact
              path="/card-sets/:id"
              render={props => (
                <div className="w-full h-full flex-col-reverse">
                  <ShowCardSet {...props} />
                </div>
              )}
            />
            <Route path="/search/:search" component={CardSetSearchResults} />
          </Switch>
          </>
      );
    };
    let user = React.useContext(UserContext)
    console.log(user && user.user)
    // return response && response.user ? <LoggedInRoutes /> : <LoggedOutRoutes />
    return (
      <div className="">
        <Router>
          <UserProvider>
            <UserContext.Consumer>
              {user => (   
                <div>
                  <Navigation user={user}/>
                  {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
                </div>         
              )}
            </UserContext.Consumer>
          </UserProvider>
        </Router>
      </div>
    );


    
}

export default App;
