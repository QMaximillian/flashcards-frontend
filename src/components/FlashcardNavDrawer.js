import React from 'react'
import { Link } from 'react-router-dom'

export default function FlashcardsNavDrawer(props){

       return (
         <div>
           <Link to="/home">
             <div className="h-10 w-full flex text-2xl">
               <div>Home</div>
             </div>
           </Link>
           <div className="text-sm opacity-25">Study</div>
           <Link to="#">Flashcards</Link>
         </div>
       );
}

