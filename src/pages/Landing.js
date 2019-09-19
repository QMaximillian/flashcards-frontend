import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { fetchUser } from '../fetchRequests/user'
import { useCookies } from 'react-cookie'

export default function Landing(props){
    
    // const [cookies] = useCookies(["token"]);

    // const [response, setResponse] = useState();
    
    // useEffect(() => {
    //      if (cookies.token) {
    //         fetchUser().then(r => setResponse(r));
    //      } else {
    //          setResponse('')
    //      }
    // }, [cookies.token])
    // <Navigation user={response}/>

// console.log(response);

       return (
        <div className="h-full w-full">
              
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