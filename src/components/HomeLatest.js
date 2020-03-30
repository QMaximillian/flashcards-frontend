import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import HomeLatestCard from './HomeLatestCard'
import {fetchGetRecentCardSets} from '../fetchRequests/cardSets'
import UserCardSetCard from './UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import NoMatch from './NoMatch'
import {addTimeIntervals} from '../lib/helpers'

export default function HomeLatest({limit, pageType, search, user}) {
  const [recentCardSets, setRecentCardSets] = useState([])
  const [, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isSubscribed = true
    fetchGetRecentCardSets(limit)
      .then(r => {
        if (isSubscribed) {
          setRecentCardSets(r)
          setLoading(false)
        }
      })
      .catch(error => {
        return isSubscribed ? setError(error.message) : null
      })

    return () => (isSubscribed = false)
  }, [limit])

  function renderRecentCardSets() {
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

  if (pageType === 'HOME' || !pageType) {
    return (
      <section>
        <div className="flex py-6 px-2 w-full justify-between">
          <h1 className="mb-4 text-2xl self-center">Recent</h1>
          <Link to={`/${user.username}`} className="flex">
            <div className="mb-4 flex hover:text-yellow-500 text-teal-500">
              <div className="text-2xl self-center">View all</div>
              <i className="ml-2 fas fa-chevron-right self-center text-sm"></i>
            </div>
          </Link>
        </div>

        <div className="flex flex-wrap">
          {!loading && recentCardSets.length === 0 ? (
            <div className="h-64 w-full">
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
    if (!loading && recentCardSets.length === 0) {
      return (
        <div className="h-64 w-full">
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
        {!loading && filteredCardSets.length === 0 ? (
          <NoMatch />
        ) : (
          addTimeIntervals(filteredCardSets, UserCardSetCard, 'last_seen_at')
        )}
      </section>
    )
  }
}
