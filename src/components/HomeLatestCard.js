import React from 'react'
import PropTypes from "prop-types";

export default function HomeLatestCard(props){

       return (
         <div className="h-40 w-64 border border-black">
           <div className="h-full w-full border border-transparent hover:border-b-8 hover:border-orange-400">
             <div className="text-base font-semibold">{props.cardSetName}</div>
             <div className="opacity-50 text-sm">{props.termCount} terms</div>
             <div className="">{props.owner}</div>
             <div className="w-full h-2 border hover:bg-orange-500"></div>
           </div>
         </div>
       );
}



HomeLatestCard.defaultProps = {
  cardSetName: '',
  termCount: 0,
  owner: ''
};

HomeLatestCard.propTypes = {

  cardSetName: PropTypes.string,
  termCount: PropTypes.number,
  owner: PropTypes.string  
};