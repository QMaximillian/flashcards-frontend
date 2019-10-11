import { isEmail, isEmpty, isMobilePhone } from "validator";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";

export default function TextBox(props){
    const [showError, setShowError] = useState(false)
    const [valueModified, setValueModified] = useState(false)

    const inputRef = useRef(null)
    
    function getErrorMessage(){
    const { error, value, type, required } = props;

    if (required && isEmpty(value)) {
      const defaultMessage = `${type} is required.`;
      return error.required || defaultMessage;
    }

    if (!isValid(value)) {
      const defaultMessage = `Please enter a valid ${type}.`;
      return error.invalid || defaultMessage;
    }
  };

  function isValid(){
    const { required, type, value } = props;

    if (required && isEmpty(value)) {
      return false;
    }

    switch (type) {
      case "email":
        return isEmail(value);
      case "phone":
        return isMobilePhone(value, "en-US");
      default:
        return true;
    }
  };

  function handleShowError() {
      const { value, forceError } = props
    if (forceError) return !isValid(value);
    return valueModified && showError && !isValid(value);
  }

  function handleInputChange(e){
    const { name, value } = e.target;

    props.onChange({ name, value, isValid: isValid(value) });

    // reset the blurred state if the value was never modified.
    if (!valueModified) {
      setValueModified(true);
    }
  };

  function handleBlur(e){
    const { name, value } = e.target;

    props.onBlur({ name, value, isValid: isValid(value) });

    if (valueModified && !showError) {
      setShowError(true);
    }
  };

//   function focus(){
//     return inputRef.current.focus();
//   };

//    function value() {
//     return inputRef.current.value;
//   }

//   /**
//    * valid returns the current .
//    * @return {string} input element value.
//    */
//   function valid() {
//     return isValid(inputRef.current.value);
//   }


    return (
      <>
        <input
          className={`group-hover:text-gray-500 bg-transparent  placeholder-white mb-1 text-white h-full p-2 w-full placeholder border-black border-solid ${
            handleShowError() ? "border-red-500" : "focus:border-green-500"
          }`}
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          onChange={handleInputChange}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          value={props.value}
          onBlur={handleBlur}
          ref={inputRef}
        />
        {handleShowError() && (
          <p className="h-0 text-red-500 text-xs">{getErrorMessage()}</p>
        )}
      </>
    );
}


// A simple text input to take user input.
// export default class TextBox extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showError: false, // Whether to start displaying validtion errors.
//       valueModified: false // Whether the input value has been modified.
//     };

//     this.inputRef = React.createRef();
//   }

//   /**
//    * getErrorMessage returns an appropriate error message base on the type of input.
//    * @return {string} A friendly error message.
//    */
//   getErrorMessage = () => {
//     const { error, value, type, required } = this.props;

//     if (required && isEmpty(value)) {
//       const defaultMessage = `${type} is required.`;
//       return error.required || defaultMessage;
//     }

//     if (!this.isValid(value)) {
//       const defaultMessage = `Please enter a valid ${type}.`;
//       return error.invalid || defaultMessage;
//     }
//   };

//   /**
//    * isValid returns the validity of the current input value.
//    * @return {boolean} Whether the input value is valid or invalid.
//    */
//   isValid = value => {
//     const { required, type } = this.props;

//     if (required && isEmpty(value)) {
//       return false;
//     }

//     switch (type) {
//       case "email":
//         return isEmail(value);
//       case "phone":
//         return isMobilePhone(value, "en-US");
//       default:
//         return true;
//     }
//   };

//   /**
//    * ShowError decides whether to show the input error.
//    * @return {boolean} Whether the input has been blurred and the input is valid.
//    */
//   showError = () => {
//     if (this.props.forceError) return !this.isValid(this.props.value);
//     return (
//       this.state.valueModified &&
//       this.state.showError &&
//       !this.isValid(this.props.value)
//     );
//   };

//   /**
//    * @param {React.ChangeEvent<HTMLInputElement>} e React ChangeEvent<HTMLInputElement>
//    */
//   handleInputChange = e => {
//     const { name, value } = e.target;

//     this.props.onChange({ name, value, isValid: this.isValid(value) });

//     // reset the blurred state if the value was never modified.
//     if (!this.state.valueModified) {
//       this.setState({
//         valueModified: true
//       });
//     }
//   };

//   /**
//    * @param {React.ChangeEvent<HTMLInputElement>} e React ChangeEvent<HTMLInputElement>
//    */
//   handleBlur = e => {
//     const { name, value } = e.target;

//     this.props.onBlur({ name, value, isValid: this.isValid(value) });

//     if (this.state.valueModified && !this.state.showError) {
//       this.setState({
//         showError: true
//       });
//     }
//   };

//   /**
//    * focus focuses the input element.
//    * @return {void}
//    */
//   focus = () => {
//     this.inputRef.current.focus();
//   };

//   /**
//    * value returns the current string value of the input element.
//    * @return {string} input element value.
//    */
//   get value() {
//     return this.inputRef.current.value;
//   }

//   /**
//    * valid returns the current .
//    * @return {string} input element value.
//    */
//   get valid() {
//     return this.isValid(this.inputRef.current.value);
//   }

//   render() {
//     return (
//       <div>
//         <input
//           className={`outline-none bg-dark-200 mb-1 text-black rounded h-12 p-2 w-full placeholder border border-black border-solid ${
//             this.showError() ? "border-red-500" : "focus:border-green-500"
//           }`}
//           placeholder={this.props.placeholder}
//           type={this.props.type}
//           name={this.props.name}
//           onChange={this.handleInputChange}
//           disabled={this.props.disabled}
//           autoComplete={this.props.autoComplete}
//           value={this.props.value}
//           onBlur={this.handleBlur}
//           ref={this.inputRef}
//         />
//         {this.showError() && (
//           <p className="h-0 text-red-500 text-xs">{this.getErrorMessage()}</p>
//         )}
//       </div>
//     );
//   }
// }

TextBox.defaultProps = {
  autoComplete: "on",
  error: { invalid: "", required: "" },
  onBlur: () => {},
  required: false,
  type: "text",
  value: "",
  forceError: false
};

TextBox.propTypes = {
  autoComplete: PropTypes.oneOf(["on", "off"]),
  error: PropTypes.shape({
    invalid: PropTypes.string,
    required: PropTypes.string
  }),
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.oneOf(["text", "email", "password", "phone"]),
  value: PropTypes.string.isRequired,
  forceError: PropTypes.bool
};
