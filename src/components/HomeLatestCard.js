import React from 'react'
import PropTypes from "prop-types";

export default function HomeLatestCard(props){

  const { name, flashcards_count, owner } = props.cardSet
  console.log(props.cardSet)
       return (
         <div className="h-full w-full border border-gray-500 shadow-lg rounded">
           <div className="h-full w-full home-latest pl-4 pt-6">
             <div className="text-base font-semibold">{name}</div>
             <div className="opacity-50 text-sm">{flashcards_count} terms</div>
             <div className="">{owner}</div>
             {/* <div className="w-full h-2 border border-black group-hover:bg-orange-500"></div> */}
           </div>
         </div>
       );
}



HomeLatestCard.defaultProps = {
  cardSet: {
    name: '',
    flashcards_count: 0,
    owner: ''
  }
};

HomeLatestCard.propTypes = {
  cardSet: PropTypes.shape({
    name: PropTypes.string,
    flashcards_count: PropTypes.number,
    owner: PropTypes.string
  })
};