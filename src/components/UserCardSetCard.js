import React from 'react'
import { Link } from "react-router-dom";

export default function UserCardSetCard(props){
        const { idx, cardSet, studied = false } = props

      function renderStudiedCard(){
        return (
          <div className="px-4 search border-0 border-black h-16 bg-white w-full border-t-2 border-pink-100">
            <div className="flex h-full justify-around items-center">
              <div>Learn</div>
              <Link to={`/card-sets/${cardSet.card_set_id}`}>
                <div>Flashcards</div>
              </Link>
              <div>Write</div>
              <div>Spell</div>
              <div>Test</div>
              <div>Match</div>
              <div>Gravity</div>
            </div>
          </div>
        );
      }
       return (
         <div key={idx} className="flex justify-center">
           <div className={`w-full my-2 px-4`}>
             <div
               className={`w-full rounded-sm overflow-hidden home-latest ${
                 cardSet.checked ? "shadow-inner border-2 border-blue-700" : ""
               } 
               ${studied ? "h-40" : "h-20 "}
               `}
             >
               <div
                 //  onClick={() => handleChecked(cardSet)}
                 className="flex flex-col w-full h-full bg-white items-center shadow-xl"
               >
                 {/* <input
                            onChange={() => handleChecked(cardSet)}
                            className="ml-4 self-center"
                            type="checkbox"
                            checked={cardSet.checked}
                          /> */}
                 {/* {editMode ? (
                              <div
                                className="h-full w-full text-2xl ml-24"
                                key={idx}
                              >
                                <div>{cardSet.name}</div>
                              </div>
                            ) : ( */}
                 <div className="py-2 h-20 ml-5 flex w-full justify-start" key={idx}>
                   <Link
                     className="h-full w-full"
                     to={`/card-sets/${cardSet.card_set_id}`}
                   >
                     <div className="flex px-2 items-center">
                       <div className="pr-2 text-sm text-gray-700">
                         {cardSet.flashcards_count} Terms
                       </div>
                       <div className="pl-2 border-yellow-500 border-l-2 text-sm text-teal-500">
                         {cardSet.creator_name}
                       </div>
                     </div>
                     <div className="mt-1 pl-2 text-xl font-medium">
                       {cardSet.name}
                     </div>
                   </Link>
                 </div>
                 {studied ? renderStudiedCard() : null}
               </div>
             </div>
           </div>
           {/* {editMode && (
                        <div className="flex flex-col justify-center text-2xl text-gray-500 text-transparent hover:text-gray-500">
                          <i
                            data-id={cardSet.id}
                            onClick={handleDelete}
                            className="fas fa-times hover:border-black opacity-50 hover:opacity-100"
                            style={{ WebkitTextStroke: "2px grey" }}
                          ></i>
                        </div>
                      )} */}
         </div>
       );
}

