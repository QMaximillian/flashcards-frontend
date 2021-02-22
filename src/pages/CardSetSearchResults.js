import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import {FetchContext} from '../context/FetchContext'
import {AuthContext} from '../context/AuthContext'
import {format} from 'date-fns'
import {uuidCheck} from '../lib/helpers'
import SearchCard from '../components/SearchCard'
import {Link} from 'react-router-dom'

function CardSetSearchResults() {
  const {mainAxios} = useContext(FetchContext)
  const {authState} = useContext(AuthContext)
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

  async function handleCreateUserCardSet(cardSet) {
    try {
      if (uuidCheck.test(authState.userInfo.id)) {
        let options = {
          card_set_id: cardSet.card_set_id,
          creator_id: cardSet.user_id,
          last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
        }

        function postUsersCardSet() {
          return mainAxios.post('/users-card-set/new', options)
        }

        await postUsersCardSet()
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className="h-full w-full overflow-scroll col-start-1 col-end-13 row-start-1 row-end-13 p-6">
      {cardSets.map((cardSet, index) => {
        return (
          <Link
            key={index}
            className="my-3 mx-4"
            to={`/card-sets/${cardSet.card_set_id}`}
            onClick={() => handleCreateUserCardSet(cardSet)}
          >
            <UserCardSetCard cardSet={cardSet} />
            <div className="h-24 border-t border-gray-300">
              <SearchCard cardSet={cardSet} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default CardSetSearchResults
