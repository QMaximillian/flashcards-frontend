import React, { useEffect, useState } from 'react'
// useCallback
import { useTransition, useSpring, animated } from 'react-spring'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'
import FinalFlashCard from '../components/FinalFlashCard'
import PropTypes from "prop-types";

export default function CardSetShow(props){
  const [isLoading, setIsLoading] = useState(true)
  const [flashcards, setFlashcards] = useState([])
  const [count, setCount] = useState(0)
  const [reverse, setReverse] = useState(false)
  

  useEffect(() => {
    fetchGetCardSetShow(props.match.params.id)
    .then(r => setFlashcards([...r, {}]))
    .then(r => setIsLoading(false))
  }, [props.match.params.id])

  const transitions = useTransition([count], item => item, {
    from: {
      opacity: 0,
      position: "absolute",
      width: "100%",
      transform: reverse
        ? "translate3d(-100%, 0, 0)"
        : "translate3d(200%, 0, 0)"
    },
    enter: {
      opacity: 1,
      width: "100%",
      transform: "translate3d(0, 0, 0)"
    },
    leave: {
      opacity: 0,
      width: "100%",
      transform: reverse
        ? "translate3d(200%, 0, 0)"
        : "translate3d(-100%, 0, 0)"
    }
  });

  function nextSlide() {
    if (count >= flashcards.length - 1) return;
    setCount(count + 1);
    setReverse(false)
  }
  function prevSlide() {
    if (count <= 0) return;
    setCount(count - 1);
    setReverse(true)
  }

  function renderCurrentCardFraction(){
    if (flashcards.length - 1 !== count) {
      return `${count + 1}/${flashcards.length - 1}`
    } else {
      return `${flashcards.length - 1}/${flashcards.length - 1}`
    }
  }
  

      return !isLoading ? (
        <div className="w-full">
          <div className="text-4xl font-bold text-gray-700 opacity-50">
            {flashcards[0].name}
          </div>
          <div className="flex-col flex items-center justify-between">
            <div className="border border-black w-full py-4 overflow-hidden flex justify-center">
              <div className="flex relative h-64 w-3/4">
                {transitions.map(({ item, props, key }) => {
                      
                      if (count !== flashcards.length - 1) {
                       return <animated.div key={key} style={props}>
                          <Card
                          key={key}
                          style={props}
                          flashcardFront={flashcards[item].term}
                          flashcardBack={flashcards[item].definition}/>
                        </animated.div>
                      } else {
                        return (
                          <animated.div key={key} style={props}>
                            <FinalFlashCard cardSetLength={flashcards.length-2} handleReset={() => setCount(0)}/>
                          </animated.div>
                        );
                      }
                })}
              </div>
            </div>
            <div className="flex justify-center w-3/4 h-12 flex justify-center items-center">
              <div
                onClick={prevSlide}
                className={`mx-10 ${
                  count === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-orange-500"
                }`}
              >
                <i className="fas fa-arrow-left"></i>
              </div>
              <div>
                {renderCurrentCardFraction()}
              </div>
              <div
                onClick={nextSlide}
                className={`mx-10 ${
                  count === flashcards.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-orange-500"
                }`}
              >
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      );
}


function Card(props) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

    return (
    <div className="h-64 w-3/4" onClick={() => set(state => !state)}>
      <animated.div
        className={`shadow-lg bg-cover flex items-center justify-center h-full w-full border-2 border-black absolute cursor-pointer mx-h-full`}
        style={{
          opacity: opacity.interpolate(o => 0.75 - o),
          transform,
          backgroundImage:
            'url("http://www.allwhitebackground.com/images/2/2279.jpg")'
        }}
      >
        <div className="text-3xl font-light">{props.flashcardFront}</div>
      </animated.div>
      <animated.div
        className={`shadow-lg bg-cover text-gray-800 flex items-center justify-center h-full w-full border-2 border-black absolute cursor-pointer mx-h-full`}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          backgroundImage:
            'url("http://www.allwhitebackground.com/images/2/2279.jpg")'
        }}
      >
        <div className="text-3xl font-light">{props.flashcardBack}</div>
      </animated.div>
    </div>
    )
      }



FinalFlashCard.propTypes = {
    cardSetLength: PropTypes.number,
    handleReset: PropTypes.func
}

FinalFlashCard.defaultProps = {
    cardSetLength: 0,
    handleReset: () => {}
}





