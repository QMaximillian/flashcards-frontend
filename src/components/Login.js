import React from 'react'
import TextBox from '../components/TextBox'

export default function Login(props){
    const {
      email,
      password,
      setEmail,
      setPassword,
    } = props;
    // const [email, setEmail] = useState({name: '', value: '', isValid: false})
    // const [password, setPassword] = useState({name: '', value: '', isValid: false})
    // const [firstName, setFirstName] = useState({name: '', value: ''})
    // const [lastName, setLastName] = useState({name: '', value: ''})

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
                 type="password"
               />
             </div>
           </div>
         </div>
       );
}

