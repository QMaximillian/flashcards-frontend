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
           <div className="w-full max-w-md self-center flex-col justify-between border border-black rounded shadow-md">
             <form action="" className="bg-white px-8">
               <div
                 style={{ height: "24rem" }}
                 className="flex flex-col justify-center"
               >
                 {renderView()}
               </div>
             </form>
             <div className="flex justify-center">
               <button
                 className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
               >
                 Submit
               </button>
             </div>
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
           </div>
         </div>
       );
}

