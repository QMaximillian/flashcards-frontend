import { BASE_URL, BASE_HEADERS } from "./baseFetchOptions"; 

export function fetchPostCardSet(body) {
  return fetch(`${BASE_URL}/card-sets`, {
    method: "POST",
    headers: BASE_HEADERS,
    credentials: "include",
    body: JSON.stringify(body)
  }).then(r => r.json());
}

export function fetchGetCardSetIndex(body) {
  return fetch(`${BASE_URL}/card-sets`, {
    method: "GET",
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body)
  })
  // .then(r => r.json());
}