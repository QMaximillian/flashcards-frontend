import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function StudiedCard({cardSetId}) {
  return (
    <div className="px-4 search  h-16 bg-white w-full">
      <div className="flex h-full justify-around items-center">
        <div className="cursor-not-allowed opacity-25">Learn</div>
        <Link to={`/card-sets/${cardSetId}`}>
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

StudiedCard.propTypes = {
  cardSetId: PropTypes.string.isRequired,
}

export default StudiedCard
