import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import HomeLatest from '../components/HomeLatest'
function LoggedInHome(props) {
  let { user } = useContext(UserContext)
       return (
         <div className="w-full h-full mx-4">
           {/* <Link className="h-full w-full" to="/card-sets/new">CREATE SET</Link> */}
           <HomeLatest pageType="HOME" user={user}/>
         </div>
       );
}

export default LoggedInHome