import React, { useEffect, useState } from 'react'
import {fetchUser} from '../fetchRequests/user'

export default function Home(props){
  const [response, setResponse] = useState();

  // useEffect(() => {
  //   if (document.cookie) {
  //     fetchUser().then(r => setResponse(r))
  //   }
  // }, [])
  // console.log(response);
       return <div>Home</div>;
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