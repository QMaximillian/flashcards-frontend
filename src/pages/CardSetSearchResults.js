import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPostCardSetSearch } from '../fetchRequests/cardSets'

export default function CardSetSearchResults(props){

    const [cardSets, setCardSets] = useState([])

    let { search } = useParams()

    useEffect(() => {
        fetchPostCardSetSearch({ search }).then(r => setCardSets(r))
    }, [search])

    console.log(cardSets);
       return (
           <div className='w-full'>
            {cardSets.map((cardSet, i) => {
                console.log(cardSet)
                return (
                    <div key={i}>
                        {cardSet.name}
                    </div>
                )
            })}
           </div>
       )
}

