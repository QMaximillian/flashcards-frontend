import React from 'react'
import PropTypes from 'prop-types'
import {animated} from 'react-spring'

export default function FinalFlashCard(props) {
  const {numOfFlashcards, handleReset} = props
  return (
    <div className="h-64 w-3/4">
      <animated.div
        className={`bg-white p-4 bg-cover flex items-center justify-center h-full w-full border border-gray-500 rounded absolute mx-h-full`}
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex flex-col items-center justify-between">
          <div className="text-3xl">
Nice Work
</div>
          <div>
You just studied
{numOfFlashcards}
{' '}
terms
</div>
          <button className="text-green-500"
onClick={handleReset}>
            Study with Flashcards again
          </button>
        </div>
      </animated.div>
    </div>
  )
}

FinalFlashCard.propTypes = {
  numOfFlashcards: PropTypes.number.isRequired,
  handleReset: PropTypes.func.isRequired,
}
