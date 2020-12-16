import React, {useContext, useReducer} from 'react'
import TextBox from './TextBox'

import {FetchContext} from '../context/FetchContext'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function signUpReducer(state, action) {
  return {
    ...state,
    [action.id]: {...state[action.id], value: action.data},
  }
}

const initialSignUpState = {
  firstName: {
    name: 'firstName',
    value: '',
  },
  lastName: {
    name: 'lastName',
    value: '',
  },
  username: {
    name: 'username',
    value: '',
  },
  email: {
    name: 'email',
    value: '',
  },
  password: {
    name: 'password',
    value: '',
  },
}

function SignUp(props) {
  const {authAxios} = useContext(FetchContext)
  const {setAuthState} = useContext(AuthContext)
  const [
    {email, password, firstName, lastName, username},
    dispatch,
  ] = useReducer(signUpReducer, initialSignUpState)

  const history = useHistory()

  function handleSubmit(event) {
    if (!email || !password || !username || !firstName || !lastName) {
      return
    }
    handleSignUpFetch(event)
  }

  function handleSignUpFetch(event) {
    event.preventDefault()
    authAxios({
      url: '/register',
      method: 'POST',
      data: {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        username: username.value,
      },
    }).then(res => {
      setAuthState(res.data)
      setTimeout(() => history.push('/'), 700)
    })
  }

  function handleDispatch(partialEvent) {
    dispatch({id: partialEvent.id, data: partialEvent.value})
  }

  return (
    <div className="flex justify-center w-full h-full items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="mb-6">
          <label
            htmlFor="firstName"
            className="text-sm block font-semibold pb-2"
          >
            First Name
          </label>
          <TextBox
            id="firstName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={'Enter your first name'}
            name="first name"
            value={firstName.value}
            onChange={handleDispatch}
            type="text"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lastName"
            className="text-sm block font-semibold  pb-2"
          >
            Last Name
          </label>
          <TextBox
            id="lastName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={'Enter your last name'}
            name="last name"
            value={lastName.value}
            onChange={handleDispatch}
            type="text"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="text-sm block font-semibold pb-2"
          >
            Username
          </label>
          <TextBox
            id="username"
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'Enter your username'}
            name="username"
            value={username.value}
            onChange={handleDispatch}
            type="text"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="text-sm block font-semibold  pb-2">
            Email Address
          </label>
          <TextBox
            id="email"
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'Email'}
            name="email"
            value={email.value.toLowerCase()}
            onChange={handleDispatch}
            type="email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-sm block font-semibold pb-2"
          >
            Password
          </label>
          <TextBox
            id="password"
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'Password'}
            name="password"
            value={password.value}
            onChange={handleDispatch}
            type="password"
            required
          />
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
