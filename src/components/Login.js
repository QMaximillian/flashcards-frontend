import React, {useState, useContext} from 'react'
import TextBox from '../components/TextBox'
import {useHistory} from 'react-router-dom'

import {FetchContext} from '../context/FetchContext'
import {AuthContext} from '../context/AuthContext'

export default function Login(props) {
  let {authAxios} = useContext(FetchContext)
  let {setAuthState} = useContext(AuthContext)
  const [email, setEmail] = useState({name: '', value: ''})
  const [password, setPassword] = useState({name: '', value: ''})
  const [error, setError] = useState(false)
  let history = useHistory()

  async function handleSubmit(event) {
    event.preventDefault()
    authAxios
      .post('/login/', {
        data: {email: email.value, password: password.value},
        withCredentials: true,
      })
      .then(res => {
        setAuthState(res.data)
      })
      .then(() => history.push(`/`))
      .catch(console.log)
  }

  const styleObj = {
    backgroundColor: '#DFDBE5',
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E')",
  }

  return (
    <div
      style={styleObj}
      className="flex justify-center w-full h-full items-center "
    >
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
        <div className="italic text-red-500 h-6 w-full text-center">
          {error ? error : null}
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
              onChange={e => {
                if (error) setError(false)
                setEmail(e)
              }}
              type="email"
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
            onChange={e => {
              if (error) setError(false)
              setPassword(e)
            }}
            type={'password'}
          />
          {/*
                Error checking if nothing is entered
                <p className="mt-2 text-red-500 text-xs italic">Please choose a password.</p>
              */}
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap justify-center sm:items-center sm:justify-between items-stretch">
          <button
            onClick={handleSubmit}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Sign In
          </button>
          {/* <button
            style={{
              borderImage:
                'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            }}
            className=" "
            type="button"
          > */}
          {/* <a
            style={{
              borderImage:
                'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            }}
            className="text-center w-full font-bold rounded h-full w-full py-2 px-2"
            href={`${BASE_URL}/auth/google`}
          >
            Sign In With Google
          </a> */}
          {/* </button> */}
        </div>
      </form>
    </div>
  )
}
