import React from 'react'
import { Link } from 'react-router-dom'
export default function NavDrawer(props){

       return (
         <div className="flex flex-col shadow-lg h-full w-full justify-start">
           <Link to="/home">
             <div className="h-10 w-full border border-black items-center flex justify-center">
               <div>Home</div>
             </div>
           </Link>
           <Link to="/card-sets">
             <div className="h-10 w-full border border-black items-center flex justify-center">
               <div>Card Sets</div>
             </div>
           </Link>
         </div>
       );
}

