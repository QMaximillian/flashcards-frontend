import React, {useEffect, useContext} from 'react'
import {Link, useParams, useRouteMatch} from 'react-router-dom'
import placeholderPhoto from '../photos/placeholder-photo.png'
import {FetchContext} from '../context/FetchContext'
import PropTypes from 'prop-types'

function UserInfoCard({isUser, profile, setProfile}) {
  const {mainAxios} = useContext(FetchContext)
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
              alt="A user's profile"
              className="w-32 h-32 object-fill rounded-full mr-4 bg-gray-500"
              src={profile.profile_pic || placeholderPhoto}
              style={{minWidth: '8rem', minHeight: '8rem'}}
            />
          </div>
          <div className="flex flex-col justify-around">
            <div className="flex ml-4">
              {renderUser()}
              <div className="self-center ml-8 text-gray-500 font-light tracking-wide">
                {`${profile.first_name} ${profile.last_name}`}
              </div>
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
        {isUser && (
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

UserInfoCard.propTypes = {
  isUser: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    profile_pic: PropTypes.oneOf([
      PropTypes.string,
      PropTypes.instanceOf(null),
    ]),
    updated_at: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  setProfile: PropTypes.func.isRequired,
}

export default UserInfoCard
