import React, {createContext} from 'react'
import axios from 'axios'

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const environmentApiUrlAuth = {
  development: `${process.env.REACT_APP_DEVELOPMENT_API_URL}/auth`,
  production: `${process.env.REACT_APP_PRODUCTION_API_URL}/auth`,
}

const environmentApiUrlMain = {
  development: process.env.REACT_APP_DEVELOPMENT_API_URL,
  production: process.env.REACT_APP_PRODUCTION_API_URL,
}

const FetchContext = createContext()
const {Provider} = FetchContext

function FetchProvider({children}) {
  const authAxios = axios.create({
    baseURL: environmentApiUrlAuth[process.env.NODE_ENV],
    headers: BASE_HEADERS,
    withCredentials: true,
  })

  const mainAxios = axios.create({
    baseURL: environmentApiUrlMain[process.env.NODE_ENV],
    headers: BASE_HEADERS,
    withCredentials: true,
  })

  return (
    <Provider
      value={{
        authAxios,
        mainAxios,
      }}
    >
      {children}
    </Provider>
  )
}

export {FetchContext, FetchProvider}
