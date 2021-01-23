import React, {useContext, useEffect, useState} from 'react'
import NoItemsCard from './NoItemsCard'
import {Link} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import TitledDateIntervalList from './TitledDateIntervalList'
import {FetchContext} from '../context/FetchContext'
import PropTypes from 'prop-types'

function UserCardSets({filter, search, username, isUser}) {
  const {mainAxios} = useContext(FetchContext)
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    mainAxios
      .get(`/users-card-sets/${username}`)
      .then(res => {
        if (isMounted) {
          setCardSets(res.data.userCardSets)
        }
      })
      .catch(error => {
        if (isMounted) {
          console.log(error)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => (isMounted = false)
  }, [username, mainAxios])

  function alphabeticalFilter(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1
    }
    return 0
  }

  function renderCardSets() {
    if (!loading && cardSets?.length === 0) {
      return (
        <div className="h-64 w-full px-4">
          <NoItemsCard
            subtitle={
              isUser ? (
                <>
                  Click{' '}
                  <Link className="hover:text-teal-800" to="/card-sets/new">
                    here
                  </Link>{' '}
                  to create one!
                </>
              ) : null
            }
            title={
              isUser
                ? `You haven't created any sets`
                : `This user hasn't created any sets`
            }
          />
        </div>
      )
    }

    switch (filter) {
      case 'Latest':
        const filteredCardSets =
          cardSets?.filter(cardSet =>
            cardSet.name.toLowerCase().match(search.value.toLowerCase()),
          ) || []
        return !loading && filteredCardSets?.length === 0 ? (
          <div className="w-full justify-center flex">
            <NoMatch />
          </div>
        ) : (
          <TitledDateIntervalList
            render={props => (
              <div className="mt-2 px-4">
                <Link to={`/card-sets/${props.cardSet.card_set_id}`}>
                  <UserCardSetCard {...props} />
                </Link>
              </div>
            )}
            data={filteredCardSets}
            dateKey={'created_at'}
          />
        )

      case 'Alphabetical':
        let alphabeticalSort = cardSets
          .filter(cardSet =>
            cardSet.name.toLowerCase().match(search.value.toLowerCase()),
          )
          .sort((a, b) => alphabeticalFilter(a, b))
          .map((cardSet, index) => {
            return (
              <div className="mt-2 px-4">
                <Link to={`/card-sets/${cardSet.card_set_id}`}>
                  <UserCardSetCard
                    cardSet={cardSet}
                    index={index}
                    key={index}
                  />
                </Link>
              </div>
            )
          })

        return !loading && alphabeticalSort.length === 0 ? (
          <div className="w-full justify-center flex">
            <NoMatch />
          </div>
        ) : (
          alphabeticalSort
        )
      default:
        return
    }
  }

  return (
    <div className="overflow-y-auto justify-center">{renderCardSets()}</div>
  )
}

UserCardSets.propTypes = {
  filter: PropTypes.oneOf(['Alphabetical', 'Latest']),
  search: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    isValid: PropTypes.bool,
  }),
  username: PropTypes.string,
  isUser: PropTypes.bool,
}

export default UserCardSets
