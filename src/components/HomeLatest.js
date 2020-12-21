import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import HomeLatestCard from './HomeLatestCard'
import UserCardSetCard from './UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import TitledDateIntervalList from './TitledDateIntervalList'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import Loading from './Loading'
import PropTypes from 'prop-types'

function HomeLatest({pageType, search}) {
  const {authState} = useContext(AuthContext)
  const {mainAxios} = useContext(FetchContext)

  const [recentCardSets, setRecentCardSets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    mainAxios({
      url: '/recent-card-sets',
      method: 'POST',
      data: {
        id: authState?.userInfo?.id,
        limit: pageType === 'RECENT' ? 10 : 6,
      },
      cancelToken: source.token,
    })
      .then(res => {
        setRecentCardSets(res.data.recentCardSets)
      })
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
        } else {
          console.log(thrown)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [authState, mainAxios, pageType])

  function renderRecentCardSets() {
    if (recentCardSets.length === 0) {
      return (
        <div className="h-64 w-full">
          <NoItemsCard
            subtitle={
              <Link to="card-sets/new">
                Click <strong className="hover:text-teal-800">here</strong> to
                create one!
              </Link>
            }
            title={'No recent card sets'}
          />
        </div>
      )
    }

    return recentCardSets.map(cardSet => {
      return (
        <Link
          className="w-1/2 h-40 p-2"
          key={cardSet.id}
          to={`/card-sets/${cardSet.id}`}
        >
          <HomeLatestCard cardSet={cardSet} key={cardSet.id} pageType="HOME" />
        </Link>
      )
    })
  }

  if (isLoading) return <Loading />
  if (pageType === 'HOME' || !pageType) {
    return (
      <section>
        <div className="flex py-6 px-2 w-full justify-between">
          <h1 className="mb-4 text-2xl self-center">Recent</h1>
          <Link className="flex" to={`/${authState.userInfo.username}`}>
            <div className="mb-4 flex hover:text-yellow-500 text-teal-500">
              <div className="text-2xl self-center">View all</div>
              <i className="ml-2 fas fa-chevron-right self-center text-sm"></i>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap">
          {recentCardSets.length === 0 ? (
            <div className="h-64 w-full px-4">
              <NoItemsCard
                subtitle={'Use the search bar to check some out'}
                title={'No recently looked at sets!'}
              />
            </div>
          ) : (
            renderRecentCardSets()
          )}
        </div>
      </section>
    )
  } else if (pageType === 'RECENT') {
    if (recentCardSets.length === 0) {
      return (
        <div className="h-64 w-full px-4">
          <NoItemsCard
            subtitle={'Use the search bar to check some out'}
            title={'No recently looked at sets!'}
          />
        </div>
      )
    }
    const filteredCardSets = recentCardSets.filter(cardSet =>
      cardSet.name.toLowerCase().match(search.value.toLowerCase()),
    )
    return (
      <section className="w-full justify-center flex flex-col">
        {filteredCardSets.length === 0 ? (
          <NoItemsCard
            subtitle={'Use the search bar to check some out'}
            title={'No recently looked at sets!'}
          />
        ) : (
          <TitledDateIntervalList
            render={props => <UserCardSetCard {...props} />}
            data={filteredCardSets}
            dateKey={'last_seen_at'}
          />
        )}
      </section>
    )
  }
}

HomeLatest.propTypes = {
  pageType: PropTypes.oneOf(['HOME', 'RECENT']),
  limit: PropTypes.number,
}

export default HomeLatest
