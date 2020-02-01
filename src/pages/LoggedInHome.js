import React, { useContext } from 'react'
import { UserContext } from '../context/user-context'
import HomeLatest from '../components/HomeLatest'


export function LoggedInHome(props){
  
  let { user } = useContext(UserContext)
console.log('user22', user)
       return (
         <div className="w-full h-full mx-4">
           {/* <Link className="h-full w-full" to="/card-sets/new">CREATE SET</Link> */}
           <HomeLatest pageType="HOME" user={user}/>
         </div>
       );
}

export default LoggedInHome