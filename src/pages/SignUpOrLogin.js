import React, { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function SignUpOrLogin(props){

  const [authEnum, setAuthEnum] = useState('LOGIN')

    function renderView() {
      if (authEnum === 'LOGIN') {
        return <Login />
      } else if (authEnum === 'SIGN UP') { 
        return <SignUp />
      }
    }
       return (
         <div className="flex justify-center w-full h-full items-center">
           <div className="w-full max-w-md bg-gray-800 self-center">
             <form
               action=""
               className="bg-white shadow-md rounded px-8 py-8 pt-8"
               style={{ height: "32rem" }}
             >
               <div className="">{renderView()}</div>
               <div className="justify-around flex">
                 <button
                   className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                   onClick={() => setAuthEnum("SIGN UP")}
                 >
                   Sign Up
                 </button>
                 <button
                   className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                   onClick={() => setAuthEnum("LOGIN")}
                 >
                   Login
                 </button>
               </div>
             </form>
           </div>
         </div>
       );
}

