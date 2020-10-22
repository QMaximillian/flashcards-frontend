import React, {useContext, useState} from 'react'
import TextBox from './TextBox'
import Button from './Button'

import {FetchContext} from '../context/FetchContext'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export default function SignUp(props) {
  const {authAxios} = useContext(FetchContext)
  const {setAuthState} = useContext(AuthContext)
  const [email, setEmail] = useState({name: '', value: ''})
  const [password, setPassword] = useState({name: '', value: ''})
  const [firstName, setFirstName] = useState({name: '', value: ''})
  const [lastName, setLastName] = useState({name: '', value: ''})
  const [username, setUsername] = useState({name: '', value: ''})

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

  return (
    <div
      style={{
        backgroundColor: '#DFDBE5',
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns='http:www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E')",
      }}
      className="flex justify-center w-full h-full items-center "
    >
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
            onChange={setFirstName}
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
            onChange={setLastName}
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
            onChange={setUsername}
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
            onChange={setEmail}
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
            onChange={setPassword}
            type="password"
            required
          />
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <Button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
