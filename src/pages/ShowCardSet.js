import React, {useEffect, useState, useContext, useCallback} from 'react'

import {useTransition, animated} from 'react-spring'
import {Link} from 'react-router-dom'
import FinalFlashCard from '../components/FinalFlashCard'
import {format} from 'date-fns'
import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'
import NoMatch from '../components/NoMatch'
import TermsInSet from '../components/TermsInSet'
import {useParams} from 'react-router-dom'
import {uuidCheck} from '../lib/helpers'
import Card from '../components/Card'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import placeholderPhoto from '../photos/placeholder-photo.png'

export default function ShowCardSet(props) {
  const {isAuthenticated, authState} = useContext(AuthContext)
  const {mainAxios} = useContext(FetchContext)
  const [isLoading, setIsLoading] = useState(true)
  const [cardSet, setCardSet] = useState({})
  const [flashcards, setFlashcards] = useState([])
  const [count, setCount] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [error, setError] = useState(false)
  const {id} = useParams()
  const uuidExists = uuidCheck.test(id)

  const nextSlide = useCallback(() => {
    if (count === flashcards.length) return
    if (reverse) setReverse(false)
    setCount(count + 1)
  }, [reverse, count, flashcards.length])

  const prevSlide = useCallback(() => {
    if (count === 0) return
    if (!reverse) setReverse(true)
    setCount(count - 1)
  }, [reverse, count])

  const handleCardNavigation = useCallback(
    event => {
      switch (event.keyCode) {
        case 37:
          return prevSlide()
        case 39:
          return nextSlide()
        default:
          break
      }
    },
    [prevSlide, nextSlide],
  )

  const isAuthenticatedAndUser = useCallback(
    () =>
      isAuthenticated() &&
      authState.userInfo.username === cardSet.creator_username &&
      authState.userInfo.id === cardSet.creator_id,
    [authState.userInfo, cardSet, isAuthenticated],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleCardNavigation)

    return () => document.removeEventListener('keydown', handleCardNavigation)
  }, [handleCardNavigation])

  useEffect(() => {
    let isMounted = true
    if (uuidExists) {
      mainAxios
        .get(`/card-sets/${id}`)
        .then(res => {
          if (isMounted) {
            const {flashcards, ...rest} = res.data.cardSet
            setCardSet(rest)
            setFlashcards([...flashcards])
            setIsLoading(false)
          }
        })
        .catch(err => {
          if (isMounted) {
            setError(true)
          }
        })
    } else {
      setError(true)
    }

    return () => (isMounted = false)
  }, [id, mainAxios, uuidExists])

  useEffect(() => {
    let isMounted = true

    if (isAuthenticatedAndUser()) {
      if (!isLoading && count === flashcards.length) {
        if (isMounted) {
          mainAxios.post(`/users-card-set-last-studied`, {
            card_set_id: props.match.params.id,
            last_studied_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
          })
        }
      }
    }

    return () => (isMounted = false)
  }, [
    count,
    flashcards,
    isLoading,
    props.match.params.id,
    mainAxios,
    isAuthenticatedAndUser,
  ])

  useEffect(() => {
    if (isAuthenticatedAndUser()) {
      mainAxios.post(`/users-card-set-last-seen`, {
        card_set_id: props.match.params.id,
        last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
      })
    }
  }, [props.match.params.id, mainAxios, isAuthenticatedAndUser])

  const transitions = useTransition([count], item => item, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: '100%',
      transform: reverse
        ? 'translate3d(-100%, 0, 0)'
        : 'translate3d(200%, 0, 0)',
      textAlign: 'center',
    },
    enter: {
      opacity: 1,
      width: '100%',
      transform: 'translate3d(0, 0, 0)',
      textAlign: 'center',
    },
    leave: {
      opacity: 0,
      width: '100%',
      transform: reverse
        ? 'translate3d(200%, 0, 0)'
        : 'translate3d(-100%, 0, 0)',
      textAlign: 'center',
    },
  })

  if (error || !uuidExists)
    return (
      <div className="flex items-center justify-center h-full">
        <NoMatch />
      </div>
    )
  if (isLoading) return <div>Loading...</div>

  function renderEditOrCustomize() {
    if (!isAuthenticated()) return

    if (
      authState.userInfo.username === cardSet.creator_username &&
      authState.userInfo.id === cardSet.creator_id
    ) {
      return (
        <Link
          className="flex items-center justify-center"
          to={`/card-sets/${props.match.params.id}/edit`}
        >
          <i className="far fa-edit hover:text-orange-600"></i>
        </Link>
      )
    } else {
      return (
        <Link
          className="flex items-center justify-center"
          to={{
            pathname: '/card-sets/new',
            state: {
              fromCustomize: true,
              prevCardSetName: cardSet.name,
              flashcardFields: flashcards.slice(),
              cardSetId: cardSet.card_set_id,
              mode: 'CUSTOMIZE',
            },
          }}
        >
          <i className="far fa-clone text-gray-600 hover:text-orange-600" />
        </Link>
      )
    }
  }

  function createFlashcardList(key, transitionProps) {
    let cards = flashcards.map(flashcard => (
      <Card
        flashcardBack={flashcard.definition}
        flashcardFront={flashcard.term}
        key={key}
        style={transitionProps}
      />
    ))
    return (cards = [
      ...cards,
      <FinalFlashCard
        handleReset={() => {
          setReverse(true)
          setCount(0)
        }}
        numOfFlashcards={flashcards.length}
      />,
    ])
  }

  return (
    <div className="w-full">
      <div className="text-4xl font-bold text-gray-700 opacity-50 ml-16 mt-6">
        {cardSet.name}
      </div>
      <div className="mt-6 flex lg:flex-row flex-col-reverse lg:w-full lg:pl-20">
        <div className="lg:flex-col lg:flex lg:w-1/5">
          <div className="pl-2 text-sm opacity-25">STUDY</div>
          <FlashcardsNavDrawer />
        </div>
        <div className="flex-col flex items-center justify-between lg:w-3/4">
          <div className="w-full py-4 overflow-hidden flex justify-center">
            <div className="flex relative h-64 w-3/4">
              {transitions.map(({item, props: transitionProps, key}) => {
                return (
                  <animated.div key={key} style={transitionProps}>
                    {createFlashcardList(key, transitionProps)[item]}
                  </animated.div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-center w-3/4 h-12 items-center">
            <div
              className={`mx-10 ${
                count === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-orange-500'
              }`}
              onClick={prevSlide}
            >
              <i className="fas fa-arrow-left"></i>
            </div>
            <div>{`${count + 1} / ${flashcards.length + 1}`}</div>
            <div
              className={`mx-10 ${
                count === flashcards.length
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-orange-500'
              }`}
              onClick={nextSlide}
            >
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-4" />
      <div className="sm:flex px-4">
        <div className="w-1/3 py-6 flex">
          <div className="h-full">
            <img
              alt="A user's profile"
              className="w-16 h-16 object-fill rounded-full mr-4 bg-gray-500"
              src={cardSet.creator_profile_pic || placeholderPhoto}
              style={{minWidth: '4rem', minHeight: '4rem'}}
            />
          </div>
          <div className="ml-2 self-center">
            <div className="text-xs text-gray-500">Created by </div>
            <Link
              to={`/${cardSet.creator_username}`}
              className="text-sm hover:text-orange-600"
            >
              {cardSet.creator_username}
            </Link>
          </div>
        </div>
        <div className="flex justify-end sm:items-center sm:w-full">
          <div className="w-2/5 flex justify-around">
            <i className="fas fa-plus opacity-50 cursor-not-allowed"></i>
            {renderEditOrCustomize()}
            <i className="fas fa-share opacity-50 cursor-not-allowed"></i>
            <i className="fas fa-info opacity-50 cursor-not-allowed"></i>
            <i className="fas fa-ellipsis-h opacity-50 cursor-not-allowed"></i>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-4">
        <TermsInSet flashcards={flashcards} />
      </div>
      {isAuthenticatedAndUser() && (
        <div className="mb-4 flex justify-center">
          <div className="h-16 rounded bg-teal-500 w-64 flex items-center justify-center">
            <Link to={`/card-sets/${props.match.params.id}/edit`}>
              <div className="text-white tracking-wide">
                Add or Remove Items
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
