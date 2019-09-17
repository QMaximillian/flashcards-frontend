import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default function SignUpOrLogin(props){


  const [authEnum, setAuthEnum] = useState('LOGIN')

   const [email, setEmail] = useState({ name: "", value: "" });
   const [password, setPassword] = useState({ name: "", value: "" });
   const [firstName, setFirstName] = useState({ name: "", value: "" });
   const [lastName, setLastName] = useState({ name: "", value: "" });
   const [redirect, setRedirect] = useState(false);

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

    function handleRedirect(){
      switch(authEnum){
        case 'LOGIN':
          return <Redirect to="home"/>
        case 'SIGN UP':
          return <Redirect to="home"/>
          default:
            return;
      }
    }

    function handleSignUpFetch(e){

      // e.preventDefault()
      return fetch("http://localhost:8000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },

        credentials: "include",
        body: JSON.stringify({
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value
        })
      }).then(r => {
          if (document.cookie) {
            setRedirect(true);
          }
        })
    }


function handleLoginFetch(e){

      // e.preventDefault()
      return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email: email.value, password: password.value })
      }).then(r => {
        if(document.cookie) {
          setRedirect(true);
        }
      });
    }

    function handleSubmit(e){
      switch(authEnum){
        case 'LOGIN':
          handleLoginFetch(e)
          break;
        case 'SIGN UP':
          handleSignUpFetch(e)
          break;
        default:
          return
      }
    }

       return (
         <div className="flex justify-center w-full h-full items-center">
           <div className="px-8 py-4 w-full max-w-md self-center flex-col justify-between border border-black rounded shadow-md">
             <div className="bg-white">
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
           {redirect && handleRedirect()}
         </div>
       );
}

