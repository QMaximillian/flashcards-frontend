import {isEmail, isEmpty, isMobilePhone} from 'validator'
import PropTypes from 'prop-types'
import React, {useState, useRef} from 'react'

const TextBox = React.forwardRef((props, ref) => {
  const [showError, setShowError] = useState(false)
  const [valueModified, setValueModified] = useState(false)
  const textBoxRef = useRef()

  React.useImperativeHandle(ref, () => ({
    focus: () => textBoxRef.current.focus(),
    value: () => textBoxRef.current.value,
    valid: () => isValid(textBoxRef.current.value),
  }))

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

  function handleInputChange(event) {
    const {name, value, id} = event.target

    props.onChange({id, name, value, isValid: isValid(value)})

    // reset the blurred state if the value was never modified.
    if (!valueModified) {
      setValueModified(true)
    }
  }

  function handleBlur(event) {
    const {name, value} = event.target

    props.onBlur({name, value, isValid: isValid(value)})

    if (valueModified && !showError) {
      setShowError(true)
    }
  }

  function renderClasses() {
    if (props.className) {
      return props.className
    } else {
      return `outline-none bg-dark-200 mb-1 text-black h-full p-2 w-full placeholder placeholder-gray-400 border-b-2 border-black border-solid`
    }
  }

  return (
    <div className="w-full">
      <input
        data-testid={props.testId ?? 'text-box'}
        className={`${renderClasses()} ${
          handleShowError()
            ? 'border-red-500'
            : 'focus:border-yellow-500 focus:border-b-4'
        }`}
        data-testid="text-box"
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        ref={textBoxRef}
        type={props.type}
        value={props.value}
      />
      {handleShowError() && (
        <p className="h-0 text-red-500 text-xs" role="alert">
          {getErrorMessage()}
        </p>
      )}
    </div>
  )
})

TextBox.displayName = 'TextBox'

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
