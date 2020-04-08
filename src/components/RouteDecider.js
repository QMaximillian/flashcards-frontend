import React, {useContext, useState} from 'react'
import Navigation from '../components/Navigation'
import LoggedInRoutes from '../components/LoggedInRoutes'
import LoggedOutRoutes from '../components/LoggedOutRoutes'
import {UserContext} from '../context/user-context'

export default function RouteDecider(props) {
  let {user, authLoading} = useContext(UserContext)
  let [showMobileMenu, setShowMobileMenu] = useState(false)
  if (authLoading)
    return (
      <div className="flex h-full w-full justify-center items-center">
        <div className="text-6xl">Loading...</div>
      </div>
    )

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
      <div className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Navigation
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
      </div>
      <div className="relative col-start-1 col-end-13 row-start-2 row-end-13">
        {showMobileMenu ? (
          <div className="absolute h-full w-full bg-gray-500"></div>
        ) : null}
        {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </div>
    </div>
  )
}
