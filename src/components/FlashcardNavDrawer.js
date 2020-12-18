import React from 'react'
import {Link} from 'react-router-dom'

export default function FlashcardsNavDrawer(props) {
  const flashcardCategories = [
    {
      name: 'Flashcards',
    },
    {
      name: 'Learn',
    },
    {
      name: 'Write',
    },
    {
      name: 'Spell',
    },
    {
      name: 'Test',
    },
  ]

  function renderStudyTopic() {
    return flashcardCategories.map((category, index) => {
      if (index === 0) {
        return (
          <Link className="pl-4 text-lg mb-6"
key={ index }
to="#">
            Flashcards
          </Link>
        )
      } else {
        return (
          <Link
            className="pl-4 text-lg opacity-25 cursor-not-allowed mb-6"
            key={ index }
            to="#"
          >
            {category.name}
          </Link>
        )
      }
    })
  }
  return renderStudyTopic()
}
