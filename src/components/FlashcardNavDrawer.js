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
    return flashcardCategories.map((category, idx) => {
      if (idx === 0) {
        return (
          <Link key={idx} className="pl-4 text-lg mb-6" to="#">
            Flashcards
          </Link>
        )
      } else {
        return (
          <Link
            key={idx}
            className="pl-4 text-lg opacity-25 cursor-not-allowed mb-6"
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
