import React, { useEffect } from 'react'
import { fetchGetCardSetIndex } from '../fetchRequests/cardSets'

export default function UserCardSets(props){

    useEffect(() => {
        fetchGetCardSetIndex(r => console.log(r))
    }, [])
    
       return (
           <div>
1234    
           </div>
       )
}

