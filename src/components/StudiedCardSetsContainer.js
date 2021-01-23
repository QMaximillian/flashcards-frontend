import React, {useState, useEffect, useContext} from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import StudiedCard from './StudiedCard'
import NoItemsCard from './NoItemsCard'
import TitledDateIntervalList from './TitledDateIntervalList'
import {FetchContext} from '../context/FetchContext'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function StudiedCardSetsContainer({username, isUser}) {
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
            subtitle={isUser ? 'Use the search bar to check some out' : null}
            title={`${
              isUser ? `You haven't` : `This user hasn't`
            } studied any sets`}
          />
        </div>
      )
    }

    return (
      <TitledDateIntervalList
        render={props => (
          <div className="px-4">
            <div className="my-2">
              <Link to={`/card-sets/${props.cardSet.card_set_id}`}>
                <UserCardSetCard studied={true} {...props} />
              </Link>
              <div className="border-t border-gray-300">
                <StudiedCard cardSetId={props.cardSet.card_set_id} />
              </div>
            </div>
          </div>
        )}
        data={cardSets}
        dateKey={'last_studied_at'}
      />
    )
  }

  return <div>{renderCardSets()}</div>
}

StudiedCardSetsContainer.propTypes = {
  username: PropTypes.string.isRequired,
  isUser: PropTypes.bool.isRequired,
}

export default StudiedCardSetsContainer
