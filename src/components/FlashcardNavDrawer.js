import React from 'react'
import { Link } from 'react-router-dom'

export default function FlashcardsNavDrawer(props){

  const flashcardCategories = [
    {
      name: "Flashcards",
    },
    {
      name: "Learn",
    },
    {
      name: "Write",
    },
    {
      name: "Spell",
    },
    {
      name: "Test",
    },
  ]

  function renderStudyTopic() {
    return flashcardCategories.map((category, idx) => {
      if (idx === 0) {
        return (
          <Link key={idx} className="pt-2 pl-4 text-lg mb-6" to="#">
            Flashcards
          </Link>
        );
      } else {
        return (
          <Link key={idx} className="pl-4 text-lg opacity-25 cursor-not-allowed mb-6" to="#">
            {category.name}
          </Link>
        );
      }
    })
  }
       return (
         <div>
           {/* <Link to="/">
             <div className="h-10 w-full flex text-2xl">
               <div>Home</div>
             </div>
           </Link> */}
           <div className="flex flex-col">
             <div className="pl-2 text-sm opacity-25">STUDY</div>
             {/* <Link className="pt-2 pl-4 text-lg" to="#">
               Flashcards
             </Link>
             <Link
               className="pl-4 text-lg opacity-25 cursor-not-allowed"
               to="#"
             >
               Learn
             </Link>
             <Link
               className="pl-4 text-lg opacity-25 cursor-not-allowed"
               to="#"
             >
               Write
             </Link>
             <Link
               className="pl-4 text-lg opacity-25 cursor-not-allowed"
               to="#"
             >
               Spell
             </Link>
             <Link
               className="pl-4 text-lg opacity-25 cursor-not-allowed"
               to="#"
             >
               Test
             </Link> */}
             {renderStudyTopic()}
           </div>
         </div>
       );
}

