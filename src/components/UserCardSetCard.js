import React from 'react'
import '@reach/dialog/styles.css'
import PropTypes from 'prop-types'

function UserCardSetCard({cardSet, index}) {
  return (
    <div className="flex justify-center" key={index}>
      <div className={`w-full`}>
        <div className={`relative z-0 w-full rounded-sm overflow-hidden`}>
          <div
            className={`flex flex-col w-full h-full bg-white items-center justify-start shadow-xl`}
          >
            <div className={`py-2 h-20 px-4 flex w-full`}>
              <div className="flex flex-col px-2 items-start justify-center">
                <div className="flex">
                  <div className="px-2 text-sm text-gray-700">
                    {cardSet.flashcards_count} Terms
                  </div>
                  <div className="pl-2 border-yellow-500 border-l-2 text-sm text-teal-500">
                    {cardSet.creator_name || cardSet.owner}
                  </div>
                </div>
<<<<<<< HEAD
                <div className="mt-1 px-3 text-xl font-medium truncate">
=======
                <div className="mt-1 pl-2 text-xl font-medium" data-testid={`card-set-name-${props.idx}`}>
>>>>>>> @{-1}
                  {cardSet.name}
                </div>
              </div>
            </div>
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
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  studied: PropTypes.bool,
}

export default UserCardSetCard
