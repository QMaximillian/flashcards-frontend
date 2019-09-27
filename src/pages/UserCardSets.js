import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchGetCardSetIndex } from '../fetchRequests/cardSets'
import TextBox from '../components/TextBox'

export default function UserCardSets(props){
    const [cardSets, setCardSets] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    // const memoizedCallback = React.useCallback(() => {
    //   if (editMode === false) {
    //     const updatedCardSets = [...cardSets].map(mappedCardSet => {
    //       return { ...mappedCardSet, checked: false };
    //     });
    //     setCardSets(updatedCardSets);
    //   }
    // }, [editMode, cardSets])
    
    
    useEffect(() => {
        fetchGetCardSetIndex().then(r => {
          const sanitizeResults = r.map(e => ({checked: false, ...e}))
          return sanitizeResults
        }).then(r => setCardSets(r))
    }, [])




    function handleChecked(cardSet){
        const updatedCardSets = cardSets.map(mappedCardSet => {
          if (mappedCardSet.id === cardSet.id) {
            return { ...mappedCardSet, checked: !mappedCardSet.checked };
          } else {
            return mappedCardSet;
          }
        });
        setCardSets(updatedCardSets);
    }

       return (
         <div className="w-full border-yellow-500 border">
           <div onClick={() => setEditMode(!editMode)}>EDIT MODE: {editMode ? 'On' : "Off"}</div>
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
                 <div
                   key={idx}
                   className={`w-1/2 max-w-lg my-4 px-4 ${
                     cardSet.checked ? "border-4 border-green-500" : ""
                   }`}
                 >
                   <div className="h-40 w-full rounded overflow-hidden border-teal-500 border shadow-lg">
                     <div onClick={() => handleChecked(cardSet)} className="flex w-full h-full items-center border-red-500 border">
                       {/* <input
                         onChange={() => handleChecked(cardSet)}
                         className="ml-4 self-center"
                         type="checkbox"
                         checked={cardSet.checked}
                       /> */}
                       {editMode ? (
                         <div className="h-full text-2xl ml-20 " key={idx}>
                           {cardSet.name}
                         </div>
                       ) : (
                         <Link
                           className="h-full w-full"
                           to={`/card-sets/${cardSet.id}`}
                         >
                           <div className="h-full text-2xl ml-20 " key={idx}>
                             {cardSet.name}
                           </div>
                         </Link>
                       )}
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
         </div>
       );
            }
