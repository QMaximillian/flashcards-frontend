import React, {useState} from 'react'
import {animated, useSpring} from 'react-spring'

export default function Card(props) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  return (
    <div className="h-64 w-3/4" onClick={() => set(state => !state)}>
      <animated.div
        className={`p-4 bg-cover flex items-center justify-center h-full w-full border border-gray-500 rounded absolute cursor-pointer mx-h-full`}
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          opacity: opacity.interpolate(o => 0.75 - o),
          transform,
        }}
      >
        <div className="text-3xl font-light">{props.flashcardFront}</div>
      </animated.div>
      <animated.div
        className={`p-4 bg-cover text-gray-800 flex items-center justify-center h-full w-full border border-gray-500 rounded absolute cursor-pointer mx-h-full`}
        style={{
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      >
        <div className="text-3xl font-light">{props.flashcardBack}</div>
      </animated.div>
    </div>
  )
}