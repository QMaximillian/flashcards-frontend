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

  return flashcardCategories.map((category, idx) => (
        <Link
          key={idx}
          className={`${category.name !== 'Flashcards' ? 'cursor-not-allowed opacity-25' : ''} pl-4 text-lg mb-6`}
          to="#"
        >
          {category.name}
        </Link>)
  )
}
