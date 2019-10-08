import { BASE_URL, BASE_HEADERS } from "./baseFetchOptions"; 

export function fetchPostCardSet(body) {
  return fetch(`${BASE_URL}/card-sets`, {
    method: "POST",
    headers: BASE_HEADERS,
    credentials: "include",
    body: JSON.stringify(body)
  }).then(r => r.json());
}

export function fetchGetCardSetIndex() {
  return fetch(`${BASE_URL}/card-sets`, {
    method: "GET",
    headers: BASE_HEADERS,
    credentials: 'include'
  }).then(r => r.json());
}

export function fetchGetCardSetShow(id) {
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: "GET",
    headers: BASE_HEADERS,
    credentials: "include"
  }).then(r => r.json())
}

export function fetchDeleteCardSets(id){
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: "DELETE",
    headers: BASE_HEADERS,
    credentials: "include"
  }).then(r => r.json());
}

export function fetchGetEditCardSets(id){
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: "GET",
    headers: BASE_HEADERS,
    credentials: "include"
  }).then(r => r.json());
}