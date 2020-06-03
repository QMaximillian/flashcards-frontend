import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

export default function HomeLatestCard(props) {
  const {name, flashcards_count, owner, username} = props.cardSet
  const history = useHistory()

  return (
    <article className="h-full w-full border border-gray-500 shadow-lg rounded">
      <div
        className="h-full w-full home-latest px-4 flex flex-col"
        style={{justifyContent: 'space-evenly'}}
      >
        <p
          className="text-base font-semibold truncate sm:break-words"
          title={name}
        >
          {name}
        </p>
        <div>
          <p className="opacity-50 text-sm truncate sm:break-words">
            {flashcards_count} terms
          </p>

          <div
            onClick={() => history.push(`/${username}`)}
            className="hover:text-teal-500 truncate sm:break-words"
          >
            <p>{owner}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

HomeLatestCard.defaultProps = {
  cardSet: {
    name: '',
    flashcards_count: 0,
    owner: '',
  },
}

HomeLatestCard.propTypes = {
  cardSet: PropTypes.shape({
    name: PropTypes.string,
    flashcards_count: PropTypes.number,
    owner: PropTypes.string,
  }),
}
