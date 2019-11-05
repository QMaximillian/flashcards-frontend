import React, { useEffect, useState } from 'react'
import {
  fetchGetUserCardSetsIndex,
  fetchDeleteCardSets
} from "../fetchRequests/cardSets";
import TextBox from '../components/TextBox'
import UserCardSetCard from '../components/UserCardSetCard'
import { 
  isThisWeek, 
  parseISO, 
  getMonth, 
  subMonths,
  format 
} from 'date-fns'
import '../styles/index.css'

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


    function selectFilter(a, b){
        if (filter === "Latest") {
          if (new Date(a.created_at) > new Date(b.created_at)) {
            return -1;
          } else if (new Date(a.created_at) < new Date(b.created_at)) {
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
      let withinWeekFlag = true;
      let month;
      let cutOffMonth;
      
      return cardSets
                .filter(cardSet => cardSet.name.match(search.value))
                .sort((a, b) => selectFilter(a, b))
                .map((cardSet, idx) => {

                  // console.log('cardSet', cardSet)
                if (filter === 'Latest') {
                  if (isThisWeek(parseISO(cardSet.created_at))) {
                    console.log("isThisWeek", cardSet.created_at, cardSet.name);
                      if (withinWeekFlag) {
                      // console.log("test", cardSet.created_at, cardSet.name);
                        month = getMonth(parseISO(cardSet.created_at))
                        cutOffMonth = month - 2
                        withinWeekFlag = false;

                        return (
                          <div className="w-full flex flex-col">
                            <div className="flex w-full items-center px-4">
                              <div className="text-xs w-32">THIS WEEK</div>
                              <hr className="border border-black w-full" />
                            </div>
                            <UserCardSetCard
                              idx={idx}
                              cardSet={cardSet}
                              handleChecked={handleChecked}
                            />
                          </div>
                        );
                      }
                    
                      if (!withinWeekFlag) {
                        return (
                          <UserCardSetCard
                            idx={idx}
                            cardSet={cardSet}
                            handleChecked={handleChecked}
                          />
                        );
                      }
                  }

                  // console.log('here')
                  
                  if (month !== getMonth(parseISO(cardSet.created_at))) {
                                    // console.log("month", month);
                                    // console.log("getMonth", getMonth(parseISO(cardSet.created_at)))
                    month = month - 1

                    return (
                      <div className="w-full flex flex-col">
                        <div className="flex w-full items-center px-4">
                          <div className="text-xs w-32 text-center">{getMonth(parseISO(cardSet.created_at)) < cutOffMonth ? 'Prior' : format(parseISO(cardSet.created_at), 'MMMM yyyy')}</div>
                          <hr className="border border-black w-full" />
                        </div>
                        <UserCardSetCard
                          idx={idx}
                          cardSet={cardSet}
                          handleChecked={handleChecked}
                        />
                      </div>
                    );
                  }
                  // } else if (month === getMonth(parseISO(cardSet.created_at))) {
                  //   // month = getMonth(
                  //   //   subMonths(parseISO(cardSet.created_at), 1)
                  //   // );
                  //   return (
                  //     <UserCardSetCard
                  //       idx={idx}
                  //       cardSet={cardSet}
                  //       handleChecked={handleChecked}
                  //     />
                  //   )
                  // }
                

                    
                // }
                return (
                      <UserCardSetCard
                        idx={idx}
                        cardSet={cardSet}
                        handleChecked={handleChecked}
                      />
                    );
                
                }
              })
            }


       return (
         <div className="border border-black w-full">
           {/* <div onClick={() => setEditMode(!editMode)}>
             EDIT MODE: {editMode ? "On" : "Off"}
           </div> */}
           <div className="flex w-full border border-black justify-between mb-4">
             <div className="w-full flex text-sm justify-start ml-2">
               <div className="self-center text-xs">SORT</div>
               <select className="ml-4 h-12 w-32 border-gray-500 border rounded-none" style={{textAlignLast: 'center'}} onChange={(e) => setFilter(e.target.value)} value={filter}>
                 <option className="h-12 w-32" value="Latest">Latest</option>
                 <option className="h-12 w-32" value="Alphabetical">Alphabetical</option>
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
             {/* <div onClick={handleBatchDelete}>Delete Selected</div> */}
           </div>
           <div className="overflow-y-auto justify-center">
             {renderCardSets()}
           </div>
         </div>
       );

            }
