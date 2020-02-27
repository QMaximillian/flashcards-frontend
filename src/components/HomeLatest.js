import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import HomeLatestCard from './HomeLatestCard'
import {fetchGetRecentCardSets} from '../fetchRequests/cardSets'
import UserCardSetCard from './UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import NoMatch from './NoMatch'
import {addTimeIntervals} from '../lib/helpers'
import {UserContext} from '../context/user-context'

export default function HomeLatest({limit, pageType, search}) {
  const [recentCardSets, setRecentCardSets] = useState([])
  const [, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  let {user} = useContext(UserContext)

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

  if (pageType === 'HOME' || !pageType) {
    return (
      <div className="py-10 px-8">
        <div className="flex  mb-4 w-full justify-between">
          <div className="mb-4">RECENT</div>
          <Link to={`/${user.username}`} className="flex">
            <div className="mb-4 flex hover:text-yellow-500 text-teal-500">
              <div className="">View all</div>
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
            recentCardSets.map((cardSet, i) => {
              return (
                <Link
                  to={`/card-sets/${cardSet.id}`}
                  key={i}
                  className="w-1/2 h-40 p-2"
                >
                  <HomeLatestCard key={i} cardSet={cardSet} pageType="HOME" />
                </Link>
              )
            })
          )}
        </div>
      </div>
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

    return !loading && filteredCardSets.length === 0 ? (
      <div className="w-full justify-center flex">
        <NoMatch />
      </div>
    ) : (
      addTimeIntervals(filteredCardSets, UserCardSetCard, 'last_seen_at')
    )
  }
}
