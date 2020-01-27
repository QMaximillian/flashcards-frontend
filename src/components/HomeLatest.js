import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import HomeLatestCard from './HomeLatestCard'
import { fetchGetRecentCardSets } from '../fetchRequests/cardSets'
import UserCardSetCard from './UserCardSetCard'
import NoItemsCard from './NoItemsCard'
import { addTimeIntervals } from '../lib/helpers'
import { UserContext } from '../context/user-context'

export default function HomeLatest(props){
    const [recentCardSets, setRecentCardSets] = useState([])
    const [error, setError] = useState(null)

    let { user } = useContext(UserContext)
    
    useEffect(() => {
      fetchGetRecentCardSets(props.limit)
        .then(r => setRecentCardSets(r))
        .catch(error => setError(error.message));
    }, [props.limit]);

    useEffect(() => {
      console.log('1', recentCardSets.length)
    }, [recentCardSets])


    // if (error) throw new Error(error)
    // if (recentCardSets.length === 0) return "Loading..."
    if (props.pageType === 'HOME' || !props.pageType) {
       return (
         <div className="py-10 px-8">
           <div className="flex  mb-4 w-full justify-between">
             <div className="mb-4">RECENT</div>
             <Link to={`/${user.username}`} className="flex">
               <div className="mb-4 flex hover:text-yellow-500 text-teal-500">
                 <div className="">View all</div>
                 <i className="ml-2 fas fa-chevron-right self-center text-sm"></i>
               </div>
             </Link>
           </div>
          
           <div className="flex flex-wrap">
             {recentCardSets.length === 0 ? <div className="h-64 w-full"><NoItemsCard subtitle={"Use the search bar to check some out"} title={"No recently looked at sets!"}/></div> : recentCardSets.map((cardSet, i) => {
               return (
                 <Link
                   to={`/card-sets/${cardSet.id}`}
                   key={i}
                   className="w-1/2 h-40 p-2"
                 >
                   <HomeLatestCard key={i} cardSet={cardSet} pageType="HOME" />
                 </Link>
               );
             })}
           </div>
         </div>
       );
    } else if (props.pageType === 'RECENT') {
  if (recentCardSets.length === 0) {
    return (
      <div className="h-64 w-full">
        <NoItemsCard 
          subtitle={"Use the search bar to check some out"}
          title={"No recently looked at sets!"}
        />
      </div>
    ) 
  }
      const filteredCardSets = recentCardSets
        .filter(cardSet => cardSet.name.toLowerCase().match(props.search.value.toLowerCase()))
        
        return addTimeIntervals(filteredCardSets, UserCardSetCard, 'last_seen_at')
    }
}