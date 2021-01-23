import React, {useContext, useReducer} from 'react'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'
import {Link} from 'react-router-dom'
import {FetchContext} from '../context/FetchContext'
import PropTypes from 'prop-types'

function SearchCard({cardSet, index}) {
  let {mainAxios} = useContext(FetchContext)
  const [dialogState, dispatch] = useReducer(
    function dialogReducer(state, action) {
      switch (action.type) {
        case 'OPEN_DIALOG':
          return {
            isOpen: true,
            info: action.data,
          }
        case 'CLOSE_DIALOG':
          return {
            isOpen: false,
            info: null,
          }
        default:
          console.warn(`Action type: '${action.type} not supported'`)
          return
      }
    },
    {isOpen: false, info: null},
  )
  //   async function handleCreateUserCardSet() {
  //     try {
  //       if (searchCard && uuidCheck.test(authState.userInfo.id)) {
  //         let options = {
  //           card_set_id: cardSet.card_set_id,
  //           creator_id: cardSet.user_id,
  //           last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
  //         }

  //         function postUsersCardSet() {
  //           return mainAxios.post('/users-card-set/new', options)
  //         }

  //         await postUsersCardSet()
  //       }
  //     } catch (error) {
  //       console.log('error: ', error)
  //     }
  //   }

  async function handleDelete() {
    try {
      const result = await mainAxios.delete(
        `/card-sets/${dialogState.info.cardSet.card_set_id}`,
      )
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <div className="h-full w-full">
      <Dialog
        aria-label="confirm flashcard set delete"
        isOpen={dialogState.isOpen}
        onDismiss={() => dispatch({type: 'CLOSE_DIALOG'})}
      >
        <div>You are about to delete this set of flashcards</div>
        <div>Click CONFIRM to delete</div>
        <button
          aria-label="Delete and Close"
          onClick={() => {
            handleDelete()
            dispatch({type: 'CLOSE_DIALOG'})
          }}
        >
          Confirm
        </button>
        <button
          aria-label="Close"
          onClick={() => dispatch({type: 'CLOSE_DIALOG'})}
        >
          Exit
        </button>
      </Dialog>
      <div
        key={index}
        className={`bg-white flex justify-center relative z-0 w-full h-full rounded-sm overflow-hidden`}
        // onClick={handleCreateUserCardSet}
      >
        <Link
          className="w-full h-full"
          to={`/card-sets/${cardSet.card_set_id}`}
        >
          <div className="w-full h-full">
            <div className="flex justify-between h-full w-full">
              {cardSet.flashcards.map((flashcard, index) => {
                return (
                  <div
                    className="w-full px-4 border-gray-200 border-l border-r flex flex-col items-start h-full"
                    key={index}
                    style={{justifyContent: 'space-evenly'}}
                  >
                    <p
                      className="text-xs truncate break-words"
                      style={{maxWidth: '20ch'}}
                    >
                      {flashcard.term}
                    </p>
                    <p
                      className="text-xs opacity-50 truncate break-words"
                      style={{maxWidth: '20ch'}}
                    >
                      {flashcard.definition}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

SearchCard.propTypes = {
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

export default SearchCard
