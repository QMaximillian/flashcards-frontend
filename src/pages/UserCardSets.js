import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { fetchGetCardSetIndex, fetchDeleteCardSets } from '../fetchRequests/cardSets'
import TextBox from '../components/TextBox'

export default function UserCardSets(props){
    const [cardSets, setCardSets] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [initialCardState, setInitialCardState] = useState([])
 

    useEffect(() => {
      if (!editMode) {
       setCardSets(initialCardState)
      }
    }, [editMode, initialCardState])
    
    
    useEffect(() => {
        fetchGetCardSetIndex()
        .then(r => addCheckedProperty(r))
        .then(r => {
          setCardSets(r)
          setInitialCardState(r)
        })
    }, [])

    useEffect(() => {
      console.log(cardSets)
    }, [cardSets])


    function addCheckedProperty(array){
      return array.map(obj => ({ checked: false, ...obj }))
    }
    
    function handleDelete(){
      cardSets.forEach(cardSet => {
        if (cardSet.checked) {
          return fetchDeleteCardSets(cardSet.id).then(r => console.log(r))
        }
      })

    }

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
         <div className="w-full border-orange-500 border">
           <div onClick={() => setEditMode(!editMode)}>
             EDIT MODE: {editMode ? "On" : "Off"}
           </div>
           <TextBox
             name="search-bar"
             type="text"
             value={search.value}
             onChange={setSearch}
             placeholder={"Filter Search"}
           />
           <div>
             <div onClick={handleDelete}>Delete Selected</div>
           </div>
           <div className="flex flex-col border-black border overflow-hidden justify-center">
             {cardSets
                .filter(cardSet => cardSet.name.match(search.value))
                .map((cardSet, idx) => {
                  return (
                    <div key={idx} className={`w-full max-w-lg my-2 px-4`}>
                      <div
                        className={`h-20 w-full rounded-sm overflow-hidden ${
                          cardSet.checked
                            ? "shadow-inner border-2 border-blue-700"
                            : ""
                        }`}
                      >
                        <div
                          onClick={() => handleChecked(cardSet)}
                          className="flex w-full h-full items-center border-black border"
                        >
                          {/* <input
                            onChange={() => handleChecked(cardSet)}
                            className="ml-4 self-center"
                            type="checkbox"
                            checked={cardSet.checked}
                          /> */}
                          {editMode ? (
                            <div className="h-full w-64 text-2xl ml-24" key={idx}>
                              <div>{cardSet.name}</div>
                            </div>
                          ) : (
                            <Link
                              className="h-full w-64"
                              to={`/card-sets/${cardSet.id}`}
                            >
                              <div className="h-full text-2xl ml-24" key={idx}>
                                <div>{cardSet.name}</div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              }
           </div>
         </div>
       );
       
            }
