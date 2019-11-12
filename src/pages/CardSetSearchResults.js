import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserCardSetCard from '../components/UserCardSetCard'
import { fetchPostCardSetSearch } from '../fetchRequests/cardSets'


export default function CardSetSearchResults(props){

    const [cardSets, setCardSets] = useState([])

    let { search } = useParams()

    useEffect(() => {
        fetchPostCardSetSearch({ search }).then(r => setCardSets(r))
    }, [search])

    // function renderFlashcards(){
    //     return cardSets.flashcards && cardSets.flashcards.map(flashcard => {
    //         return <div>{flashcard.term}</div>
    //     })
    // }

    console.log(cardSets);
       return (
           <div className='w-full'>
            {cardSets.map((cardSet, idx) => {
                console.log(cardSet)
                return (
                  <div key={idx}>
                      <UserCardSetCard cardSet={cardSet} searchCard={true}/>
                  </div>
                );
            })}
           </div>
       )
}

