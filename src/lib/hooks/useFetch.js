import React, { useState, useEffect } from 'react'
import { BASE_HEADERS, BASE_URL } from '../../fetchRequests/baseFetchOptions'

export default function useFetch(url, options = BASE_HEADERS, type = "GET"){
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/${url}`, {
      method: type,
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
  }, [])


  return { data, loading, error }
}