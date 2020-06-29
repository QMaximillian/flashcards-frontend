import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import LoggedInRoutes from '../components/LoggedInRoutes'
import LoggedOutRoutes from '../components/LoggedOutRoutes'
import { UserContext } from '../context/user-context'
export default function RouteDecider() {
  let { user, authLoading } = useContext(UserContext)
  let [showMessage, setShowMessage] = useState(false)

  let message = `Heroku Dyno may be waking up. If page doesn't load, refresh in 10ish seconds.`

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setShowMessage(true)
      clearTimeout(timeoutId)
    }, 8000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  if (authLoading) {
    return (<div className="flex flex-col h-full w-full justify-center items-center">
      <div className="text-6xl">Loading...</div>
      <div className="text-xl">{showMessage ? message : ''}</div>
    </div>)
  }

  return (
    <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen">
      <div className="col-start-1 col-end-13 row-start-1 row-end-2">
        <Navigation />
      </div>
      <div className="col-start-1 col-end-13 row-start-2 row-end-13">
        {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
      </div>
    </div>
  )
}
