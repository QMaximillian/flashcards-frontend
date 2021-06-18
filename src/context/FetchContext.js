import React, {createContext} from 'react'
import axios /*, {AxiosInstance}*/ from 'axios'
import PropTypes from 'prop-types'

/* eslint-disable react/prop-types */

// interface FetchProviderProps {
//   children: React.ReactNode;
// }

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
const environmentApiUrlAuth = {
  development: `/api/auth`,
  production: `/api/auth`,
  test: '/api',
}

const environmentApiUrlMain = {
  development: `/api`,
  production: `/api`,
  test: '/api',
}

const FetchContext = createContext(null)
const {Provider} = FetchContext
function FetchProvider({children}) {
  // : FetchProviderProps
  axios.defaults.withCredentials = true

  const authAxios = axios.create({
    baseURL: environmentApiUrlAuth[process.env.NODE_ENV],
    headers: BASE_HEADERS,
  })

  const mainAxios = axios.create({
    baseURL: environmentApiUrlMain[process.env.NODE_ENV],
    headers: BASE_HEADERS,
  })

  // interface AuthObjects {
  //   authAxios: AxiosInstance,
  //   mainAxios: AxiosInstance
  // }

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

FetchContext.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.element]).isRequired,
}
