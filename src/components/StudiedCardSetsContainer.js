import React, {useState, useEffect} from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import {fetchGetStudiedCardSets} from '../fetchRequests/cardSets'
import {addTimeIntervals} from '../lib/helpers'

export default function StudiedCardSetsContainer(props) {
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let isSubscribed = true
    fetchGetStudiedCardSets()
      .then(r => {
        if (isSubscribed) {
          setLoading(false)
          setCardSets(r)
        }
      })
      .catch(r => (isSubscribed ? console.log(r) : null))

    return () => (isSubscribed = false)
  }, [])

  function renderCardSets() {
    // return cardSets.map((cardSet, idx) => {
    //   return (
    //     <div key={idx}>
    //         <UserCardSetCard studied={true} cardSet={cardSet} />
    //     </div>
    //   );
    // })
    if (!loading && cardSets.length === 0) {
      return (
        <div className="h-64 w-full">
          <NoItemsCard
            title={`You haven't studied any sets`}
            subtitle={'Use the search bar to check some out'}
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
