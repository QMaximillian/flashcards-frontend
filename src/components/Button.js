import React from 'react'
import PropTypes from 'prop-types'

export default function Button({
  className,
  type = 'button',
  buttonText,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-full w-full hover:border-yellow-500 hover:border-2 shadow-lg border-2 text-white hover:text-yellow-500 border-teal-500 hover:border-0 bg-teal-500 rounded-sm flex justify-center items-center ${className}`}
    >
      <div className="text-lg">{buttonText}</div>
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}
