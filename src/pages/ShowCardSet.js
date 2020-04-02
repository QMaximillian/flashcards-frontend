import React, {useEffect, useState, useContext} from 'react'

import {useTransition, useSpring, animated} from 'react-spring'
import {Link} from 'react-router-dom'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'
import {
  fetchPostLastSeen,
  fetchPostLastStudied,
} from '../fetchRequests/usersCardSets'
import FinalFlashCard from '../components/FinalFlashCard'
import PropTypes from 'prop-types'
import {format} from 'date-fns'
import FlashcardsNavDrawer from '../components/FlashcardNavDrawer'
import NoMatch from '../components/NoMatch'
import TermsInSet from '../components/TermsInSet'
import {useParams} from 'react-router-dom'
import {uuidCheck} from '../lib/helpers'
import {UserContext} from '../context/user-context'

export default function ShowCardSet(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [cardSet, setCardSet] = useState({})
  const [flashcards, setFlashcards] = useState([])
  const [count, setCount] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [error, setError] = useState(false)
  const {user} = useContext(UserContext)
  // const [uuid, setUuid] = useState(uuidCheck.test(id))
  const {id} = useParams()
  const uuid = React.useRef(uuidCheck.test(id))

  useEffect(() => {
    if (uuid.current) {
      fetchGetCardSetShow(id)
        .then(r => {
          const {flashcards, ...rest} = r
          setCardSet(rest)
          setFlashcards([...flashcards, {}])
          setIsLoading(false)
        })
        .catch(
          err => {
            console.log(err)
            setError(true)
          },
          // console.log(err)
        )
    }
  }, [id])

  useEffect(() => {
    if (!isLoading && count === flashcards.length - 1) {
      fetchPostLastStudied({
        card_set_id: props.match.params.id,
        last_studied_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
      })
    }
  }, [count, flashcards.length, isLoading, props.match.params.id])
  useEffect(() => {
    fetchPostLastSeen({
      card_set_id: props.match.params.id,
      last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
    })
  }, [props.match.params.id])

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

  function nextSlide() {
    if (count >= flashcards.length - 1) return
    setCount(count + 1)
    setReverse(false)
  }
  function prevSlide() {
    if (count <= 0) return
    setCount(count - 1)
    setReverse(true)
  }

  function renderCurrentCardFraction() {
    if (flashcards.length - 1 !== count) {
      return `${count + 1}/${flashcards.length - 1}`
    } else {
      return `${flashcards.length - 1}/${flashcards.length - 1}`
    }
  }

  function renderEditOrCustomize() {
    if (!user) {
      return null
    } else if (
      user.username === cardSet.creator_username &&
      user.id === cardSet.creator_id
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
              flashcardFields: flashcards.slice(0, -1),
            },
          }}
          className="flex items-center justify-center"
        >
          <i className="far fa-clone text-gray-600"></i>
        </Link>
      )
    }
  }

  if (!uuid.current) return <div>No Match</div>
  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <NoMatch />
      </div>
    )
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="w-full">
      <div className="text-4xl font-bold text-gray-700 opacity-50 ml-16 mt-8">
        {cardSet.name}
      </div>
      <div className="flex lg:flex-row flex-col-reverse lg:w-full lg:pl-20">
        <div className="lg:flex-col lg:flex lg:w-1/5">
          <div className="pl-2 text-sm opacity-25">STUDY</div>

          <FlashcardsNavDrawer />
        </div>
        <div className="flex-col flex items-center justify-between lg:w-3/4">
          <div className="w-full py-4 overflow-hidden flex justify-center">
            <div className="flex relative h-64 w-3/4">
              {transitions.map(({item, props, key}) => {
                return (
                  <animated.div key={key} style={props}>
                    {count !== flashcards.length - 1 ? (
                      <Card
                        key={key}
                        style={props}
                        flashcardFront={flashcards[item].term}
                        flashcardBack={flashcards[item].definition}
                      />
                    ) : (
                      <FinalFlashCard
                        cardSetLength={flashcards.length - 2}
                        handleReset={() => setCount(0)}
                      />
                    )}
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
            <div>{renderCurrentCardFraction()}</div>
            <div
              onClick={nextSlide}
              className={`mx-10 ${
                count === flashcards.length - 1
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
        <TermsInSet flashcards={flashcards.slice(0, flashcards.length - 1)} />
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

function Card(props) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  return (
    <div className="h-64 w-3/4" onClick={() => set(state => !state)}>
      <animated.div
        className={` bg-cover flex items-center justify-center h-full w-full border border-gray-500 rounded absolute cursor-pointer mx-h-full`}
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          opacity: opacity.interpolate(o => 0.75 - o),
          transform,
        }}
      >
        <div className="text-3xl font-light">{props.flashcardFront}</div>
      </animated.div>
      <animated.div
        className={` bg-cover text-gray-800 flex items-center justify-center h-full w-full border border-gray-500 rounded absolute cursor-pointer mx-h-full`}
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      >
        <div className="text-3xl font-light">{props.flashcardBack}</div>
      </animated.div>
    </div>
  )
}

FinalFlashCard.propTypes = {
  cardSetLength: PropTypes.number,
  handleReset: PropTypes.func,
}

FinalFlashCard.defaultProps = {
  cardSetLength: 0,
  handleReset: () => {},
}
