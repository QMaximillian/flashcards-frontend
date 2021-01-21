import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function SearchCard({cardSet}) {
  return (
    <Link className="w-full h-full" to={`/card-sets/${cardSet.card_set_id}`}>
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
  )
}

SearchCard.propTypes = {
  cardSet: PropTypes.shape({
    name: PropTypes.string,
    card_set_id: PropTypes.string,
    creator_id: PropTypes.string,
    creator_username: PropTypes.string,
    flashcards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        term: PropTypes.string,
        definition: PropTypes.string,
      }),
    ),
  }),
}

export default SearchCard
