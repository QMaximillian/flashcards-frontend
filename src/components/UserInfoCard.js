import React, { useContext } from 'react'
import UserContext from "../context/UserContext";
import { Link, useParams, useRouteMatch } from 'react-router-dom'
// import PropTypes from "prop-types";

export default function UserInfoCard(props){
  const { user: userParam } = useParams()
    const user = useContext(UserContext);

    const createdMatch = useRouteMatch('/:user')
    const recentMatch = useRouteMatch('/:user/recent')
    const studiedMatch = useRouteMatch('/:user/studied')
    
        if (user) {
          return (
            <div className="flex">
              <div className="flex p-6">
                <div>
                  <img
                    className="w-32 h-32 rounded-full mr-4 bg-gray-500"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-around">
                  <div className="flex ml-4">
                    {renderUser()}
                    <div className="self-center ml-8 text-gray-500 font-light tracking-wide">{`${user.first_name} ${user.last_name}`}</div>
                  </div>
                  {renderMatch()}
                </div>
              </div>
            </div>
          );
        } else {
            return <div>Loading...</div>
        }

       function renderMatch() {
         return (
           <div className="flex ml-4">
             <Link to={`/${userParam}/recent`}>
               <div
                 className={`${
                   recentMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4`}
               >
                 Recent
               </div>
             </Link>
             <Link to={`/${userParam}`}>
               <div
                 className={`${
                   createdMatch && !studiedMatch && !recentMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4`}
               >
                 Created
               </div>
             </Link>
             <Link to={`/${userParam}/studied`}>
               <div
                 className={`${
                   studiedMatch
                     ? "bg-yellow-500 text-black"
                     : "hover:text-yellow-500 text-teal-300"
                 } border border-gray-500 py-2 px-4 `}
               >
                 Studied
               </div>
             </Link>
           </div>
         );
       }

       function renderUser(){
         return (
          <div className="text-4xl font-bold tracking-wide">
            {user.username || user.first_name}
          </div>
         )
       }
}

UserInfoCard.defaultProps = {
  user: {
    username: ''
  }
};



