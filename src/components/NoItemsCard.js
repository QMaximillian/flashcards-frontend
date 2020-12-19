import React from 'react'
import PropTypes from 'prop-types'

export default function NoItemsCard({title, subtitle}) {
  return (
    <div
      className={
        'bg-gray-200 shadow-xl w-full h-full flex border-teal-400  rounded-lg border justify-center align-center'
      }
    >
      <article
        className={'p-2 text-teal-400 align-center flex-col flex'}
        style={{justifyContent: 'space-evenly'}}
      >
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

NoItemsCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.instanceOf(null),
  ]),
}
