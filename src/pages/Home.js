import React from 'react'
// import React, { useEffect, useState } from 'react'
// import {fetchUser} from '../fetchRequests/user'
import {Link} from 'react-router-dom'


export default function Home(props){
  // const [response, setResponse] = useState();

  // useEffect(() => {
      
  // })

  // console.log(response);
       return (
         <>
           <Link to="/card-sets/new">CREATE SET</Link>
         </>
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