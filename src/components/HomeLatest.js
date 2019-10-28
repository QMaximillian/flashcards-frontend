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
         <div>
           <div className="py-2 mx-2">
             <div className="flex mb-4 h-64">
               <div>Hello</div>
             </div>
             <div className="flex flex-col mb-4 w-full bg-gray-100">
               <Link to="/card-sets" className="justify-between flex">
                 <div className="mb-4">RECENT</div>
                 <div className="mb-4">View All ></div>
               </Link>
               {recentCardSets.map((cardSet, i) => {
                 return (
                   <div className="w-full h-40 my-2">
                     <HomeLatestCard key={i} cardSet={cardSet} />
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
       );
}