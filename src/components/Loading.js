import React from 'react'
import useDelayedRender from '../lib/hooks/useDelayedRender'

function Loading() {
  const loadStateDelayedRender = useDelayedRender(2500)

  return loadStateDelayedRender(() => (
    <span className="text-teal-500 my-0 mx-auto relative w-full h-full flex flex-col justify-center items-center animate-pulse">
      <div className="h-auto justify-evenly mb-2">
        <span className="text-center text-3xl">Loading</span>
      </div>
      <i className="fas fa-circle-notch fa-spin fa-5x"></i>
    </span>
  ))
}

export default Loading
