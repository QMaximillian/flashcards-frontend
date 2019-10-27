import React, { useState, useEffect } from 'react'
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
                  <div className="py-2">
                      {recentCardSets.map((cardSet, i) => {
                        return <HomeLatestCard key={i} cardSet={cardSet}/>
                      })}
                  </div>
            </div>
       )
}