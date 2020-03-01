import {BASE_URL, BASE_HEADERS} from './baseFetchOptions'

export function fetchPostFlashCards(body) {
  return fetch(`${BASE_URL}/flashcards`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(r => r.json())
}

export function fetchPatchEditFlashcard(body) {
  return fetch(`${BASE_URL}/flashcards/${body.id}`, {
    method: 'PATCH',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(r => r.json())
}
