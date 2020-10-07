import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import HomeLatestCard from './HomeLatestCard'
import UserCardSetCard from './UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import {addTimeIntervals} from '../lib/helpers'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'

export default function HomeLatest({pageType, search}) {
  const {authState} = useContext(AuthContext)
  const {mainAxios} = useContext(FetchContext)

  const [recentCardSets, setRecentCardSets] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    mainAxios
      .post('/recent-card-sets', {
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

    setIsLoading(false)
  }, [authState, mainAxios, pageType])

  function renderRecentCardSets() {
    if (recentCardSets.length === 0) {
      return (
        <div className="h-64 w-full">
          <NoItemsCard
            title={'No recent card sets'}
            subtitle={
              <Link to="card-sets/new">
                Click <strong className="hover:text-teal-800">here</strong> to
                create one!
              </Link>
            }
          />
        </div>
      )
    }

    return recentCardSets.map(cardSet => {
      return (
        <Link
          to={`/card-sets/${cardSet.id}`}
          key={cardSet.id}
          className="w-1/2 h-40 p-2"
        >
          <HomeLatestCard key={cardSet.id} cardSet={cardSet} pageType="HOME" />
        </Link>
      )
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (pageType === 'HOME' || !pageType) {
    return (
      <section>
        <div className="flex py-6 px-2 w-full justify-between">
          <h1 className="mb-4 text-2xl self-center">Recent</h1>
          <Link to={`/${authState.userInfo.username}`} className="flex">
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
            title={'No recently looked at sets!'}
            subtitle={'Use the search bar to check some out'}
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
            title={'No recently looked at sets!'}
            subtitle={'Use the search bar to check some out'}
          />
        ) : (
          addTimeIntervals(filteredCardSets, UserCardSetCard, 'last_seen_at')
        )}
      </section>
    )
  }
}
