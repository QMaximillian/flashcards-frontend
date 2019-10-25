import React from 'react'
import PropTypes from "prop-types";

export default function HomeLatestCard(props){

       return (
         <div className="h-40 w-64 border border-gray-500 shadow-lg rounded">
           <div className="h-full w-full home-latest">
             <div className="text-base font-semibold">{props.cardSetName}</div>
             <div className="opacity-50 text-sm">{props.termCount} terms</div>
             <div className="">{props.owner}</div>
             {/* <div className="w-full h-2 border border-black group-hover:bg-orange-500"></div> */}
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