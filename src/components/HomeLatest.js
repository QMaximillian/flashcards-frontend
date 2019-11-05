import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HomeLatestCard from './HomeLatestCard'
import { fetchGetRecentCardSets } from '../fetchRequests/cardSets'

export default function HomeLatest(props){
    const [recentCardSets, setRecentCardSets] = useState([])

    useEffect(() => {
        fetchGetRecentCardSets()
          .then(r => setRecentCardSets(r))
    }, [])

       return (
           <div className="py-10 px-8">
             <div className="flex flex-col mb-4 w-full ">
               <Link to="/card-sets" className="justify-between flex">
                 <div className="mb-4">RECENT</div>
                 <div className="mb-4">View All ></div>
               </Link>
               <div className="flex flex-wrap">
                 {recentCardSets.map((cardSet, i) => {
                   return (
                     <Link
                       to={`/card-sets/${cardSet.id}`}
                       key={i}
                       className="w-1/2 h-40 p-2"
                     >
                       <HomeLatestCard key={i} cardSet={cardSet} />
                     </Link>
                   );
                 })}
               </div>
             </div>
           </div>
       );
}