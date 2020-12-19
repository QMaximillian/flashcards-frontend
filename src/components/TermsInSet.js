import React from 'react'
import PropTypes from 'prop-types'

export default function TermsInSet(props) {
  return (
    <div className="py-4">
      <div className="mx-4 font-bold mb-6 text-lg">
        Terms in this set (
{props.flashcards.length}
)
</div>
      {props.flashcards.map((flashcard, index) => {
        return (
          <div
            className="p-5 bg-white shadow-xl mb-4 mx-4 h-32 flex flex-col justify-end"
            key={index}
          >
            <div className="mb-4">
{flashcard.term}
</div>
            <div className="">
{flashcard.definition}
</div>
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
