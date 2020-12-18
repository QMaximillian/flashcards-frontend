import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoggedInHome from '../pages/LoggedInHome'
import NavDrawer from './NavDrawer'
import CreateCardSetForm from './CreateCardSetForm'
import UserCardSetsPage from '../pages/UserCardSetsPage'
import ShowCardSet from '../pages/ShowCardSet'
import EditCardSet from '../pages/EditCardSet'
import CardSetSearchResults from '../pages/CardSetSearchResults.js'
import NoMatch from './NoMatch'

export default function LoggedInRoutes() {
  return (
    <div className="grid grid-rows-11 grid-cols-12 h-full w-full">
      <Route component={NavDrawer}
path="/" />

      <Switch>
        <Redirect from="/sign-up"
to="/" />
        <Route component={UserCardSetsPage}
exact
path="/card-sets/" />
        <Route component={CardSetSearchResults}
path="/search/:search" />
        <Route component={CardSetSearchResults}
path="/search/" />
        <Route component={CreateCardSetForm}
exact
path="/card-sets/new" />
        <Route
          exact
          path="/card-sets/:id"
          render={props => (
            <div className="col-start-1 col-end-13 row-start-1 row-end-13 w-full h-full flex-col-reverse overflow-scroll">
              <ShowCardSet {...props} />
            </div>
          )}
        />

        <Route component={EditCardSet}
exact
path="/card-sets/:id/edit" />
        <Route component={UserCardSetsPage}
path="/:user/" />
        <Route component={LoggedInHome}
exact
path="/" />
        <Route
          component={() => (
            <div>
              <NoMatch />
            </div>
          )}
        />
      </Switch>
    </div>
  )
}
