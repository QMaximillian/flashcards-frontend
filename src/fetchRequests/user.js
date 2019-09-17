export function fetchUser(){
      return fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include"
      }).then(r => r.json());
}