import React, {useContext} from 'react'
import Navigation from './Navigation'
import LoggedInRoutes from './LoggedInRoutes'
import LoggedOutRoutes from './LoggedOutRoutes'
import {AuthContext} from '../context/AuthContext'

// TYPES
import { IAuthContext } from './types/Auth'

const RouteDecider: React.FC<{}> = () => {
  let {isAuthenticated} = useContext<IAuthContext>(AuthContext)
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
