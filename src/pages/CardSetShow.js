import React, { useEffect, useState, useCallback } from 'react'
import { useTransition, useSpring, animated } from 'react-spring'
import {fetchGetCardSetShow} from '../fetchRequests/cardSets'

export default function CardSetShow(props){
  const [isLoading, setIsLoading] = useState(true)
  const [flashcards, setFlashcards] = useState([])
  const [count, setCount] = useState(0)
  const [reverse, setReverse] = useState(false)
  

  useEffect(() => {
    fetchGetCardSetShow(props.match.params.id)
    .then(r => setFlashcards(r))
    .then(r => setIsLoading(false))
  }, [props.match.params.id])

  const transitions = useTransition([count], item => item, {
    from: {
      opacity: 0,
      position: 'absolute',
      width: '50%',
      transform: reverse
        ? "translate3d(200%, 0, 0)"
        : "translate3d(-100%, 0, 0)"
    },
    enter: {
      opacity: 1,
      width: '50%',
      transform: "translate3d(50%, 0, 0)"
    },
    leave: {
      opacity: 0,
      width: '50%',
      transform: reverse
        ? "translate3d(-100%, 0, 0)"
        : "translate3d(200%, 0, 0)"
    }
  });

  const prevSlide = () => {
    let prevSlide = count - 1 < 0 ? flashcards.length - 1 : count - 1;
    setCount(prevSlide);
    setReverse(true);
  };

  const nextSlide = () => {
    let nextSlide = count + 1 < flashcards.length ? count + 1 : 0;
    setCount(nextSlide);
    setReverse(false);
  };
  

      return !isLoading ? (
        <div>
          <div className="text-4xl font-bold text-gray-700 opacity-50">
            {flashcards[count].name}
          </div>
          <div className="flex-col flex items-center justify-between w-3/4">
            <div className="border border-black w-full py-4 overflow-hidden">
              <div className="flex relative h-64">
                {transitions.map(({ item, props, key }) => {
                  return (
                    <animated.div key={key} style={props}>
                      <Card
                        key={key}
                        style={props}
                        flashcardFront={flashcards[item].term}
                        flashcardBack={flashcards[item].definition}
                      />
                    </animated.div>
                  );
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
    <div className="h-64 w-full" onClick={() => set(state => !state)}>
      <animated.div
        className={`bg-cover flex items-center justify-center h-full w-full border-2 border-black absolute cursor-pointer mx-h-full`}
        style={{
          opacity: opacity.interpolate(o => .75 - o),
          transform
        }}
      >
        <div>{props.flashcardFront}</div>
      </animated.div>
      <animated.div
        className={`bg-cover text-gray-800 flex items-center justify-center h-full w-full border-2 border-black absolute cursor-pointer mx-h-full`}
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <div>{props.flashcardBack}</div>
      </animated.div>
    </div>
  );
}






