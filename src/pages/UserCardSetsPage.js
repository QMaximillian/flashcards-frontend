import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import UserInfoCard from '../components/UserInfoCard'
import UserCardSets from '../components/UserCardSets'
import HomeLatest from '../components/HomeLatest'
import StudiedCardSetsContainer from '../components/StudiedCardSetsContainer'
import TextBox from '../components/TextBox'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from 'react-router-dom'
import NoMatch from '../components/NoMatch'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import Loading from '../components/Loading'

export default function UserCardSetsPage() {
  const {authState} = useContext(AuthContext)
  const {mainAxios} = useContext(FetchContext)

  const [filter, setFilter] = useState('Latest')
  const [search, setSearch] = useState({name: '', value: '', isValid: true})
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)
  const [isUser, setIsUser] = useState(false)

  const recentMatch = useRouteMatch('/:user/recent')
  const createdMatch = useRouteMatch('/:user/')
  const studiedMatch = useRouteMatch('/:user/studied')
  const {user: userParam} = useParams()

  useEffect(() => {
    let isMounted = true
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    mainAxios({
      url: `/user/${userParam}`,
      method: 'GET',
      cancelToken: source.token,
    })
      .then(userParamProfile => {
        if (isMounted) {
          if (userParamProfile.data.user?.id === authState.userInfo.id) {
            setIsUser(true)
          }
          setProfile(userParamProfile.data.user)
        }
      })
      .catch(thrown => {
        if (isMounted) {
          if (axios.isCancel(thrown)) {
            setError(thrown.message)
          } else {
            setError(thrown)
          }
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      source.cancel()
      isMounted = false
    }
  }, [userParam, authState, mainAxios])

  function renderSelect() {
    if (recentMatch || studiedMatch) return

    return (
      <>
        <div className="self-center text-xs">SORT</div>
        <select
          className="ml-4 h-12 w-32 border-gray-500 border rounded-none text-teal-500"
          onChange={event => setFilter(event.target.value)}
          value={filter}
        >
          <option className="h-12 w-32" value="Latest">
            Latest
          </option>
          <option className="h-12 w-32" value="Alphabetical">
            Alphabetical
          </option>
        </select>
      </>
    )
  }

  function renderSearch() {
    if (!studiedMatch) {
      return (
        <div className="w-full">
          <TextBox
            className={`outline-none bg-gray-200 mb-1 text-black h-full p-2 w-full placeholder placeholder-gray-400 border-b-2 border-black border-solid`}
            name="search-bar"
            onChange={setSearch}
            placeholder={renderPlaceholder()}
            type="text"
            value={search.value}
          />
        </div>
      )
    }
  }

  function renderPlaceholder() {
    if (recentMatch) {
      return 'Search your sets by title'
    } else if (createdMatch) {
      return 'Type to filter'
    }
  }

  if (error) {
    return (
      <div className="col-start-5 col-end-12 row-start-7 row-end-10">
        <NoMatch />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full h-full col-start-4 col-end-13 row-start-1 row-end-13">
        <Loading />
      </div>
    )
  }

  if (!isUser && recentMatch) {
    return <Redirect to={`/${userParam}`} />
  }

  return (
    <div
      className="col-start-4 col-end-13 row-start-1 row-end-13 overflow-y-auto"
      style={{height: '92vh'}}
    >
      <Route
        path={`/:user`}
        render={() => (
          <UserInfoCard
            isUser={isUser}
            profile={profile}
            setProfile={setProfile}
          />
        )}
      />
      <div className="h-full w-full min-h-0">
        <div className="flex w-full justify-between p-4">
          <div className="w-full flex text-sm justify-start ml-2">
            {renderSelect()}
          </div>
          {renderSearch()}
        </div>
        <div>
          {isUser ? (
            <Switch>
              <Route
                path="/:user/recent"
                render={() => (
                  <HomeLatest limit={10} pageType="RECENT" search={search} />
                )}
              />
              <Route
                path="/:user/studied"
                render={() => (
                  <StudiedCardSetsContainer
                    isUser={isUser}
                    username={profile?.username}
                  />
                )}
              />
              <Route
                path={`/:user`}
                render={() => (
                  <UserCardSets
                    filter={filter}
                    isUser={isUser}
                    search={search}
                    username={profile?.username}
                  />
                )}
              />
            </Switch>
          ) : (
            <Switch>
              <Route
                path="/:user/studied"
                render={() => (
                  <StudiedCardSetsContainer
                    username={userParam}
                    isUser={isUser}
                  />
                )}
              />
              <Route
                path={`/:user`}
                render={() => {
                  return (
                    <UserCardSets
                      filter={filter}
                      id={profile?.id}
                      search={search}
                      username={userParam}
                    />
                  )
                }}
              />
            </Switch>
          )}
        </div>
      </div>
    </div>
  )
}
