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

export function fetchRemoveCookie(){
      return fetch("http://localhost:8000/delete-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "include"
      }).then(r => r.json());
}
