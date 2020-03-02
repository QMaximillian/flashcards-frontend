import React from 'react'

export default function NoMatch({message}) {
  return (
    <div
      className={
        'bg-gray-200 shadow-xl max-w-6xl w-3/4 h-64 flex border-teal-400  rounded-lg border justify-center align-center'
      }
    >
      <article
        style={{justifyContent: 'space-evenly'}}
        className={'p-2 text-teal-400 align-center flex-col flex'}
      >
        <div className="text-3xl self-center font-semibold">No Match</div>
        <div className="text-lg self-center font-medium">
          {'The page you are looking for is not available' || message}
        </div>
      </article>
    </div>
  )
}