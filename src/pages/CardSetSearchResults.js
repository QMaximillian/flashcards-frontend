import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostCardSetSearch } from '../fetchRequests/cardSets'

export default function CardSetSearchResults(props){

    const [cardSets, setCardSets] = useState([])

    let { search } = useParams()

    useEffect(() => {
        fetchPostCardSetSearch({ search }).then(r => setCardSets(r))
    }, [search])

    function renderFlashcards(){
        return cardSets.flashcards && cardSets.flashcards.map(flashcard => {
            return <div>{flashcard.term}</div>
        })
    }

    console.log(cardSets);
       return (
           <div className='w-full'>
            {cardSets.map((cardSet, idx) => {
                console.log(cardSet)
                return (
                    <div key={idx}>
                        <div>
                            <div>{cardSet.name}</div>
                            <div>{cardSet.first_name}</div>
                            <div>{cardSet.flashcards_count}</div>
                        </div>
                        <div className="flex">
                           {/* {renderFlashcards()}  */}
                           {cardSet.flashcards.map((flashcard, idx) => <div key={idx}>{flashcard.term}</div>)}
                        </div>
                    </div>
                )
            })}
           </div>
       )
}

