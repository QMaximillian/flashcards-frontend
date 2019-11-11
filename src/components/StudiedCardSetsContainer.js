import React, { useState, useEffect } from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import { fetchGetStudiedCardSets } from "../fetchRequests/cardSets";

export default function StudiedCardSetsContainer(props){

    const [cardSets, setCardSets] = useState([])
    useEffect(() => {
        fetchGetStudiedCardSets()
            .then(r => setCardSets(r))
    }, [])

    function renderCardSets(){
        return cardSets.map((cardSet, idx) => {
          return (
            <div key={idx}>
                <UserCardSetCard studied={true} cardSet={cardSet} />
            </div>
          );
        })
    }
       return (
           <div>
             {renderCardSets()}
           </div>
       )
}

