import React, {useState} from 'react'
import TextBox from './TextBox'
import {Redirect} from 'react-router-dom'

export default function SignUp(props) {
  const [email, setEmail] = useState({name: '', value: ''})
  const [password, setPassword] = useState({name: '', value: ''})
  const [firstName, setFirstName] = useState({name: '', value: ''})
  const [lastName, setLastName] = useState({name: '', value: ''})
  const [username, setUsername] = useState({name: '', value: ''})
  const [redirect, setRedirect] = useState(false)
  const [, setError] = useState(null)

  function handleSubmit(e) {
    if (!email || !password || !username || !firstName || !lastName) {
      return
    }
    handleSignUpFetch(e)
  }

  function handleSignUpFetch(e) {
    e.preventDefault()
    return fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      credentials: 'include',
      body: JSON.stringify({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        username: username.value,
      }),
    })
      .then(r => r.json())
      .then(r => {
        if (r.code) {
          setError(`${r.code} - ${r.status}`)
        } else {
          setRedirect(true)
        }
      })
      .catch(err => {
        // console.log(err)
      })
  }

  if (redirect) return <Redirect to={`/login`} />

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
            className={
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            }
            placeholder={'Email'}
            name="email"
            value={email.value}
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
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Sign Up
          </button>
          <button
            style={{
              borderImage:
                'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            }}
            className="w-full font-bold py-2 px-2 rounded "
            type="button"
          >
            <a href="http://localhost:8000/auth/google">Sign Up With Google</a>
          </button>
        </div>
      </form>
    </div>
  )
}
