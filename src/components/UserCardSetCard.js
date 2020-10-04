import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import {format} from 'date-fns'

export default function UserCardSetCard(props) {
  let {authState} = useContext(AuthContext)
  let {mainAxios} = useContext(FetchContext)
  const {idx, cardSet, studied = false, searchCard = false} = props

  function renderStudiedCard() {
    return (
      <div className="px-4 search border-0 border-black h-16 bg-white w-full border-t-2 border-pink-100">
        <div className="flex h-full justify-around items-center">
          <div className="cursor-not-allowed opacity-25">Learn</div>
          <Link to={`/card-sets/${cardSet.card_set_id}`}>
            <div className="">Flashcards</div>
          </Link>
          <div className="cursor-not-allowed opacity-25">Write</div>
          <div className="cursor-not-allowed opacity-25">Spell</div>
          <div className="cursor-not-allowed opacity-25">Test</div>
          <div className="cursor-not-allowed opacity-25">Match</div>
          <div className="cursor-not-allowed opacity-25">Gravity</div>
        </div>
      </div>
    )
  }

  function renderSearchCard() {
    if (cardSet.flashcards === null) return
    return (
      <Link className="w-full" to={`/card-sets/${cardSet.card_set_id}`}>
        <div className="w-full border border-gray-200 h-32">
          <div className="flex justify-between h-full">
            {cardSet.flashcards.map((flashcard, idx) => {
              return (
                <div
                  key={idx}
                  style={{justifyContent: 'space-evenly'}}
                  className="w-1/4 px-4 border border-gray-200 flex flex-col items-start h-full"
                >
                  <p style={{maxWidth: '20ch'}} className="text-xs truncate">
                    {flashcard.term}
                  </p>
                  <p
                    style={{maxWidth: '20ch'}}
                    className="text-xs opacity-50 truncate"
                  >
                    {flashcard.definition}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </Link>
    )
  }

  async function handleCreateUserCardSet() {
    try {
      if (searchCard && authState.userInfo) {
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
    <div
      onClick={handleCreateUserCardSet}
      key={idx}
      className="flex justify-center "
    >
      <div className={`w-full my-2 px-4 `}>
        <div
          className={`relative z-0 w-full rounded-sm overflow-hidden  ${
            cardSet.checked ? 'shadow-inner border-2 border-blue-700' : ''
          } 
               ${studied ? 'h-40' : 'h-20'}
               ${searchCard ? 'h-48' : 'h-20'}

               `}
        >
          <div
            //  onClick={() => handleChecked(cardSet)}
            className="has-line absolute z-10 flex flex-col w-full h-full bg-white items-center shadow-xl border-b-2"
          >
            {/* <input
                            onChange={() => handleChecked(cardSet)}
                            className="ml-4 self-center"
                            type="checkbox"
                            checked={cardSet.checked}
                          /> */}
            {/* {editMode ? (
                              <div
                                className="h-full w-full text-2xl ml-24"
                                key={idx}
                              >
                                <div>{cardSet.name}</div>
                              </div>
                            ) : ( */}
            <div
              className={`py-2 h-20 pl-5 flex w-full justify-start ${
                searchCard ? 'border-b-0 border-2 border-gray-200' : ''
              }`}
              key={idx}
            >
              <Link
                className="h-full w-full"
                to={`/card-sets/${cardSet.card_set_id}`}
              >
                <div className="flex px-2 items-center">
                  <div className="pr-2 text-sm text-gray-700">
                    {cardSet.flashcards_count} Terms
                  </div>
                  <div className="pl-2 border-yellow-500 border-l-2 text-sm text-teal-500">
                    {cardSet.creator_name}
                  </div>
                </div>
                <div className="mt-1 pl-2 text-xl font-medium">
                  {cardSet.name}
                </div>
              </Link>
            </div>
            {studied ? renderStudiedCard() : null}
            {searchCard ? renderSearchCard() : null}
          </div>
        </div>
      </div>
      {/* {editMode && (
                        <div className="flex flex-col justify-center text-2xl text-gray-500 text-transparent hover:text-gray-500">
                          <i
                            data-id={cardSet.id}
                            onClick={handleDelete}
                            className="fas fa-times hover:border-black opacity-50 hover:opacity-100"
                            style={{ WebkitTextStroke: "2px grey" }}
                          ></i>
                        </div>
                      )} */}
    </div>
  )
}
