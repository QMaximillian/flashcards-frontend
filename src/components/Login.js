import React, {useState, useContext} from 'react'
import TextBox from '../components/TextBox'
import {useHistory, Redirect} from 'react-router-dom'
import {UserContext} from '../context/user-context'

export default function Login(props) {
  const {setTrigger, setAuthLoading} = useContext(UserContext)
  const [email, setEmail] = useState({name: '', value: ''})
  const [password, setPassword] = useState({name: '', value: ''})
  const [username, setUsername] = useState(false)
  const [changeType, setChangeType] = useState('password')
  let history = useHistory()

  // React.useEffect(() => {
  //   if (user) {
  //     history.push('/')
  //     // window.location.reload()
  //   }
  // }, [user, history])

  function handleSubmit(e) {
    handleLoginFetch(e)
  }

  function handleLoginFetch(e) {
    e.preventDefault()
    return fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email: email.value, password: password.value}),
    })
      .then(r => r.json())
      .then(r => {
        console.log('xxx0', r.user)
        if (r.user) {
          setAuthLoading(true)
          setTrigger(true)
          history.push('/')
        }
      })
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
              value={email.value}
              onChange={setEmail}
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
            onChange={setPassword}
            type={changeType}
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
          <button
            style={{
              borderImage:
                'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
            }}
            className="w-full font-bold py-2 px-2 rounded "
            type="button"
          >
            <a href="http://localhost:8000/auth/google">Sign In With Google</a>
          </button>
        </div>
      </form>
    </div>
  )
}
