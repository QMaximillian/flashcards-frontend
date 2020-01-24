import React, { useContext } from 'react'
import HomeLatest from '../components/HomeLatest'
import UserContext from '../context/UserContext'
// import React, { useEffect, useState } from 'react'
// import {fetchUser} from '../fetchRequests/user'


export default function Home(props){
  // const [response, setResponse] = useState();

  // useEffect(() => {
      
  // })

let user = useContext(UserContext)
       return (
         <div className="w-full h-full mx-4">
           {/* <Link className="h-full w-full" to="/card-sets/new">CREATE SET</Link> */}
           <HomeLatest pageType="HOME" user={user}/>
         </div>
       );
}


// function handleFetch() {
//     return fetch("http://localhost:8000/home", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       credentials: "include"
//     })
    //   .then(r => r.json())
    //   .then(r => console.log(r))
// }