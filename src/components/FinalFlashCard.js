import React from 'react'
import PropTypes from "prop-types";



export default function FinalFlashCard(props){
    const { cardSetLength, handleReset } = props
       return (
         <div className="flex flex-col items-center justify-between">
           <div className="text-3xl">Nice Work</div>
           <div>You just studied {cardSetLength + 1} terms</div>
           <div className='text-green-500' onClick={handleReset}>Study with Flashcards again</div>
         </div>
       );
}

FinalFlashCard.propTypes = {
    cardSetLength: PropTypes.number,
    handleReset: PropTypes.func
}

FinalFlashCard.defaultProps = {
    cardSetLength: 0,
    handleReset: () => {}
}
