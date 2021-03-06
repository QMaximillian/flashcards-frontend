import React from 'react'
import {Route, Switch} from 'react-router-dom'
import MainNavDrawer from './MainNavDrawer'

function NavDrawer() {
  return (
    <Switch>
      <Route
        component={null}
        exact
        path={[
          '/card-sets/new',
          '/card-sets/:id',
          '/card-sets/:id/edit',
          '/search',
          '/search/:id',
        ]}
      ></Route>

      <Route
        path="/"
        render={() => (
          <div className="row-start-1 row-end-13 col-start-1 col-end-4 bg-gray-100 border-r-2 border-gray-200">
            <MainNavDrawer />
          </div>
        )}
      ></Route>
    </Switch>
  )
}

export default NavDrawer
