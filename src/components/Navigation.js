import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchRemoveCookie, fetchUser } from "../fetchRequests/user";






export default function Navigation(props){

    const [ user, setUser ] = React.useState(props.user)

    function renderUser(){

        if (props.user) {
          console.log('user')
            return (
              <>
                <div className="w-full h-full">
                  <div>{props.user.first_name}</div>
                </div>
                <div onClick={() => fetchRemoveCookie(r => {
                  if (r.cookieDeleted) {
                    setUser(null)
                  }
                })}>LOGOUT</div>
              </>
            );
        } else {

            return (
              <>
                <div className="w-1/4 h-full"></div>
                <div className="w-1/5 h-full">
                  <div className="whitespace-no-wrap">SIGN UP</div>
                  <Link
                    className="flex justify-between w-full h-full"
                    to="/login"
                  >
                    <div>LOGIN</div>
                  </Link>
                </div>
              </>
            );  
        }
    }
       return (
           <div className="w-full h-12 flex justify-between bg-teal-500 shadow">
             {renderUser()}
           </div>
       )
}

