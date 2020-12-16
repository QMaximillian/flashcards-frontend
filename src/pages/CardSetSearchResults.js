import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import {FetchContext} from '../context/FetchContext'

export default function CardSetSearchResults(props) {
  const {mainAxios} = useContext(FetchContext)
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)

  let {search} = useParams()

  useEffect(() => {
    mainAxios.post('/search', {data: {search}}).then(res => {
      setCardSets(res.data)
      setLoading(false)
    })
  }, [search, mainAxios])

  if (loading) return <div>Loading...</div>
  if (cardSets.length === 0) {
    return (
      <div className="col-start-3 col-end-11 row-start-4 row-end-7">
        <NoMatch />
      </div>
    )
  }
  return (
    <div className="h-full w-full overflow-scroll col-start-1 col-end-13 row-start-1 row-end-13 p-6">
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
