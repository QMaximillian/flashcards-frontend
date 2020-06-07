import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
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
      .catch(err => {})
  }, [trigger])

  return (
    <UserContext.Provider
      value={{user, setUser, setTrigger, authLoading, setAuthLoading}}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
}
