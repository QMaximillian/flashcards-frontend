import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchGetCardSetIndex } from '../fetchRequests/cardSets'
import TextBox from '../components/TextBox'

export default function UserCardSets(props){
    const [cardSets, setCardSets] = useState([])
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    
    useEffect(() => {
        fetchGetCardSetIndex().then(r => {
          const sanitizeResults = r.map(e => ({checked: false, ...e}))
          return sanitizeResults
        }).then(r => 
            setCardSets(r))
            

    }, [])

    // useEffect(() => {
    //   console.log("cardSets", cardSets);
    // }, [cardSets])
    
    // function handleChecked(cardSet, idx){
    //   if (cardSet[idx].checked) {
    //     cardSet.checked = false
    //   } else {
    //     cardSet.checked = true
    //   }
    // }
       return (
         <div className="w-full border-yellow-500 border">
           <TextBox
             name="search-bar"
             type="text"
             value={search.value}
             onChange={setSearch}
             placeholder={"Title"}
           />
           <div className="flex flex-wrap border-orange-500 border overflow-hidden justify-center">
             {cardSets.map((cardSet, idx) => {
               console.log(cardSet.checked)
               return (
                 <div  className="w-1/2 max-w-lg my-4 px-4">
                   <div className="h-40 rounded overflow-hidden border-teal-500 border shadow-lg">
                     <div className="mx-4 items-center border-red-500 border">
                       <input
                       onChange={(e) => {
                         const updateCardSets = cardSets.map(updaterCardSet => {

                           if (updaterCardSet.id === cardSets[idx].id) {
                             return {...updaterCardSet, checked: !updaterCardSet.checked}
                           } else {
                             return updaterCardSet
                           }
                           
                         })
                         setCardSets(updateCardSets);

                       }}
                         className="ml-4 self-center"
                         type="checkbox"
                         checked={cardSet.checked}
                       ></input>
                       <Link to={`/card-sets/${cardSet.id}`}>
                         <div className="text-2xl ml-20 " key={idx}>
                           {cardSet.name}
                         </div>
                       </Link>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
         </div>
       );
}

