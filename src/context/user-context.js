import React, {useState, useEffect} from 'react'
import {fetchUser} from '../fetchRequests/user'

export const UserContext = React.createContext({})

export function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const [trigger, setTrigger] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    fetchUser()
      .then(res => {
        setUser(res.user)
        setAuthLoading(false)
      })
      .catch(err => console.log(err))
  }, [trigger])

  return (
    <UserContext.Provider
      value={{user, setUser, setTrigger, authLoading, setAuthLoading}}
    >
      {children}
    </UserContext.Provider>
  )
}
