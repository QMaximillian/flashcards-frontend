import React, { useState, useEffect } from 'react'
import UserCardSetCard from '../components/UserCardSetCard'
import { fetchGetStudiedCardSets } from "../fetchRequests/cardSets";
import { addTimeIntervals } from "../lib/helpers";


export default function StudiedCardSetsContainer(props){

    const [cardSets, setCardSets] = useState([])
    useEffect(() => {
        fetchGetStudiedCardSets()
            .then(r => setCardSets(r))
    }, [])

    function renderCardSets(){
        // return cardSets.map((cardSet, idx) => {
        //   return (
        //     <div key={idx}>
        //         <UserCardSetCard studied={true} cardSet={cardSet} />
        //     </div>
        //   );
        // })
        if (cardSets.length === 0) { return <div>THERE ARE NO STUDIED CARD SETS</div> }
        return addTimeIntervals(cardSets, UserCardSetCard, 'last_studied_at', {studied: true});
    }
       return (
           <div>
             {renderCardSets()}
           </div>
       )
}

