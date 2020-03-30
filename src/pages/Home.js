import React, {useContext} from 'react'
import HomeLatest from '../components/HomeLatest'
import UserContext from '../context/UserContext'
import LoggedInHome from './LoggedInHome'
import LoggedOutHome from './LoggedOutHome'

export default function Home(props) {
  let user = useContext(UserContext)
  return (
    <div className="w-full h-full mx-4">
      {/* <Link className="h-full w-full" to="/card-sets/new">CREATE SET</Link> */}
      <HomeLatest pageType="HOME" user={user} />
    </div>
  )
}
