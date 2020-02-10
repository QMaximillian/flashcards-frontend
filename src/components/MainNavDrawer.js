import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {UserContext} from "../context/user-context";

export default function MainNavDrawer(props) {
  const userRouteMatch = useRouteMatch(["/:user", "/:user/studied"]);
  const recentRouteMatch = useRouteMatch("/:user/recent");
  let { user } = useContext(UserContext)

  return (
    <div className="text-gray-700 font-semibold text-sm flex flex-col shadow-2xl h-full w-full">
      <div className="border border-gray-200 border-r-0 border-l-0 flex flex-1 flex-col">
        <Link
          className={`w-full items-center flex flex-1 justify-start`}
          to="/"
        >
          <div
            className={`${
              recentRouteMatch ? "bg-orange-500" : null
            } w-full py-4 hover:bg-orange-500 pl-4`}
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
              // className={`w-full items-center flex-1 justify-start flex`}

              className={`hover:bg-orange-500 w-full items-center flex-1 justify-start flex ${
                userRouteMatch && !recentRouteMatch ? "bg-orange-500" : null
              }`}
              to={`/${user.username}`}
            >
              <div
                className={`${
                  userRouteMatch && !recentRouteMatch ? "bg-orange-500" : null
                } w-full py-4 hover:bg-orange-500 pl-4`}
              >
                Card Sets
              </div>
            </Link>
        <Link className="w-full items-center flex-1 justify-start flex" to="#">
          <div className="w-full py-4 hover:bg-orange-500 pl-4 opacity-25 cursor-not-allowed">
            Folders
          </div>
        </Link>
        <Link className="w-full items-center flex-1 justify-start flex" to="#">
          <div className="w-full py-4 hover:bg-orange-500 pl-4 opacity-25 cursor-not-allowed">
            Classes
          </div>
        </Link>
      </div>
      <div className="border border-gray-200 border-r-0 border-l-0 flex flex-1"></div>
      </div>
  );
}
