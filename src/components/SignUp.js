import React, { useState, useContext } from 'react'
import TextBox from './TextBox'
import { Redirect } from "react-router-dom";
import { UserContext } from '../context/user-context';


export default function SignUp(props) {
   const [email, setEmail] = useState({ name: "", value: "" });
   const [password, setPassword] = useState({ name: "", value: "" });
   const [firstName, setFirstName] = useState({ name: "", value: "" });
   const [lastName, setLastName] = useState({ name: "", value: "" });
   const [username, setUsername] = useState({ name: "", value: "" });
   const [redirect, setRedirect] = useState(false);
   const [error, setError] = useState(null);
   let { user, setUser } = useContext(UserContext)



   function handleSubmit(e){
    handleSignUpFetch(e) 
    // setRedirect(true)
   }

       function handleSignUpFetch(e){

      e.preventDefault()
      return fetch("http://localhost:8000/auth/register", {
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
          password: password.value,
          username: username.value
        })
      }).then(r => r.json())
      .then(r =>  {
        console.log('r', r)
        if (r.code) {
          setError(`${r.code} - ${r.status}`)
        } else {
        // setUser(r.user)
          setRedirect(true)
        }
      })
      .catch(err => console.log(err))
    }

  if (redirect) return <Redirect to={`/login`}/>

  return (
    <div className="h-full pt-16">
      {error}
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
              required
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
              required
            />
          </div>
          <div className="px-4 pb-4">
            <label htmlFor="username" className="text-sm block font-bold pb-2">
              USERNAME
            </label>
            <TextBox
              placeholder={"Enter your username"}
              name="username"
              value={username.value}
              onChange={setUsername}
              type="text"
              required
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
              required
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
              type="password"
              required
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
          </div>
      </div>
    </div>
  );
}

