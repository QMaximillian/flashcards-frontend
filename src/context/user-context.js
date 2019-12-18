import React, { useState, useEffect } from "react";
import { fetchUser } from "../fetchRequests/user";
import UserContext from "./UserContext";

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser()
      .then(r => {
        // console.log("r", r);
        if (r === undefined || null) return;
        setUser(Object.keys(r).length === 0 ? false : r);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserProvider;
