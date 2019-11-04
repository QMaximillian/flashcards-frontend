import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {
  fetchGetUserCardSetsIndex,
  fetchDeleteCardSets
} from "../fetchRequests/cardSets";
import TextBox from '../components/TextBox'

import '../styles/index.css'
// import UserInfoCard from '../components/UserInfoCard'

export default function UserCardSets(props){

    const [cardSets, setCardSets] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [filter, setFilter] = useState('Latest')
    const [search, setSearch] = useState({name: '', value: '', isValid: true})
    const [initialCardState, setInitialCardState] = useState([])

    useEffect(() => {
      if (!editMode) {
       setCardSets(initialCardState)
      }
      // if (editMode) {
      //   setSearch({ name: "", value: "", isValid: true });
      // }
    }, [editMode, initialCardState])

    useEffect(() => {
        fetchGetUserCardSetsIndex()
          .then(r => addCheckedProperty(r))
          .then(r => {
            setCardSets(r);
            setInitialCardState(r);
          });
    }, [])

    // useEffect(() => {
    //   console.log(cardSets)
    // }, [cardSets])

    function addCheckedProperty(array){
      return array.map(obj => ({ checked: false, ...obj }))
    }

    function handleBatchDelete(){
      cardSets.forEach(cardSet => {
        if (cardSet.checked) {
          return fetchDeleteCardSets(cardSet.id).then(r => console.log(r))
        }
      })
    }

    function handleDelete(event){
      return fetchDeleteCardSets(event.target.dataset.id).then(r => console.log(r));
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

    // function filterType(){
    //   switch(filter){

    //   }
    // }

    function selectFilter(a, b){
        if (filter === "Latest") {
          if (a.last_seen_at > b.last_seen_at) {
            return -1;
          } else if (a.last_seen_at < b.last_seen_at) {
            return 1;
          }
        }

        if (filter === "Alphabetical") {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
        }
        return 0;
    }
    function renderCardSets() {
      return cardSets
                .filter(cardSet => cardSet.name.match(search.value))
                .sort((a, b) => selectFilter(a, b))
                .map((cardSet, idx) => {
                  console.log('cardSet', cardSet)
                  return (
                    <div key={idx} className="flex justify-center">
                      <div className={`w-full my-2 px-4`}>
                        <div
                          className={`h-20 w-full rounded-sm overflow-hidden ${
                            cardSet.checked
                              ? "shadow-inner border-2 border-blue-700"
                              : ""
                          }`}
                        >
                          <div
                            onClick={() => handleChecked(cardSet)}
                            className="flex w-full h-full bg-white items-center shadow-xl"
                          >
                            {/* <input
                            onChange={() => handleChecked(cardSet)}
                            className="ml-4 self-center"
                            type="checkbox"
                            checked={cardSet.checked}
                          /> */}
                            {editMode ? (
                              <div
                                className="h-full w-full text-2xl ml-24"
                                key={idx}
                              >
                                <div>{cardSet.name} {cardSet.last_seen_at}</div>
                              </div>
                            ) : (
                              <Link
                                className="h-full w-full"
                                to={`/card-sets/${cardSet.id}`}
                              >
                                <div
                                  className="h-full text-2xl ml-24 flex justify-start"
                                  key={idx}
                                >
                                  <div>{cardSet.name}</div>
                                </div>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      {editMode && (
                        <div className="flex flex-col justify-center text-2xl text-gray-500 text-transparent hover:text-gray-500">
                          <i
                            data-id={cardSet.id}
                            onClick={handleDelete}
                            className="fas fa-times hover:border-black opacity-50 hover:opacity-100"
                            style={{ WebkitTextStroke: "2px grey" }}
                          ></i>
                        </div>
                      )}
                    </div>
                  );
                })

    }

       return (
         <div className="border border-black w-full">
           <div onClick={() => setEditMode(!editMode)}>
             EDIT MODE: {editMode ? "On" : "Off"}
           </div>
           <div className="flex w-full border border-black justify-between mb-4">
             <div className="w-full flex text-sm justify-start ml-2">
               <div className="self-center text-sm">SORT</div>
               <select className="ml-4" onChange={(e) => setFilter(e.target.value)} value={filter}>
                 <option value="Latest">Latest</option>
                 <option value="Alphabetical">Alphabetical</option>
               </select>
             </div>
             <TextBox
               name="search-bar"
               type="text"
               value={search.value}
               onChange={setSearch}
               placeholder={"Filter"}
             />
           </div>
           <div>
             <div onClick={handleBatchDelete}>Delete Selected</div>
           </div>
           <div className="overflow-y-auto justify-center">
             {renderCardSets()}
           </div>
         </div>
       );

            }
