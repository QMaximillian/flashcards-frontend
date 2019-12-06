import React, { useState, useEffect } from "react";
import { fetchUser } from '../fetchRequests/user'
import UserContext from './UserContext'
// import { useAuth } from "./auth-context";



// function UserProvider(props) {
//   const {
//     data: { user }
//   } = useAuth();
//   return <UserContext.Provider value={user} {...props} />;
// }
function UserProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => { 
  fetchUser()
    .then(r => {
      if (r === undefined || null) return
      setUser(r)
    })
    // .catch(err => console.log(err))
  }, [])

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider
