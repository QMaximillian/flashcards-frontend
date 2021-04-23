import React from 'react'
import {Link} from 'react-router-dom'

function LoggedOutHome() {
  return (
    <div className="flex justify-center w-full h-full items-center">
      <form className="bg-white shadow-lg rounded h-1/2">
        <div className="flex flex-col justify-between h-full p-10 sm:px-24 sm:py-16">
          <div className="text-center text-3xl sm:text-4xl italic">
            Welcome to Flashcards
          </div>
          <div className="text-center sm:text-2xl text-lg italic">
            Create, Search, and Study Card Sets
          </div>
          <div className="w-full flex sm:flex-row flex-col sm:items-center sm:justify-between">
            <Link
              className="my-2 sm:my-0 mx-0 sm:mx-2 sm:max-w-xs text-center w-full bg-teal-500 hover:bg-teal-700 text-white text-sm font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              to="/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className="sm:my-2 my-2 mx-0 sm:mx-2 sm:max-w-xs text-center w-full bg-teal-500 hover:bg-teal-700 text-white text-sm font-bold py-2 rounded focus:outline-none focus:shadow-outline"
              to="/login"
            >
              Login / Guest Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoggedOutHome
