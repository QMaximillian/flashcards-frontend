import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import {fetchPostCardSetSearch} from '../fetchRequests/cardSets'

export default function CardSetSearchResults() {
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)

  let {search} = useParams()

  useEffect(() => {
    fetchPostCardSetSearch({search}).then(r => {
      setCardSets(r)
      setLoading(false)
    })
  }, [search])

  if (loading) return <div>Loading...</div>
  if (cardSets.length === 0) {
    return (
      <div className="col-start-3 col-end-11 row-start-4 row-end-7">
        <NoMatch />
      </div>
    )
  }
  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-13 w-full p-6">
      {cardSets.map((cardSet, idx) => {
        return (
          <div key={idx}>
            <UserCardSetCard cardSet={cardSet} searchCard={true} />
          </div>
        )
      })}
    </div>
  )
}
