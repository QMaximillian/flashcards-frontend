import React, {useState, useEffect, useContext} from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import {addTimeIntervals} from '../lib/helpers'
import {FetchContext} from '../context/FetchContext'

export default function StudiedCardSetsContainer({username, isUser}) {
  const {mainAxios} = useContext(FetchContext)
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let isSubscribed = true
    mainAxios(`/studied/${username}`)
      .then(res => {
        if (isSubscribed) {
          setLoading(false)
          setCardSets(res.data.cardSets)
        }
      })
      .catch(error => console.log(error))

    return () => (isSubscribed = false)
  }, [username, mainAxios])

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

    return addTimeIntervals(cardSets, UserCardSetCard, 'last_studied_at', {
      studied: true,
    })
  }
  return <div>{renderCardSets()}</div>
}
