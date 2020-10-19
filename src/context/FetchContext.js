import React, {createContext} from 'react'
import axios from 'axios'

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const environmentApiUrlAuth = {
  development: `/api/auth`,
  production: `/api/auth`,
}

const environmentApiUrlMain = {
  development: `/api`,
  production: `/api`,
}

const FetchContext = createContext()
const {Provider} = FetchContext

function FetchProvider({children}) {
  axios.defaults.withCredentials = true

  const authAxios = axios.create({
    baseURL: environmentApiUrlAuth[process.env.NODE_ENV],
    headers: BASE_HEADERS,
  })

  const mainAxios = axios.create({
    baseURL: environmentApiUrlMain[process.env.NODE_ENV],
    headers: BASE_HEADERS,
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
