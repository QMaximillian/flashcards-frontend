import React, {createContext, useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {FetchContext} from './FetchContext'
import PropTypes from 'prop-types'

/* eslint-disable react/prop-types */
const AuthContext = createContext()
const {Provider} = AuthContext

function AuthProvider({children}) {
  const history = useHistory()
  const {authAxios} = useContext(FetchContext)
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')
  const expiresAt = localStorage.getItem('expiresAt')

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {},
  })

  function setAuthInfo({userInfo, expiresAt}) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)

    setAuthState({
      token,
      userInfo,
      expiresAt,
    })
  }

  async function logout() {
    await authAxios('/logout')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    setAuthState({})
    history.push('/login')
  }

  function isAuthenticated() {
    if (!authState.expiresAt) {
      return false
    }
    return new Date().getTime() / 1000 < authState.expiresAt
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  )
}

AuthContext.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.element]).isRequired,
}

export {AuthContext, AuthProvider}
