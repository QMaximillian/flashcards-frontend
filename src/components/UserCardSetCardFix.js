import React, {useContext, useReducer} from 'react'
import '@reach/dialog/styles.css'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import {format} from 'date-fns'
import PropTypes from 'prop-types'
import {uuidCheck} from '../lib/helpers'

function UserCardSetCardFix({cardSet, index}) {
  let {authState} = useContext(AuthContext)
  let {mainAxios} = useContext(FetchContext)
  // async function handleCreateUserCardSet() {
  //   try {
  //     if (searchCard && uuidCheck.test(authState.userInfo.id)) {
  //       let options = {
  //         card_set_id: cardSet.card_set_id,
  //         creator_id: cardSet.user_id,
  //         last_seen_at: format(Date.now(), "yyyy-LL-dd'T'HH:mm:ss'Z'"),
  //       }

  //       function postUsersCardSet() {
  //         return mainAxios.post('/users-card-set/new', options)
  //       }

  //       await postUsersCardSet()
  //     }
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // }

  // async function handleDelete() {
  //   try {
  //     const result = await mainAxios.delete(
  //       `/card-sets/${dialogState.info.cardSet.card_set_id}`,
  //     )
  //   } catch (error) {
  //     console.log('error: ', error)
  //   }
  // }

  return (
    <>
      <div
        className="flex justify-center"
        key={index}
        // onClick={handleCreateUserCardSet}
      >
        <div className={`w-full`}>
          <div className={`relative z-0 w-full rounded-sm overflow-hidden`}>
            <div
              className={`flex flex-col w-full h-full bg-white items-center shadow-xl`}
            >
              <div className={`py-2 h-20 px-4 flex w-full justify-start`}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

UserCardSetCardFix.propTypes = {
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
}

export default UserCardSetCardFix
