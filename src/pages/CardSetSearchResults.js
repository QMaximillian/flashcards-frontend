import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import {fetchPostCardSetSearch} from '../fetchRequests/cardSets'

export default function CardSetSearchResults(props) {
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
      <div className="w-full justify-center flex items-center h-full">
        <NoMatch />
      </div>
    )
  }
  return (
    <div className="w-full p-6">
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
