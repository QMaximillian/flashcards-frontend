import React from 'react' // useEffect
import {Route, Switch} from 'react-router-dom'

import MainNavDrawer from '../components/MainNavDrawer'

export default function NavDrawer(props) {
  return (
    <Switch>
      <Route exact path="/card-sets/new" component={null}></Route>
      <Route exact path="/card-sets/:id" component={null}></Route>
      <Route exact path="/card-sets/:id/edit" component={null}></Route>
      <Route exact path="/search/:search" component={null}></Route>
      <Route exact path="/search/" component={null}></Route>
      <Route
        path="/"
        render={() => (
          <div
            className="row-start-1 row-end-13 col-start-1 col-end-4
          "
          >
            <MainNavDrawer />
          </div>
        )}
      ></Route>
    </Switch>
  )
}
