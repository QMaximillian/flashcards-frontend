import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'





export default function Navigation(props){

    const { user, removeCookie } = props

    console.log('user', user)
    
    function renderUser(){
        if (user) {
          console.log('user')
            return (
              <>
                <div className="w-full h-full">
                  <div>{user.first_name}</div>
                </div>
                <div onClick={() => removeCookie("token")}>LOGOUT</div>
              </>
            );
        } else {
                    console.log("no user");

            return (
              <>
                <div className="w-1/4 h-full"></div>
                <div className="w-1/5 h-full">
                  <Link
                    className="flex justify-between w-full h-full"
                    to="/sign-up-or-login"
                  >
                    <div className="whitespace-no-wrap">SIGN UP</div>
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

