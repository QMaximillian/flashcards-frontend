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

  function handleDispatch(event) {
    const {id, value: data} = event
    dispatch({id, data})
  }

  return (
    <div className="flex justify-center w-full h-full items-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="mb-6">
          <label
            className="text-sm block font-semibold pb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <TextBox
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            name="first name"
            onChange={ handleDispatch }
            placeholder={ 'Enter your first name' }
            required
            type="text"
            value={ firstName.value }
          />
        </div>
        <div className="mb-6">
          <label
            className="text-sm block font-semibold  pb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <TextBox
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            name="last name"
            onChange={ handleDispatch }
            placeholder={ 'Enter your last name' }
            required
            type="text"
            value={ lastName.value }
          />
        </div>
        <div className="mb-6">
          <label
            className="text-sm block font-semibold pb-2"
            htmlFor="username"
          >
            Username
          </label>
          <TextBox
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            id="username"
            name="username"
            onChange={ handleDispatch }
            placeholder={ 'Enter your username' }
            required
            type="text"
            value={ username.value }
          />
        </div>
        <div className="mb-6">
          <label className="text-sm block font-semibold  pb-2"
htmlFor="email">
            Email Address
          </label>
          <TextBox
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            id="email"
            name="email"
            onChange={ handleDispatch }
            placeholder={ 'Email' }
            required
            type="email"
            value={ email.value.toLowerCase() }
          />
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
            onChange={ handleDispatch }
            placeholder={ 'Password' }
            required
            type="password"
            value={ password.value }
          />
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={ handleSubmit }
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
