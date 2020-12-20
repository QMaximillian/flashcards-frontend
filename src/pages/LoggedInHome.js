import React from 'react'
import HomeLatest from '../components/HomeLatest'

export function LoggedInHome() {
  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-13 w-full h-full px-4">
      <HomeLatest pageType="HOME" />
    </div>
  )
}

export default LoggedInHome
