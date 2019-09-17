import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUser } from '../fetchRequests/user'
export default function Landing(props){

    const [response, setResponse] = useState({});
    
    useEffect(() => {
         if (document.cookie) {
            fetchUser().then(r => setResponse(r));
         }
    }, [])

console.log(response);

       return (
        <div>
            Landing
        </div>
       )
}


// function handleFetch() {
//     return fetch("http://localhost:8000/", {
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