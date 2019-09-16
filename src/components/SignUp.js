import React from 'react'
import TextBox from './TextBox'

export default function SignUp(props) {
    const {email, password, firstName, lastName, setEmail, setPassword, setFirstName, setLastName} = props

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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

