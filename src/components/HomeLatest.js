import React, { useEffect } from 'react'
import HomeLatestCard from './HomeLatestCard'

export default function HomeLatest(props){

    // useEffect(() => {
        
    // })

    const fakeData = [
      { owner: "Quinn", termCount: 5, cardSetName: "Booo" },
      { owner: "Man", termCount: 2, cardSetName: "Skim" },
      { owner: "Saa", termCount: 3, cardSetName: "Whole" }
    ];

       return (
           <div>
             {fakeData.map(obj => {
                return (
                  <div className="py-2">
                      <HomeLatestCard owner={obj.owner} termCount={obj.termCount} cardSetName={obj.cardSetName}/>
                  </div>
                )
             }
             )}
            </div>
       )
}