import React from 'react'
import { Link } from 'react-router-dom'

export default function FlashcardsNavDrawer(props){

       return (
           <div>
						 <div className="text-sm opacity-25">Study</div>
               <Link to="#">
									Flashcards
							 </Link>
           </div>
       )
}

