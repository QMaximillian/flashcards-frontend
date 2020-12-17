import React from 'react'
import {Link} from 'react-router-dom'

function SearchCard({cardSet}) {
  if (cardSet.flashcards === null) return null
  return (
    <Link className="w-full h-full" to={`/card-sets/${cardSet.card_set_id}`}>
      <div className="w-full border border-gray-200 h-full">
        <div className="flex justify-between h-full">
          {cardSet.flashcards.map((flashcard, index) => {
            return (
              <div
                key={index}
                style={{justifyContent: 'space-evenly'}}
                className="w-full px-4 border-gray-200 border-l border-r flex flex-col items-start h-full"
              >
                <p
                  style={{maxWidth: '20ch'}}
                  className="text-xs truncate break-words"
                >
                  {flashcard.term}
                </p>
                <p
                  style={{maxWidth: '20ch'}}
                  className="text-xs opacity-50 truncate break-words"
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

export default SearchCard
