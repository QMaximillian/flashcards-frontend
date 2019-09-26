import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchGetCardSetIndex } from '../fetchRequests/cardSets'

export default function UserCardSets(props){
    const [cardSets, setCardSets] = useState([])
    useEffect(() => {
        fetchGetCardSetIndex().then(r => setCardSets(r));
        console.log('here')
    }, [])
    
       return (
           <div>
               {cardSets.map((cardSet, idx) => {
                   return (
                     <Link to={`/card-sets/${cardSet.id}`}>
                       <div key={idx}>{cardSet.name}</div>
                     </Link>
                   );
               })}
           </div>
       )
}

