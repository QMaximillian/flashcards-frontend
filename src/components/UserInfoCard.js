import React, {useEffect, useContext} from 'react'
import {Link, useParams, useRouteMatch} from 'react-router-dom'
import placeholderPhoto from '../photos/placeholder-photo.png'
import {FetchContext} from '../context/FetchContext'

export default function UserInfoCard(props) {
  const {mainAxios} = useContext(FetchContext)
  const {profile, setProfile} = props
  const {user: userParam} = useParams()

  useEffect(() => {
    let isSubscribed = true
    mainAxios
      .get(`/user/${userParam}`)
      .then(res => {
        if (isSubscribed) {
          setProfile(res.data.user)
        }
      })
      .catch(console.log)

    return () => (isSubscribed = false)
  }, [userParam, setProfile, mainAxios])

  const createdMatch = useRouteMatch('/:user')
  const recentMatch = useRouteMatch('/:user/recent')
  const studiedMatch = useRouteMatch('/:user/studied')

  if (profile) {
    return (
      <div className="flex p-6">
        <div className="flex">
          <div className="h-full">
            <img
              src={profile.profile_pic || placeholderPhoto}
              className="w-32 h-32 object-fill rounded-full mr-4 bg-gray-500"
              alt="A user's profile"
              style={{minWidth: '8rem', minHeight: '8rem'}}
            />
          </div>
          <div className="flex flex-col justify-around">
            <div className="flex ml-4">
              {renderUser()}
              <div className="self-center ml-8 text-gray-500 font-light tracking-wide">{`${profile.first_name} ${profile.last_name}`}</div>
            </div>
            {renderMatch()}
          </div>
        </div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }

  function renderMatch() {
    return (
      <div className="flex ml-4">
        {props.isUser && (
          <Link to={`/${profile.username}/recent`}>
            <div
              className={`${
                recentMatch
                  ? 'bg-yellow-500 text-black'
                  : 'hover:text-yellow-500 text-teal-300'
              } border border-gray-500 py-2 px-4 bg-white`}
            >
              Recent
            </div>
          </Link>
        )}
        <Link to={`/${profile.username}`}>
          <div
            className={`${
              createdMatch && !studiedMatch && !recentMatch
                ? 'bg-yellow-500 text-black'
                : 'hover:text-yellow-500 text-teal-300'
            } border border-gray-500 py-2 px-4 bg-white`}
          >
            Created
          </div>
        </Link>
        <Link to={`/${profile.username}/studied`}>
          <div
            className={`${
              studiedMatch
                ? 'bg-yellow-500 text-black'
                : 'hover:text-yellow-500 text-teal-300'
            } border border-gray-500 py-2 px-4  bg-white`}
          >
            Studied
          </div>
        </Link>
      </div>
    )
  }

  function renderUser() {
    return (
      <div className="text-4xl font-bold tracking-wide">
        {profile.username || profile.first_name}
      </div>
    )
  }
}
