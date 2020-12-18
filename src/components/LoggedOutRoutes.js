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
      <Route component={ LoggedOutHome }
exact
path="/" />
      <Route component={ Login }
exact
path="/login" />
      <Route component={ SignUp }
exact
path="/sign-up" />
      <Route
        exact
        path="/card-sets/:id"
        render={ props => (
          <div className="w-full h-full flex-col-reverse">
            <ShowCardSet { ...props } />
          </div>
        ) }
      />
      <Route component={ CardSetSearchResults }
path="/search/:search" />
      <Redirect to="/" />
    </Switch>
  )
}
