import React from 'react'
import {Route, Switch} from 'react-router-dom'
import ShowCardSet from '../pages/ShowCardSet'
import NoMatch from './NoMatch'
import Login from './Login'
import SignUp from './SignUp'
import LoggedOutHome from '../pages/LoggedOutHome'
import CardSetSearchResults from '../pages/CardSetSearchResults'

export default function LoggedOutRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={LoggedOutHome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
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
      <Route
        component={() => (
          <div className="justify-center items-center flex max-w-6xl w-full h-full">
            <NoMatch />
          </div>
        )}
      />
    </Switch>
  )
}
