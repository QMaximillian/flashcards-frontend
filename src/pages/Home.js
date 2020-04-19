import React, {useContext} from 'react'
import HomeLatest from '../components/HomeLatest'
import UserContext from '../context/UserContext'

export default function Home(props) {
  let user = useContext(UserContext)
  return (
    <div className="w-full h-full mx-4">
      <HomeLatest pageType="HOME" user={user} />
    </div>
  )
}
