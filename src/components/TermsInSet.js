import React from 'react'
import PropTypes from 'prop-types'

function TermsInSet({flashcards}) {
  return (
    <div className="py-4">
      <div className="mx-4 font-bold mb-6 text-lg">
        Terms in this set ({flashcards.length})
      </div>
      {flashcards.map(({term, definition}, index) => {
        return (
          <div
            className="p-5 bg-white shadow-xl mb-4 mx-4 h-32 flex flex-col justify-end"
            key={index}
          >
            <div className="mb-4">{term}</div>
            <div className="">{definition}</div>
          </div>
        )
      })}
    </div>
  )
}

TermsInSet.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      definition: PropTypes.string,
      id: PropTypes.string,
      term: PropTypes.string,
    }),
  ),
}

export default TermsInSet
