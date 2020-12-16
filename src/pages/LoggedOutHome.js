import React from 'react'
import {Link} from 'react-router-dom'

function LoggedOutHome() {
  return (
    <div className="flex justify-center w-full h-full items-center">
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
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoggedOutHome
