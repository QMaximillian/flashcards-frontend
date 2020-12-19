import React, {useContext} from 'react'
import SearchCard from './SearchCard'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {uuidCheck} from '../lib/helpers'

export default function UserCardSetCard(props) {
  let {authState} = useContext(AuthContext)
  let {mainAxios} = useContext(FetchContext)
  const {index, cardSet, studied = false, searchCard = false} = props

  function renderStudiedCard() {
    return (
      <div className="px-4 search border-0 border-gray-300 h-16 bg-white w-full border-t-2">
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

  return (
    <div
      className="flex justify-center"
      key={index}
      onClick={handleCreateUserCardSet}
    >
      <div className={`w-full my-2 px-4`}>
        <div
          className={`relative z-0 w-full rounded-sm overflow-hidden ${
            cardSet.checked ? 'shadow-inner border-2 border-blue-700' : ''
          } 
               ${studied ? 'h-40' : 'h-20'}
               ${searchCard ? 'search-has-line h-48' : 'h-20'}

               `}
        >
          <div
            className={`${
              !searchCard ? 'has-line' : null
            } flex flex-col w-full h-full bg-white items-center shadow-xl border-b-2`}
          >
            <div
              className={`py-2 h-20 pl-5 flex w-full justify-start ${
                searchCard ? 'border-b-0 border-2 border-gray-200' : ''
              }`}
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
                <div className="mt-1 pl-2 text-xl font-medium truncate">
                  {cardSet.name}
                </div>
              </Link>
            </div>
            {studied ? renderStudiedCard() : null}
            {searchCard ? <SearchCard cardSet={cardSet} /> : null}
          </div>
        </div>
      </div>
    </div>
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
}
