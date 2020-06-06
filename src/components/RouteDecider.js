import React, {useContext} from 'react'
import Navigation from '../components/Navigation'
import LoggedInRoutes from '../components/LoggedInRoutes'
import LoggedOutRoutes from '../components/LoggedOutRoutes'
import {UserContext} from '../context/user-context'
export default function RouteDecider() {
  let {user, authLoading} = useContext(UserContext)
  if (authLoading)
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="text-6xl">Loading...</div>
      </div>
    )

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
      <header
        role="banner"
        className="col-start-1 col-end-13 row-start-1 row-end-2"
      >
        <Navigation />
      </header>
      <div className="col-start-1 col-end-13 row-start-2 row-end-13">
        {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </div>
    </div>
  )
}
