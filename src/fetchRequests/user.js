import {BASE_URL, BASE_HEADERS} from './baseFetchOptions'

export function fetchUser() {
  return fetch(`${BASE_URL}/user`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchUpdateUsername(body) {
  return fetch(`${BASE_URL}/update-username`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(r => r.json())
}

export function fetchShowUser(username) {
  return fetch(`${BASE_URL}/user/${username}`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchRemoveCookie() {
  return fetch(`${BASE_URL}/delete-cookie`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

// export function fetchLogout(){
//       return fetch(`${BASE_URL}/auth/logout`, {
//         method: "GET",
//         headers: BASE_HEADERS,
//         credentials: "include"
//       }).then(r => r.json());
// }
