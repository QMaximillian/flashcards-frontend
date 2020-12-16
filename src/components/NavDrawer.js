import React from 'react'
import {Route, Switch} from 'react-router-dom'
import MainNavDrawer from './MainNavDrawer'

export default function NavDrawer() {
  return (
    <Switch>
      <Route
        exact
        path={['/card-sets/new', '/card-sets/:id', '/search', '/search/:id']}
        component={null}
      ></Route>
      <div
        className="row-start-1 row-end-13 col-start-1 col-end-4
          "
      >
        <Route path="/" component={MainNavDrawer}></Route>
      </div>
    </Switch>
  )
}
