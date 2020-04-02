import React, {useContext} from 'react'
import {UserContext} from '../context/user-context'
import HomeLatest from '../components/HomeLatest'

export function LoggedInHome(props) {
  let {user} = useContext(UserContext)

  return (
    <div className="col-start-4 col-end-13 row-start-1 row-end-13 w-full h-full px-4">
      {/* <Link className="h-full w-full" to="/card-sets/new">CREATE SET</Link> */}
      <HomeLatest pageType="HOME" user={user} />
    </div>
  )
}

export default LoggedInHome
