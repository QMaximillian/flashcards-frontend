import React, { useState } from 'react'
import TextBox from '../components/TextBox'

export default function Login(props){
    const [email, setEmail] = useState({name: '', value: ''})
    const [password, setPassword] = useState({name: '', value: ''})
    // const [firstName, setFirstName] = useState({name: '', value: ''})
    // const [lastName, setLastName] = useState({name: '', value: ''})

       return (
         <div className="flex justify-center w-full h-full items-center">
           <div className="w-full max-w-md self-center">
             <div className="px-4 pb-4">
               <label htmlFor="email" className="text-sm block font-bold  pb-2">
                 EMAIL ADDRESS
               </label>
               {/* <input
                   type="email"
                   name="email"
                   id=""
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                   placeholder="Johnbull@example.com"
                 /> */}
               <TextBox
                 placeholder={"Email"}
                 name="email"
                 value={email.value}
                 onChange={setEmail}
               />
             </div>
             <div className="px-4 pb-4">
               <label
                 htmlFor="password"
                 className="text-sm block font-bold pb-2"
               >
                 PASSWORD
               </label>
               {/* <input
                   type="password"
                   name="email"
                   id=""
                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                   placeholder="Enter your password"
                 /> */}
               <TextBox
                 placeholder={"Password"}
                 name="password"
                 value={password.value}
                 onChange={setPassword}
               />
             </div>
             <div className="flex justify-center">
               <button
                 className="hover: font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 type="button"
               >
                 Submit
               </button>
             </div>
           </div>
         </div>
       );
}

