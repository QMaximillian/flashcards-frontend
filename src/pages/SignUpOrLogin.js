import React, { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function SignUpOrLogin(props){

  const [authEnum, setAuthEnum] = useState('LOGIN')

   const [email, setEmail] = useState({ name: "", value: "" });
   const [password, setPassword] = useState({ name: "", value: "" });
   const [firstName, setFirstName] = useState({ name: "", value: "" });
   const [lastName, setLastName] = useState({ name: "", value: "" });

    function renderView() {
      if (authEnum === 'LOGIN') {
        return <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
      } else if (authEnum === 'SIGN UP') { 
        return (
          <SignUp
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
          />
        );
      }
    }

    function handleSignUpFetch(){
      return fetch("http://localhost:8000/sign-up", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({first_name: firstName, last_name: lastName, email, password})
      })
    }

    function handleLoginFetch(){
      return fetch("http://localhost:8000/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
    }

    function handleSubmit(){
      switch(authEnum){
        case 'LOGIN':
          handleLoginFetch()
          break;
        case 'SIGN UP':
          handleSignUpFetch()
          break;
        default:
          return
      }
    }

       return (
         <div className="flex justify-center w-full h-full items-center">
           <div className="px-8 py-4 w-full max-w-md self-center flex-col justify-between border border-black rounded shadow-md">
             <form action="" className="bg-white">
               <div
                 style={{ height: "24rem" }}
                 className="flex flex-col justify-center"
               >
                 {renderView()}
               </div>
               <div onClick={handleSubmit} className="flex justify-center">
                 <button
                   className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                 >
                   Submit
                 </button>
               </div>
             </form>
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

