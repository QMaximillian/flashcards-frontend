import React, {useEffect, useState} from 'react'
import {
  fetchGetUserCardSetsIndex,
  // fetchDeleteCardSets
} from '../fetchRequests/cardSets'
import NoItemsCard from './NoItemsCard'
import {Link} from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import {addTimeIntervals} from '../lib/helpers'
import '../styles/index.css'

export default function UserCardSets(props) {
  const {filter, search} = props

  const [cardSets, setCardSets] = useState([])
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
    fetchGetUserCardSetsIndex()
      // .then(r => addCheckedProperty(r))
      .then(r => {
        setCardSets(r)
        setInitialCardState(r)
      })
  }, [])

  // useEffect(() => {
  //   console.log(cardSets)
  // }, [cardSets])

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
    if (cardSets.length === 0) {
      return (
        <div className="h-64 w-full">
          <NoItemsCard
            title={`You haven't created any sets`}
            subtitle={
              <>
                Click{' '}
                <Link to="/card-sets/new" className="hover:text-teal-800">
                  here
                </Link>{' '}
                to create one!
              </>
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

        return addTimeIntervals(
          filteredAndSortedCardSets,
          UserCardSetCard,
          'created_at',
        )
      case 'Alphabetical':
        return cardSets
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
      default:
        return
    }
  }

  return (
    <div className="overflow-y-auto justify-center">{renderCardSets()}</div>
  )
}
