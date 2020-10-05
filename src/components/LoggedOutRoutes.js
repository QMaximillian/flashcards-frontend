import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ShowCardSet from '../pages/ShowCardSet'
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
      <Redirect to="/" />
    </Switch>
  )
}
