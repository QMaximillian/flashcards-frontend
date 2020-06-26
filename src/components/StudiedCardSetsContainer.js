import React, { useState, useEffect } from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import { fetchGetStudiedCardSets } from '../fetchRequests/cardSets'
import { addTimeIntervals } from '../lib/helpers'

export default function StudiedCardSetsContainer({ username, isUser }) {
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let isSubscribed = true
    fetchGetStudiedCardSets(username)
      .then(r => {
        if (isSubscribed) {
          setLoading(false)
          setCardSets(r)
        }
      })
      .catch(err => { })

    return () => (isSubscribed = false)
  }, [username])

  function renderCardSets() {
    if (!loading && cardSets.length === 0) {
      return (
        <div className="h-64 w-full px-4">
          <NoItemsCard
            title={`${
              isUser ? `You haven't` : `This user hasn't`
              } studied any sets`}
            subtitle={isUser ? 'Use the search bar to check some out' : null}
          />
        </div>
      )
    }
    console.log('fetchGetStudiedCardSets', cardSets)
    return addTimeIntervals(cardSets, UserCardSetCard, 'last_studied_at', {
      studied: true,
    })
  }
  return <div>{renderCardSets()}</div>
}
