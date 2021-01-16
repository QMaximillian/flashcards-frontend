import React, {useContext, useReducer } from 'react'
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import SearchCard from './SearchCard'
import StudiedCard from './StudiedCard'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {uuidCheck} from '../lib/helpers'

function UserCardSetCard({
  cardSet,
  index,
  studied = false,
  searchCard = false,
}) {
  let {authState} = useContext(AuthContext)
  let {mainAxios} = useContext(FetchContext)
  const [hover, setHover] = useReducer(state => !state, false)
  const [dialogState, dispatch] = useReducer(function dialogReducer(state, action){
    switch(action.type){
      case "OPEN_DIALOG":
        return {
          isOpen: true,
          info: action.data
        }
      case "CLOSE_DIALOG":
        return {
          isOpen: false,
          info: null
        }
        default: 
          console.warn(`Action type: '${action.type} not supported'`)
          return
      }

    }, { isOpen: false, info: null})
  async function handleCreateUserCardSet() {
    try {
      if (searchCard && uuidCheck.test(authState.userInfo.id)) {
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

  async function handleDelete() {
    try {
      const result = await mainAxios.delete(`/card-sets/${dialogState.info.cardSet.card_set_id}`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <>
    <Dialog aria-label="confirm flashcard set delete" isOpen={dialogState.isOpen} onDismiss={() => dispatch({type: "CLOSE_DIALOG"})}>
      <div>You are about to delete this set of flashcards</div>
    <div>Click CONFIRM to delete</div>
      <button aria-label="Delete and Close" onClick={() =>{
        handleDelete()
        dispatch({type: "CLOSE_DIALOG"})

      }}>Confirm</button>
      <button aria-label="Close" onClick={() => dispatch({type: "CLOSE_DIALOG"})}>Exit</button>
    </Dialog>
    <div
      className="flex justify-center"
      key={index}
      onClick={handleCreateUserCardSet}
    >
      <div className={`w-full my-2 px-4`}>
      
        <div
        onMouseOver={hover ? null : setHover}
        onMouseLeave={setHover}
          className={`relative z-0 w-full rounded-sm overflow-hidden ${
            cardSet.checked ? 'shadow-inner border-2 border-blue-700' : ''
          } 
               ${studied ? 'h-40' : 'h-20'}
               ${searchCard ? 'search-has-line h-48' : 'h-20'}

               `}
        >
        {hover &&
          (
            <div className="absolute z-10 top-0 right-0 left-0 bottom-0 bg-opacity-75 bg-white flex">
              <div className="w-full h-full flex opacity-100">
                <button className="m-4 rounded-sm bg-teal-500 w-full border-black border bg-500-red" onClick={() => dispatch({type: "OPEN_DIALOG", data: { cardSet, index }})}>Delete</button>
                <Link to={`/card-sets/${cardSet.card_set_id}`} className="m-4 rounded-sm bg-teal-500 w-full border-black border bg-500-red flex justify-center items-center">
                  Go To
                </Link>
              </div>
            </div>
          )
        }
          <div
            className={`${
              !searchCard ? 'has-line' : null
            } flex flex-col w-full h-full bg-white items-center shadow-xl border-b-2`}
          >
            <div
              className={`py-2 h-20 px-4 flex w-full justify-start ${
                searchCard ? 'border-b-0 border-2 border-gray-200' : ''
              }`}
            >
              <Link
                className="h-full w-full"
                to={`/card-sets/${cardSet.card_set_id}`}
              >
                <div className="flex px-2 items-center justify-between">
                  <div className="flex">
                    <div className="px-2 text-sm text-gray-700">
                      {cardSet.flashcards_count} Terms
                    </div>
                    <div className="pl-2 border-yellow-500 border-l-2 text-sm text-teal-500">
                      {cardSet.creator_name}
                    </div>
                  </div>
                </div>
                <div className="mt-1 px-4 text-xl font-medium truncate">
                  {cardSet.name}
                </div>
              </Link>
            </div>
            {studied ? <StudiedCard cardSetId={cardSet.card_set_id} /> : null}
            {searchCard && cardSet.flashcards ? (
              <SearchCard cardSet={cardSet} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

UserCardSetCard.propTypes = {
  cardSet: PropTypes.shape({
    card_set_id: PropTypes.string,
    created_at: PropTypes.string,
    creator_id: PropTypes.string,
    creator_name: PropTypes.string,
    flashcards_count: PropTypes.number,
    id: PropTypes.string,
    last_seen_at: PropTypes.string,
    name: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  studied: PropTypes.bool,
  searchCard: PropTypes.bool,
}

export default UserCardSetCard
