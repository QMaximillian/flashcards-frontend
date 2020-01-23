import React, { useState, useEffect } from "react";
import { fetchUser } from "../fetchRequests/user";



export const UserContext = React.createContext({});


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser()
      .then(res => {
        setUser(res.user)
      })
      .catch(err => console.log(err));
  }, []);

  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

