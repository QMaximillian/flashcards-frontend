import React from 'react'
import PropTypes from 'prop-types'

export default function TermsInSet({flashcards}) {
  console.log(flashcards)
  return (
    <div>
      <div className="mx-4 font-bold mb-6 text-lg">
        Terms in this set ({flashcards.length})
      </div>
      {flashcards.map((flashcard, idx) => {
        return (
          <div
            key={idx}
            className="p-5 bg-white shadow-xl mb-4 mx-4 h-32 flex flex-col justify-end"
          >
            <div className="mb-4">{flashcard.term}</div>
            <div className="">{flashcard.definition}</div>
          </div>
        )
      })}
    </div>
  )
}

TermsInSet.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      definition: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      term: PropTypes.string.isRequired,
    }),
  ),
}
