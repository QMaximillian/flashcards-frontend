import React, {createContext} from 'react'
import axios from 'axios'

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const environmentApiUrlAuth = {
  development: 'http://localhost:8000/auth',
  production: '',
}

const environmentApiUrlMain = {
  development: 'http://localhost:8000',
  production: '',
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
