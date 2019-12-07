import React from 'react'

export default function TermsInSet(props){

       return (
        
           <div>
              <div className="mx-4 font-bold mb-6 text-lg">Terms in this set ({props.flashcards.length})</div>
             {props.flashcards.map((flashcard, idx) => {
               return (
                 <div key={idx} className="p-5 bg-white shadow-xl mb-4 mx-4 h-32 flex flex-col justify-end">
                    <div className="mb-4">{flashcard.term}</div>
                    <div className="">{flashcard.definition}</div>
                 </div>
               );
             })}
           </div>
       );
}


