import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import UserContext from '../context/UserContext'

export default function MainNavDrawer(props) {

  const user = useContext(UserContext)

  const userRouteMatch = useRouteMatch(['/:user', '/:user/studied'])
  const recentRouteMatch = useRouteMatch('/:user/recent')

    return (
      <div className="text-gray-700 font-semibold text-sm flex flex-col shadow-2xl h-auto overflow-y-auto w-full justify-start">
        <div className="h-64 border border-gray-200 border-r-0 border-l-0 flex flex-1 flex-col">
          <Link
            className={`${
              recentRouteMatch ? "bg-orange-500" : null
            } hover:bg-orange-500 w-full items-center flex flex-1 justify-start`}
            to="/"
          >
            <div className="pl-4">Home</div>
          </Link>
          <div className="flex flex-1 " />
          <div className="flex flex-1 " />
        </div>
        <div
          className={`h-64 border border-gray-200 border-r-0 border-l-0 flex flex-1 flex-col justify-center`}
        >
          <Link
            className={`hover:bg-orange-500 w-full items-center flex-1 justify-start flex ${
              userRouteMatch && !recentRouteMatch ? "bg-orange-500" : null
            }`}
            to={`/${user && user.username}`}
          >
            <div className="pl-4"> Card Sets</div>
          </Link>
          <Link
            className="hover:bg-orange-500 w-full items-center flex-1 justify-start flex"
            to="#"
          >
            <div className="pl-4 opacity-25 cursor-not-allowed">Folders</div>
          </Link>
          <Link
            className="hover:bg-orange-500 w-full items-center flex-1 justify-start flex"
            to="#"
          >
            <div className="pl-4 opacity-25 cursor-not-allowed">Classes</div>
          </Link>
        </div>
        <div className="hover:bg-orange-500 h-64 border border-gray-200 border-r-0 border-l-0 flex"></div>
      </div>
    );
}