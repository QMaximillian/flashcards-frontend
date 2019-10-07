import { BASE_URL, BASE_HEADERS } from './baseFetchOptions' 

export function fetchUser(){
      return fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: BASE_HEADERS,
        credentials: "include"
      }).then(r => r.json());
}

export function fetchRemoveCookie(){
      return fetch(`${BASE_URL}/delete-cookie`, {
        method: "POST",
        headers: BASE_HEADERS,
        credentials: "include"
      }).then(r => r.json());
}




