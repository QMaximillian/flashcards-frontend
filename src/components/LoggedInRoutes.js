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
      <Route path="/" component={NavDrawer} />

      <Switch>
        <Redirect to="/" from="/sign-up" />
        <Route exact path="/card-sets/" component={UserCardSetsPage} />
        <Route path="/search/:search" component={CardSetSearchResults} />
        <Route path="/search/" component={CardSetSearchResults} />
        <Route exact path="/card-sets/new" component={CreateCardSetForm} />
        <Route
          exact
          path="/card-sets/:id"
          render={props => (
            <div className="col-start-1 col-end-13 row-start-1 row-end-13 w-full h-full flex-col-reverse">
              <ShowCardSet {...props} />
            </div>
          )}
        />

        <Route exact path="/card-sets/:id/edit" component={EditCardSet} />
        <Route path="/:user/" component={UserCardSetsPage} />
        <Route exact path="/" component={LoggedInHome} />
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
