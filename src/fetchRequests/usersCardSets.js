import { BASE_URL, BASE_HEADERS } from "./baseFetchOptions"; 

export function fetchPostLastSeen(body) {
  return fetch(`${BASE_URL}/users-card-set-last-seen`, {
    method: "POST",
    headers: BASE_HEADERS,
    credentials: "include",
    body: JSON.stringify(body)
  });
}

export function fetchPostUsersCardSet(body) {
  return fetch(`${BASE_URL}/users-card-set/new`, {
    method: "POST",
    headers: BASE_HEADERS,
    credentials: "include",
    body: JSON.stringify(body)
  });
}
