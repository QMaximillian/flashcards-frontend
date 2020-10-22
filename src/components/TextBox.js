import {isEmail, isEmpty, isMobilePhone} from 'validator'
import PropTypes from 'prop-types'
import React, {useState} from 'react'

const TextBox = React.forwardRef((props, ref) => {
  const [showError, setShowError] = useState(false)
  const [valueModified, setValueModified] = useState(false)

  function getErrorMessage() {
    const {error, value, type, required, name} = props

    if (required && isEmpty(value)) {
      const defaultMessage = `${name.replace(/^\w/, c =>
        c.toUpperCase(),
      )} is required.`
      return error.required || defaultMessage
    }

    if (!isValid(value)) {
      const defaultMessage = `Please enter a valid ${type}.`
      return error.invalid || defaultMessage
    }
  }

  function isValid() {
    const {required, type, value} = props

    if (required && isEmpty(value)) {
      return false
    }

    switch (type) {
      case 'email':
        return isEmail(value)
      case 'phone':
        return isMobilePhone(value, 'en-US')
      default:
        return true
    }
  }

  function handleShowError() {
    const {value, forceError} = props
    if (forceError) return !isValid(value)
    return valueModified && showError && !isValid(value)
  }

  function handleInputChange(e) {
    const {name, value} = e.target

    props.onChange({name, value, isValid: isValid(value)})

    // reset the blurred state if the value was never modified.
    if (!valueModified) {
      setValueModified(true)
    }
  }

  function handleBlur(e) {
    const {name, value} = e.target

    props.onBlur({name, value, isValid: isValid(value)})

    if (valueModified && !showError) {
      setShowError(true)
    }
  }

  // function focus(){
  //   return ref.current.focus();
  // };

  //  function value() {
  //   return ref.current.value;
  // }

  // /**
  //  * valid returns the current .
  //  * @return {string} input element value.
  //  */
  // function valid() {
  //   return isValid(ref.current.value);
  // }

  function renderClasses() {
    return `outline-none bg-dark-200 mb-1 text-black h-full p-2 w-full placeholder placeholder-gray-400 border-b-2 border-black border-solid ${props.className}`
  }

  return (
    <div className="w-full">
      <input
        data-testid="text-box"
        className={`${renderClasses()} ${
          handleShowError()
            ? 'border-red-500'
            : 'focus:border-yellow-500 focus:border-b-4'
        }`}
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        name={props.name}
        onChange={handleInputChange}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        value={props.value}
        onBlur={handleBlur}
        ref={ref}
        onFocus={props.onFocus}
      />
      {handleShowError() && (
        <p role="alert" className="h-0 text-red-500 text-xs">
          {getErrorMessage()}
        </p>
      )}
    </div>
  )
})

TextBox.defaultProps = {
  autoComplete: 'off',
  error: {invalid: '', required: ''},
  onBlur: () => {},
  required: false,
  type: 'text',
  value: '',
  forceError: false,
  onFocus: () => {},
}

TextBox.propTypes = {
  autoComplete: PropTypes.oneOf(['on', 'off']),
  error: PropTypes.shape({
    invalid: PropTypes.string,
    required: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'email', 'password', 'phone']),
  value: PropTypes.string.isRequired,
  forceError: PropTypes.bool,
  onFocus: PropTypes.func,
}

export default TextBox
