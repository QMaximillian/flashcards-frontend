import React, { useEffect } from 'react'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'

export default function CardSetShow(props){
      
  useEffect(() => {

    fetchGetCardSetShow(props.match.params.id).then(r => console.log(r))
  }, [props])

       return (
           <div>
             CardSetShow
           </div>
       )
}

