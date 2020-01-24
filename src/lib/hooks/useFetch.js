import { useState, useEffect } from 'react'
import { BASE_HEADERS, BASE_URL } from '../../fetchRequests/baseFetchOptions'

export default function useFetch(url, options = {}, type = "GET"){
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const abortController = new AbortController()

    fetch(`${BASE_URL}/${url}`, {
      method: type,
      signal: abortController.signal,
      BASE_HEADERS,
      ...options
    })
      .then(res => {
        setData(res.json())
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })

      return function cancel() {
        abortController.abort()
      }
  }, [options, type, url])


  return { data, loading, error }
}