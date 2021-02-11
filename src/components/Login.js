import React, {useReducer, useContext, useEffect, useCallback} from 'react'
import axios from 'axios'
import TextBox from './TextBox'
import {useHistory} from 'react-router-dom'
import {FetchContext} from '../context/FetchContext'
import {AuthContext} from '../context/AuthContext'

const ERROR = 'ERROR'
const GUEST_LOGIN = 'GUEST_LOGIN'
function loginReducer(state, action) {
  switch (action.type) {
    case GUEST_LOGIN:
      return {
        ...state,
        email: {
          ...state.email,
          value: '1234@gmail.com',
        },
        password: {
          ...state.password,
          value: '1234',
        },
        loginType: 'GUEST',
      }
    case ERROR:
      return {...state, error: action.error}
    default:
      return {
        ...state,
        [action.id]: {...state[action.id], value: action.data},
      }
  }
}

const initialLoginState = {
  email: {
    name: 'email',
    value: '',
  },
  password: {
    name: 'password',
    value: '',
  },
  error: {},
  loginType: 'USER',
}

function Login() {
  let {authAxios} = useContext(FetchContext)
  let {setAuthState} = useContext(AuthContext)
  const [{email, password, error, loginType}, dispatch] = useReducer(
    loginReducer,
    initialLoginState,
  )
  let history = useHistory()

  const handleSubmit = useCallback(
    event => {
      if (event) event.preventDefault()
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      authAxios({
        url: '/login',
        method: 'POST',
        data: {email: email.value, password: password.value},
        cancelToken: source.token,
      })
        .then(res => {
          setAuthState(res.data)
        })
        .then(() => history.push(`/`))
        .catch(error => {
          dispatch({type: ERROR, error: error.response})
        })

      return () => source.cancel()
    },
    [authAxios, email.value, password.value, history, setAuthState],
  )

  useEffect(() => {
    if (loginType === 'GUEST') {
      handleSubmit()
    }
  }, [loginType, handleSubmit])

  return (
    <div className="flex justify-center w-full h-full items-center">
      <form className="bg-white shadow-md rounded px-8 py-6 w-5/6">
        <div className="italic text-red-500 h-6 w-full text-center">
          {error.data?.message}
        </div>
        <div className="mb-6">
          <label className="text-sm block font-bold  pb-2" htmlFor="email">
            Email Address
          </label>
          <div className="h-8">
            <TextBox
              className={
                'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              id="email"
              name="email"
              onChange={event => dispatch({id: event.id, data: event.value})}
              placeholder={'Email'}
              type="email"
              value={email.value.toLowerCase()}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            className="text-sm block font-semibold pb-2"
            htmlFor="password"
          >
            Password
          </label>
          <TextBox
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            id="password"
            name="password"
            onChange={event => dispatch({id: event.id, data: event.value})}
            placeholder={'Password'}
            required={true}
            type="password"
            value={password.value}
          />
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <button
            className="mr-4 mb-4 sm:mb-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleSubmit}
            type="button"
          >
            Sign In
          </button>
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={() => {
              dispatch({type: GUEST_LOGIN})
            }}
          >
            Guest Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
