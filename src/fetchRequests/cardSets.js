import {BASE_URL, BASE_HEADERS} from './baseFetchOptions'

export function fetchPostCardSet(body) {
  return fetch(`${BASE_URL}/card-sets`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(r => r.json())
}

export function fetchPostCardSetSearch(body) {
  return fetch(`${BASE_URL}/search/`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  }).then(r => r.json())
}

export function fetchGetUserCardSetsIndex(username) {
  return fetch(`${BASE_URL}/users-card-sets/${username}`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchStudiedCardSets() {
  return fetch(`${BASE_URL}/studied`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchGetCardSetShow(id) {
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchDeleteCardSets(id) {
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: 'DELETE',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchGetEditCardSets(id) {
  return fetch(`${BASE_URL}/card-sets/${id}`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}

export function fetchGetRecentCardSets(limit = 6, id) {
  return fetch(`${BASE_URL}/recent-card-sets`, {
    method: 'POST',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify({limit, id}),
  }).then(r => r.json())
}

export function fetchPatchCardSetFlashcardCount(body) {
  return fetch(`${BASE_URL}/update-flashcard-count`, {
    method: 'PATCH',
    headers: BASE_HEADERS,
    credentials: 'include',
    body: JSON.stringify(body),
  })
  // .then(r => r.json())
}

export function fetchGetStudiedCardSets(username) {
  return fetch(`${BASE_URL}/studied/${username}`, {
    method: 'GET',
    headers: BASE_HEADERS,
    credentials: 'include',
  }).then(r => r.json())
}
