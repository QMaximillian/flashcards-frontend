import React from 'react'
import PropTypes from 'prop-types'

export default function NoItemsCard({ title, subtitle }){
  

  return (
    <div className={'bg-gray-200 shadow-xl w-full h-full flex border-teal-400  rounded-lg border justify-center align-center'}>
      <article style={{justifyContent: 'space-evenly'}}className={'p-2 text-teal-400 align-center flex-col flex  border-red-500 border '}>
        <div className="text-3xl self-center font-semibold">
          {title}
        </div>
        <div className="text-lg self-center font-medium">
          {subtitle}
        </div>
      </article>
    </div>
  )
}