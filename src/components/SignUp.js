import React, { useState } from 'react'
import TextBox from './TextBox'
import { Redirect } from "react-router-dom";


export default function SignUp(props) {
   const [email, setEmail] = useState({ name: "", value: "" });
   const [password, setPassword] = useState({ name: "", value: "" });
   const [firstName, setFirstName] = useState({ name: "", value: "" });
   const [lastName, setLastName] = useState({ name: "", value: "" });
   const [redirect, setRedirect] = useState(false);


   function handleSubmit(e){
    handleSignUpFetch(e) 
    setRedirect(true)
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
            setRedirect(true);
        })
    }

  return (
    <div>
      <div className="flex justify-center w-full h-full items-center">
        <div className="w-full max-w-md self-center">
          <div className="px-4 pb-4">
            <label htmlFor="firstName" className="text-sm block font-bold pb-2">
              FIRST NAME
            </label>
            <TextBox
              placeholder={"Enter your first name"}
              name="firstName"
              value={firstName.value}
              onChange={setFirstName}
              type="text"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="lastName" className="text-sm block font-bold  pb-2">
              LAST NAME
            </label>
            <TextBox
              placeholder={"Enter your last name"}
              name="lastName"
              value={lastName.value}
              onChange={setLastName}
              type="text"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold  pb-2">
              EMAIL ADDRESS
            </label>
            <TextBox
              placeholder={"Email"}
              name="email"
              value={email.value}
              onChange={setEmail}
              type="email"
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="password" className="text-sm block font-bold pb-2">
              PASSWORD
            </label>
            <TextBox
              placeholder={"Password"}
              name="password"
              value={password.value}
              onChange={setPassword}
              type="text"
            />
          </div>
           <div onClick={handleSubmit} className="flex justify-center">
                  <button
                   className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                   type="button"
                 >
                   Submit
                 </button>
          </div>
          {redirect && <Redirect to="home"/>}
          </div>
      </div>
    </div>
  );
}

