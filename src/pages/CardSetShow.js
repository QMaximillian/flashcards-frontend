import React, { useEffect, useState } from 'react'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'

export default function CardSetShow(props){
  const [isLoading, setIsLoading] = useState(true)
  const [flashcards, setFlashcards] = useState([])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    fetchGetCardSetShow(props.match.params.id)
    .then(r => setFlashcards(r))
    .then(r => setIsLoading(false))
  }, [props.match.params.id])

      return !isLoading ? (
        <div>
          {flashcards[0].name}
          <div>
            <div>
              {flashcards[idx].term}
              {flashcards[idx].definition}
            </div>
            <div onClick={() => setIdx(idx + 1)}>
              Next
            </div>
            <div onClick={() => setIdx(idx - 1)}>
              Previous
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      );
}

