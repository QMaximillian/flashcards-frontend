import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import NavDrawer from "./components/NavDrawer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateCardSetForm from "./components/CreateCardSetForm";
import UserCardSetsPage from "./pages/UserCardSetsPage";
import ShowCardSet from "./pages/ShowCardSet";
import EditCardSet from "./pages/EditCardSet";
import CardSetSearchResults from "./pages/CardSetSearchResults.js";
import useFetch from './lib/hooks/useFetch'
// import FlashcardsNavDrawer from "./components/FlashcardNavDrawer";
import {UserProvider, UserContext } from "./context/user-context.js";


const LoggedInRoutes = () => {

  return (
    <div className="flex w-full h-full pt-16">
      <Route path="/" component={NavDrawer} />

      <div className="w-full h-full">
        <Route exact path="/card-sets/" component={UserCardSetsPage} />
        <Switch>
          <Route exact path="/card-sets/new" component={CreateCardSetForm} />
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

          {/* <Redirect to="/" from="/home" component={Home} /> */}
          <Route exact path="/card-sets/:id/edit" component={EditCardSet} />
          <Route path="/search/:search" component={CardSetSearchResults} />

          <Route path="/:user/" component={UserCardSetsPage} />
          <Route exact path="/" render={() => <Home />} />
        </Switch>
      </div>
    </div>
  );
};

const LoggedOutRoutes = () => {
  // console.log('loggedoutroutes', user)
  return (
    <>
    <Route
        exact
        path="/"
        component={() => (
          <div className="pt-16">
            Home
          </div>
        )}
      />
      <Route
        exact
        path="/login"
        component={Login}
      />
         <Route exact path="/sign-up" component={SignUp} />
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

function App(props) {
    // const { loading, data, error } = useFetch('/user')
  return (
    <div className="h-full">
      <Router>
        <UserProvider>
          <Navigation />
          <RouteDecider />
        </UserProvider>
      </Router>
    </div>
  );
}

function RouteDecider(props){
  let { user } = useContext(UserContext)

  if (user) {
    return <LoggedInRoutes />
  } else {
    return <LoggedOutRoutes />
  }
}

export default App;


