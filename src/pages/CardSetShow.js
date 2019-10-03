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


  useEffect(() => {
    console.log('idx', idx)
  }, [idx])

      return !isLoading ? (
        <div>
          <div className="text-4xl">{flashcards[idx].name}</div>
          <div className="flex flex-col items-center">
            <div className="h-64 w-3/4 flex justify-center items-center">
              <Card
                flashcardFront={flashcards[idx].term}
                flashcardBack={flashcards[idx].definition}
              />
            </div>
            <div onClick={nextBoundingCheck}>Next</div>
            <div onClick={previousBoundingCheck}>Previous</div>
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
      {flipped ? null : (
        <animated.div
          className="border-2 shadow-lg border-green-400 h-full w-full flex justify-center items-center"
          style={{
            opacity: opacity.interpolate(o => 1 - o),
            transform
            // position: "absolute"
          }}
        >
          <div className="text-2xl">{flipped ? null : props.flashcardFront}</div>
        </animated.div>
      )}
      {flipped ? (
        <animated.div
          className="border-2 shadow-lg border-green-400 h-full w-full flex justify-center items-center"
          style={{
            opacity,
            transform: transform.interpolate(t => `${t} rotateX(180deg)`)
            // position: "absolute"
          }}
        >
          <div className="text-2xl">{props.flashcardBack}</div>
        </animated.div>
      ) : null}
    </div>
  );
}
