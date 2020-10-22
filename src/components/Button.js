import React from 'react'
import PropTypes from 'prop-types'

export default function Button({
  className,
  type = 'button',
  buttonText,
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={
        className
          ? className
          : `h-full w-full shadow-lg border-2 text-white border-teal-500 bg-teal-500 rounded-sm flex justify-center items-center hover:border-yellow-500 hover:text-yellow-500 hover:border-0`
      }
    >
      {children ? children : <div className="text-lg">{buttonText}</div>}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}
