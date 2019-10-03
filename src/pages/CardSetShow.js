import React, { useEffect, useState } from 'react'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'
import { useSpring, animated } from "react-spring";

export default function CardSetShow(props){
  const [isLoading, setIsLoading] = useState(true)
  const [flashcards, setFlashcards] = useState([])
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    fetchGetCardSetShow(props.match.params.id)
    .then(r => setFlashcards(r))
    .then(r => setIsLoading(false))
  }, [props.match.params.id])

  function nextBoundingCheck() {
    if (idx >= flashcards.length - 1) return;
    setIdx(idx + 1);
  }
  function previousBoundingCheck(cb) {
    if (idx <= 0) return;
    setIdx(idx - 1)
  }


  // useEffect(() => {
  //   console.log('idx', idx)
  // }, [idx])

      return !isLoading ? (
        <div>
          <div className="text-4xl font-bold text-gray-700 opacity-50">{flashcards[idx].name}</div>
          <div className="flex flex-col items-center justify-between">
            <div className="h-64 w-3/4 flex justify-center items-center">
              <Card
                flashcardFront={flashcards[idx].term}
                flashcardBack={flashcards[idx].definition}
              />
            </div>
            <div className="flex justify-center w-3/4 h-12 flex justify-center items-center">
              <div
                onClick={previousBoundingCheck}
                className="mx-10 hover:text-orange-500"
              >
                <i className="fas fa-arrow-left"></i>
              </div>
              <div
                onClick={nextBoundingCheck}
                className="mx-10 hover:text-orange-500"
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
    <div
      onClick={() => set(state => !state)}
      className="relative w-full h-full justify-center items-center flex"
    >
      {flipped ? (
        <animated.div
          className="shadow-xl h-full w-full flex justify-center items-center"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
          }}
        >
          <div className="text-2xl">{props.flashcardBack}</div>
        </animated.div>
      ) : (
        <animated.div
          className="shadow-xl h-full w-full flex justify-center items-center"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform
          }}
        >
          <div className="text-2xl">{props.flashcardFront}</div>
        </animated.div>
      )}
    </div>
  );
}
