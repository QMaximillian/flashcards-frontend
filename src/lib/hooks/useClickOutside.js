import {useEffect} from 'react'

export default function useOutsideAlerter(ref, cb) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      // run function when you down click within the current ref
      cb()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })
}
