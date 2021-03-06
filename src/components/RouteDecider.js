import React, {useContext} from 'react'
import Navigation from '../components/Navigation'
import LoggedInRoutes from '../components/LoggedInRoutes'
import LoggedOutRoutes from '../components/LoggedOutRoutes'
import {AuthContext} from '../context/AuthContext'

function RouteDecider() {
  let {isAuthenticated} = useContext(AuthContext)
  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
      <span className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Navigation />
      </span>
      <main className=" bg-gray-300 col-start-1 col-end-13 row-start-2 row-end-13 overflow-scroll">
        {isAuthenticated() ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </main>
    </div>
  )
}

export default RouteDecider
