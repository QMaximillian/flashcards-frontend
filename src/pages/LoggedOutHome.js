import React from 'react'
import {Link} from 'react-router-dom'

function LoggedOutHome(props) {
  const styleObj = {
    backgroundColor: '#DFDBE5',
    backgroundImage:
      "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E')",
  }

  return (
    <div
      style={styleObj}
      className="flex justify-center w-full h-full items-center"
    >
      <form className="bg-white shadow-lg rounded p-16 mb-4  max-w-6xl flex flex-col justify-center">
        <div className="mb-6 text-center text-4xl italic">
          Welcome to Flashcards
        </div>
        <div className="mb-6 text-center text-2xl italic">
          Create, Search, and Study Card Sets
        </div>
        <div className="flex flex-wrap sm:flex-no-wrap  items-center justify-between">
          <Link
            to="/sign-up"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            data-testid="homepage-sign-up-link"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            data-testid="homepage-login-link"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoggedOutHome
