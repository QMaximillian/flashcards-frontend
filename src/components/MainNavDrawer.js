import React, {useContext} from 'react'
import {Link, useRouteMatch} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function MainNavDrawer() {
  const userRouteMatch = useRouteMatch(['/:user', '/:user/studied'])
  const recentRouteMatch = useRouteMatch('/:user/recent')
  let {authState} = useContext(AuthContext)

  return (
    <div className="text-gray-700 font-semibold text-sm flex flex-col shadow-2xl h-full w-full">
      <div className="border border-gray-200 border-r-0 border-l-0 flex flex-1 flex-col">
        <Link
          className={`w-full items-center flex flex-1 justify-start`}
          to="/"
        >
          <div
            className={`${
              recentRouteMatch ? 'bg-yellow-500' : null
            } w-full py-4 hover:bg-yellow-500 pl-4`}
          >
            Home
          </div>
        </Link>
        <div className="flex flex-1 " />
        <div className="flex flex-1 " />
      </div>
      <div
        className={`border border-gray-200 border-r-0 border-l-0 flex flex-1 flex-col justify-center`}
      >
        <Link
          className={`hover:bg-yellow-500 w-full items-center flex-1 justify-start flex ${
            userRouteMatch && !recentRouteMatch ? 'bg-yellow-500' : null
          }`}
          to={`/${authState.userInfo.username}`}
        >
          <div
            className={`${
              userRouteMatch && !recentRouteMatch ? 'bg-yellow-500' : null
            } w-full py-4 hover:bg-yellow-500 pl-4`}
          >
            Card Sets
          </div>
        </Link>
        <Link className="w-full items-center flex-1 justify-start flex" to="#">
          <div className="w-full py-4 hover:bg-yellow-500 pl-4 opacity-25 cursor-not-allowed">
            Folders
          </div>
        </Link>
        <Link className="w-full items-center flex-1 justify-start flex" to="#">
          <div className="w-full py-4 hover:bg-yellow-500 pl-4 opacity-25 cursor-not-allowed">
            Classes
          </div>
        </Link>
      </div>
      <div className="border border-gray-200 border-r-0 border-l-0 flex flex-1"></div>
    </div>
  )
}

export default MainNavDrawer
