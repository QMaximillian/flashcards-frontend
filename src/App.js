import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LoggedInHome from "./pages/LoggedInHome";
import LoggedOutHome from "./pages/LoggedOutHome";
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
    <div className="flex w-full">
      <Route path="/" component={NavDrawer} />

      {/* <div className="w-full h-full"> */}
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
          <Route exact path="/" component={LoggedInHome} />
          <Route component={() => 
           <div>
             <div>
                No Match
             </div>
             </div>
          }/>
        </Switch>
      {/* </div> */}
    </div>
  );
};

const LoggedOutRoutes = () => {
  // console.log('loggedoutroutes', user)
  return (
    <>
    <Switch>
    <Route
        exact
        path="/"
        component={LoggedOutHome}
      />
      <Route
        exact
        path="/login"
        component={Login}
      />
         <Route exact path="/sign-up" component={SignUp} />
      
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
        <Route component={() => 
           <div>
             <div>
                No Match
             </div>
             </div>
          }/>
      </Switch>
          
      
    </>
  );
};

function App(props) {
    // const { loading, data, error } = useFetch('/user')
  return (
    // <div className="h-full flex flex-col">
      <Router>
        <UserProvider>
          <Navigation />
          <RouteDecider />
        </UserProvider>
      </Router>
    // </div>
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


