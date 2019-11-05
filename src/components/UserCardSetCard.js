import React from 'react'
import { Link } from "react-router-dom";

export default function UserCardSetCard(props){
        const { idx, cardSet, handleChecked } = props
       return (
         <div key={idx} className="flex justify-center">
           <div className={`w-full my-2 px-4`}>
             <div
               className={`h-20 w-full rounded-sm overflow-hidden home-latest ${
                 cardSet.checked ? "shadow-inner border-2 border-blue-700" : ""
               }`}
             >
               <div
                 onClick={() => handleChecked(cardSet)}
                 className="flex w-full h-full bg-white items-center shadow-xl"
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
                 <Link
                   className="h-full w-full"
                   to={`/card-sets/${cardSet.card_set_id}`}
                 >
                   <div
                     className="h-full text-2xl ml-24 flex justify-start"
                     key={idx}
                   >
                     <div>{cardSet.name}</div>
                   </div>
                 </Link>
                 {/* )} */}
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

