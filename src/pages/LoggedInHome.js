import React from 'react'
import HomeLatest from '../components/HomeLatest'

export function LoggedInHome(props) {
  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-13 w-full h-full px-4">
      <HomeLatest pageType="HOME" />
    </div>
  )
}

LoggedInHome.displayName = 'LoggedInHome'

export default LoggedInHome
