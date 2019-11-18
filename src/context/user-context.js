import React from "react";
import UserContext from './UserContext'
// import { useAuth } from "./auth-context";

// const UserContext = React.createContext();

// function UserProvider(props) {
//   const {
//     data: { user }
//   } = useAuth();
//   return <UserContext.Provider value={user} {...props} />;
// }

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

// export { UserProvider, useUser };
