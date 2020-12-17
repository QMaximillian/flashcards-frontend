import React, {useReducer, useContext} from 'react'
import TextBox from './TextBox'
import {useHistory} from 'react-router-dom'

import {FetchContext} from '../context/FetchContext'
import {AuthContext} from '../context/AuthContext'

const ERROR = 'ERROR'

function loginReducer(state, action) {
  switch (action.type) {
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
}

export default function Login(props) {
  let {authAxios} = useContext(FetchContext)
  let {setAuthState} = useContext(AuthContext)
  const [{email, password, error}, dispatch] = useReducer(
    loginReducer,
    initialLoginState,
  )
  let history = useHistory()

  async function handleSubmit(event) {
    event.preventDefault()

    authAxios({
      url: '/login',
      method: 'POST',
      data: {email: email.value, password: password.value},
    })
      .then(res => {
        setAuthState(res.data)
      })
      .then(() => history.push(`/`))
      .catch(error => {
        dispatch({type: ERROR, error: error.response})
      })
  }

  return (
    <div className="flex justify-center w-full h-full items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="italic text-red-500 h-6 w-full text-center">
          {error.data?.message}
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-sm block font-bold  pb-2">
            Email Address
          </label>
          <div className="h-8">
            <TextBox
              className={
                'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              }
              placeholder={'Email'}
              name="email"
              value={email.value.toLowerCase()}
              onChange={event => dispatch({id: event.id, data: event.value})}
              type="email"
              id="email"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-sm block font-semibold pb-2"
          >
            Password
          </label>
          <TextBox
            required={true}
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'Password'}
            name="password"
            value={password.value}
            onChange={event => dispatch({id: event.id, data: event.value})}
            type="password"
            id="password"
          />
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}
