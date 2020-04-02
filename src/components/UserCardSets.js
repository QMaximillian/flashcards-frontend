import React, {useEffect, useState} from 'react'
import {
  fetchGetUserCardSetsIndex,
  // fetchDeleteCardSets
} from '../fetchRequests/cardSets'
import NoItemsCard from './NoItemsCard'
import {Link} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import NoMatch from '../components/NoMatch'
import {addTimeIntervals} from '../lib/helpers'
import '../styles/index.css'

export default function UserCardSets({filter, search, username, isUser}) {
  const [cardSets, setCardSets] = useState([])
  const [loading, setLoading] = useState(true)
  const [
    editMode,
    // setEditMode
  ] = useState(false)
  const [initialCardState, setInitialCardState] = useState([])

  useEffect(() => {
    if (!editMode) {
      setCardSets(initialCardState)
    }
  }, [editMode, initialCardState])

  useEffect(() => {
    let isSubscribed = true
    fetchGetUserCardSetsIndex(username)
      // .then(r => addCheckedProperty(r))
      .then(r => {
        if (isSubscribed) {
          setLoading(false)
          setCardSets(r)
          setInitialCardState(r)
        }
      })
      .catch(r =>
        isSubscribed
          ? // console.log(r)
            () => {}
          : null,
      )

    return () => (isSubscribed = false)
  }, [username])

  function selectFilter(a, b) {
    if (filter === 'Latest') {
      if (new Date(a.created_at) > new Date(b.created_at)) {
        return -1
      } else if (new Date(a.created_at) < new Date(b.created_at)) {
        return 1
      }
    }

    if (filter === 'Alphabetical') {
      if (a.name < b.name) {
        return -1
      } else if (a.name > b.name) {
        return 1
      }
    }
    return 0
  }

  function renderCardSets() {
    if (!loading && cardSets.length === 0) {
      return (
        <div className="h-64 w-full px-4">
          <NoItemsCard
            title={
              isUser
                ? `You haven't created any sets`
                : `This user hasn't created any sets`
            }
            subtitle={
              isUser ? (
                <>
                  Click{' '}
                  <Link to="/card-sets/new" className="hover:text-teal-800">
                    here
                  </Link>{' '}
                  to create one!
                </>
              ) : null
            }
          />
        </div>
      )
    }
    switch (filter) {
      case 'Latest':
        const filteredAndSortedCardSets = cardSets
          .filter(cardSet =>
            cardSet.name.toLowerCase().match(search.value.toLowerCase()),
          )
          .sort((a, b) => selectFilter(a, b))

        return !loading && filteredAndSortedCardSets.length === 0 ? (
          <div className="w-full justify-center flex">
            <NoMatch />
          </div>
        ) : (
          addTimeIntervals(
            filteredAndSortedCardSets,
            UserCardSetCard,
            'created_at',
          )
        )
      case 'Alphabetical':
        let alphabeticalSort = cardSets
          .filter(cardSet =>
            cardSet.name.toLowerCase().match(search.value.toLowerCase()),
          )
          .sort((a, b) => selectFilter(a, b))
          .map((cardSet, idx) => {
            return (
              <UserCardSetCard
                key={idx}
                cardSet={cardSet}
                // handleChecked={handleChecked}
              />
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
