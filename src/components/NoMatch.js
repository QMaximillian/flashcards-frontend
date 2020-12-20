import React from 'react'
import PropTypes from 'prop-types'

function NoMatch({message}) {
  return (
    <div
      className={
        'bg-gray-200 shadow-xl max-w-6xl h-64 flex border-teal-400  rounded-lg border justify-center align-center'
      }
    >
      <article
        className={'p-2 text-teal-400 align-center flex-col flex'}
        style={{justifyContent: 'space-evenly'}}
      >
        <div className="text-3xl self-center font-semibold">No Match</div>
        <div className="text-lg self-center font-medium">
          {'The page you are looking for is not available' || message}
        </div>
      </article>
    </div>
  )
}

NoMatch.propTypes = {
  message: PropTypes.string,
}

export default NoMatch
