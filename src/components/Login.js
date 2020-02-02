import React, { useState } from 'react'
import TextBox from '../components/TextBox'
import { useHistory } from "react-router-dom";



export default function Login(props){
    const [email, setEmail] = useState({ name: "", value: "" });
    const [password, setPassword] = useState({ name: "", value: "" });
    const [username, setUsername] = useState(false)
    const [changeType, setChangeType] = useState("password")
    let history = useHistory()

    React.useEffect(() => {
      if (username){
        history.push('/')
      window.location.reload()
      }
    }, [username, history])

    function handleSubmit(e){
      handleLoginFetch(e)
    }

    function handleLoginFetch(e){

      e.preventDefault()
      return fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email.value, password: password.value })
      })
      .then(r => r.json())
      .then(r => {
        setUsername(r.username)
      });
    }


       return (
         <div className="flex justify-center w-full h-full items-center">
           <div className="w-full max-w-md self-center">
             <div className="px-4 pb-4">
               <label htmlFor="email" className="text-sm block font-bold  pb-2">
                 EMAIL ADDRESS
               </label>
               <div className="h-8">
                 <TextBox
                   placeholder={"Email"}
                   name="email"
                   value={email.value}
                   onChange={setEmail}
                   type="email"
                 />
               </div>
             </div>
             <div className="px-4 pb-4">
               <label
                 htmlFor="password"
                 className="text-sm block font-bold pb-2"
               >
                 PASSWORD
               </label>
               <TextBox
                 placeholder={"Password"}
                 name="password"
                 value={password.value}
                 onChange={setPassword}
                 type={changeType}
               />
               <i class="fas fa-eye" className="text-black w-24 h-24 border border-black" onClick={() => setChangeType(changeType => changeType === 'password' ? "text" : "password")}></i>
             </div>
             <div className="flex justify-center">
               <button
                 onClick={handleSubmit}
                 className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
               >
                 Submit
               </button>
               <button
                 className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
               >
                 <a href="http://localhost:8000/auth/google">
                   LOGIN WITH GOOGLE
                 </a>
               </button>
             </div>
           </div>
         </div>
       );
}

