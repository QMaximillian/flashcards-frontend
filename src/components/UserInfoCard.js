import React, { useContext } from 'react'
import UserContext from "../context/UserContext";
// import PropTypes from "prop-types";

export default function UserInfoCard(props){
    const user = useContext(UserContext);
    console.log(user)
       return (
           <div className="flex">
             {renderUser()}
           </div>
       )

       function renderUser(){

    if (user) {
        return (
          <div className="flex">
            <div>
              <img className="w-32 h-32 rounded-full mr-4 bg-gray-500" alt="" />
            </div>
            <div className="flex flex-col justify-around">
              <div className="flex">
                <div className="text-3xl font-bold tracking-wide">
                  {props.user.username}
                </div>
                <div className="self-center ml-8">{`${user.first_name} ${user.last_name}`}</div>
              </div>
              <div className="flex">
                <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">Recent</div>
                <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">Created</div>
                <div className="border border-gray-500 py-2 px-4 text-teal-300 hover:text-yellow-500">Studied</div>
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
    username: 'QuinnMax'
  }
};



