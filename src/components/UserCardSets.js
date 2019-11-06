import React, { useEffect, useState } from 'react'
import {
  fetchGetUserCardSetsIndex,
  // fetchDeleteCardSets
} from "../fetchRequests/cardSets";
import UserCardSetCard from '../components/UserCardSetCard'
import { 
  isThisWeek, 
  parseISO, 
  getMonth, 
  format 
} from 'date-fns'
import '../styles/index.css'

export default function UserCardSets(props){
  const { filter, search } = props

    const [cardSets, setCardSets] = useState([])
    const [editMode, 
      // setEditMode
    ] = useState(false)
    const [initialCardState, setInitialCardState] = useState([])

    useEffect(() => {
      if (!editMode) {
       setCardSets(initialCardState)
      }
    }, [editMode, initialCardState])

    useEffect(() => {
        fetchGetUserCardSetsIndex()
          // .then(r => addCheckedProperty(r))
          .then(r => {
            setCardSets(r);
            setInitialCardState(r);
          });
    }, [])

    // useEffect(() => {
    //   console.log(cardSets)
    // }, [cardSets])


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
    
    function addTimeIntervals(array, Component) {
      let withinWeekFlag = true;
      let month;
      let cutOffMonth;

      return array 
        .filter(cardSet => cardSet.name.toLowerCase().match(search.value.toLowerCase()))
        .sort((a, b) => selectFilter(a, b))
        .map((cardSet, idx) => {
          if (isThisWeek(parseISO(cardSet.created_at))) {
            if (withinWeekFlag) {
              month = getMonth(parseISO(cardSet.created_at));
              cutOffMonth = month - 2;
              withinWeekFlag = false;

              return (
                <div key={idx} className="w-full flex flex-col">
                  <div className="flex w-full items-center px-4">
                    <div className="text-xs w-32">THIS WEEK</div>
                    <hr className="border border-black w-full" />
                  </div>
                  <Component
                    idx={idx}
                    cardSet={cardSet}
                    // handleChecked={handleChecked}
                  />
                </div>
              );
            }

            if (!withinWeekFlag) {
              return (
                <Component
                  key={idx}
                  cardSet={cardSet}
                  // handleChecked={handleChecked}
                />
              );
            }
          }

          if (month !== getMonth(parseISO(cardSet.created_at))) {
            month = month - 1;

            return (
              <div key={idx} className="w-full flex flex-col">
                <div className="flex w-full items-center px-4">
                  <div className="text-xs w-32 text-center">
                    {getMonth(parseISO(cardSet.created_at)) < cutOffMonth
                      ? "Prior"
                      : format(parseISO(cardSet.created_at), "MMMM yyyy")}
                  </div>
                  <hr className="border border-black w-full" />
                </div>
                <Component
                  cardSet={cardSet}
                  // handleChecked={handleChecked}
                />
              </div>
            );
          }

          return (
            <UserCardSetCard
              key={idx}
              cardSet={cardSet}
              // handleChecked={handleChecked}
            />
          );
        })

    }


    function renderCardSets() {
                switch (filter) {
                  case 'Latest': 
                    return addTimeIntervals(cardSets, UserCardSetCard)
                  case 'Alphabetical': 
                    return cardSets
                      .filter(cardSet => cardSet.name.toLowerCase().match(search.value.toLowerCase()))
                      .sort((a, b) => selectFilter(a, b))
                      .map((cardSet, idx) => {
                        return (
                          <UserCardSetCard
                            key={idx}
                            cardSet={cardSet}
                            // handleChecked={handleChecked}
                          />
                        );
                      })
                  default:
                    return
                }
              }



       return (
           <div className="overflow-y-auto justify-center">
             {renderCardSets()}
           </div>
       );

            }
