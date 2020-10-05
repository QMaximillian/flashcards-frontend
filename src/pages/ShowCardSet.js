import React, {useEffect, useState, useContext} from 'react'

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
  const uuid = React.useRef(uuidCheck.test(id))

  useEffect(() => {
    if (uuid.current) {
      mainAxios
        .get(`/card-sets/${id}`)
        .then(res => {
          const {flashcards, ...rest} = res.data.cardSet
          setCardSet(rest)
          setFlashcards([...flashcards])
          setIsLoading(false)
        })
        .catch(err => setError(true))
    }
  }, [id, mainAxios])

  useEffect(() => {
    if (!isLoading && count === flashcards.length && isAuthenticated()) {
      mainAxios.post(`/users-card-set-last-studied`, {
        card_set_id: props.match.params.id,
        last_studied_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
      })
    }
  }, [
    count,
    flashcards,
    isLoading,
    props.match.params.id,
    mainAxios,
    isAuthenticated,
  ])

  useEffect(() => {
    if (isAuthenticated()) {
      mainAxios.post(`/users-card-set-last-seen`, {
        card_set_id: props.match.params.id,
        last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
      })
    }
  }, [props.match.params.id, mainAxios, isAuthenticated])

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

  if (isLoading) return <div>Loading...</div>
  if (error || !uuid.current)
    return (
      <div className="flex items-center justify-center h-full">
        <NoMatch />
      </div>
    )

  function nextSlide() {
    if (count === flashcards.length) return
    setCount(count + 1)
    if (reverse) setReverse(false)
  }
  function prevSlide() {
    if (count === 0) return
    setCount(count - 1)
    if (!reverse) setReverse(true)
  }

  function renderEditOrCustomize() {
    if (!isAuthenticated()) {
      return null
    } else if (
      authState.userInfo.username === cardSet.creator_username &&
      authState.userInfo.id === cardSet.creator_id
    ) {
      return (
        <Link
          to={`/card-sets/${props.match.params.id}/edit`}
          className="flex items-center justify-center"
        >
          <i className="far fa-edit"></i>
        </Link>
      )
    } else {
      return (
        <Link
          to={{
            pathname: '/card-sets/new',
            state: {
              fromCustomize: true,
              cardSetName: cardSet.name,
              flashcardFields: flashcards.slice(),
            },
          }}
          className="flex items-center justify-center"
        >
          <i className="far fa-clone text-gray-600" />
        </Link>
      )
    }
  }

  function createFlashcardList(key, transitionProps) {
    let cards = flashcards.map(flashcard => (
      <Card
        key={key}
        style={transitionProps}
        flashcardFront={flashcard.term}
        flashcardBack={flashcard.definition}
      />
    ))
    return (cards = [
      ...cards,
      <FinalFlashCard
        numOfFlashcards={flashcards.length}
        handleReset={() => {
          setReverse(true)
          setCount(0)
        }}
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
          <div className="flex justify-center w-3/4 h-12 flex justify-center items-center">
            <div
              onClick={prevSlide}
              className={`mx-10 ${
                count === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-orange-500'
              }`}
            >
              <i className="fas fa-arrow-left"></i>
            </div>
            <div>{`${count + 1} / ${flashcards.length + 1}`}</div>
            <div
              onClick={nextSlide}
              className={`mx-10 ${
                count === flashcards.length
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-orange-500'
              }`}
            >
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pl-2 text-sm opacity-25">STUDY</div> */}
      {/* <div className="flex flex-col sm:flex-row lg:hidden">
            <FlashcardsNavDrawer />
          </div> */}
      <hr className="mx-4" />
      <div className="sm:flex px-4">
        <div className="w-1/3 py-6 flex">
          <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center" />
          <div className="ml-2 self-center">
            <div className="text-xs text-gray-500">Created by </div>
            <div className="text-sm">{cardSet.creator_username}</div>
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
      <div className="mb-4 flex justify-center">
        <div className="h-16 rounded bg-teal-500 w-64 flex items-center justify-center">
          <Link to={`/card-sets/${props.match.params.id}/edit`}>
            <div className="text-white tracking-wide">Add or Remove Items</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
