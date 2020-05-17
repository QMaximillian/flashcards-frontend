import React, {useContext} from 'react'
import Navigation from '../components/Navigation'
import LoggedInRoutes from '../components/LoggedInRoutes'
import LoggedOutRoutes from '../components/LoggedOutRoutes'
import {UserContext} from '../context/user-context'
export default function RouteDecider(props) {
  let {user, authLoading} = useContext(UserContext)
  if (authLoading) {
    return (
      <main className="flex h-full w-full justify-center items-center">
        <p className="text-6xl">Loading...</p>
      </main>
    )
  }

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
      <nav className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Navigation />
      </nav>
      <main className="col-start-1 col-end-13 row-start-2 row-end-13">
        {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </main>
    </div>
  )
}
