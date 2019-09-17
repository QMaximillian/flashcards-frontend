import React from 'react'

export default function Home(props){

       return <div onClick={handleFetch}>Home</div>;
}


function handleFetch() {
    return fetch("http://localhost:8000/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include"
    })
    //   .then(r => r.json())
    //   .then(r => console.log(r))
}