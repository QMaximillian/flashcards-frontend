import React, { useContext } from 'react'
import UserContext from "../context/UserContext";
import { Link, useParams } from 'react-router-dom'
// import PropTypes from "prop-types";

export default function UserInfoCard(props){
  const { user: userParam } = useParams()
    const user = useContext(UserContext);

       return (
           <div className="flex">
             {renderUser()}
           </div>
       )

       function renderUser(){

    if (user) {
        return (
          <div className="flex p-6">
            <div>
              <img className="w-32 h-32 rounded-full mr-4 bg-gray-500" alt="" />
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex ml-4">
                <div className="text-4xl font-bold tracking-wide">
                  {user.username}
                </div>
                <div className="self-center ml-8 text-gray-500 font-light tracking-wide">{`${user.first_name} ${user.last_name}`}</div>
              </div>
              <div className="flex ml-4">
                <Link to={`/${userParam}/recent`}>
                  <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">
                    Recent
                  </div>
                </Link>
                <Link to={`/${userParam}`}>
                  <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">
                    Created
                  </div>
                </Link>
                <Link to={`/${userParam}/studied`}>
                  <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">
                    Studied
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
    } else {
        return <div>Loading...</div>
    }
}
}

UserInfoCard.defaultProps = {
  user: {
    username: ''
  }
};



