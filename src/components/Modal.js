import React from "react";
// import { IoIosCloseCircle } from "react-icons/io";
import PropTypes from "prop-types";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
  }

  overlayClick = () => {
    if (this.props.overlayClickable) this.props.onClose();
  };

  render = () => {
    const { open, onClose, showDefaultCloseBtn } = this.props;
    if (!open) return null;

    return (
      <React.Fragment>
        <div className="fixed inset-0 overflow-auto h-screen w-screen flex justify-center items-center bg-gray-500 opacity-75 z-9999">
          <div
            onClick={this.overlayClick}
            className="h-full w-full bg-dark-800 opacity-75 z-9000"
          ></div>
          <div className="border border-red-500 bg-white absolute flex flex-col justify-start items-center z-99999">
            {this.props.children}
            {showDefaultCloseBtn && (
              <div
                onClick={onClose}
                style={{ bottom: -100 }}
                className="absolute flex flex-col items-center justify-center cursor-pointer mt-5"
              >
                {/* <IoIosCloseCircle className="text-white text-6xl" /> */}
                <div>X</div>
                <p className="text-white text-base font-primary">Close</p>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };
}

Modal.defaultProps = {
  showDefaultCloseBtn: true,
  overlayClickable: false
};

Modal.propTypes = {
  // If modal is open.
  open: PropTypes.bool,
  // Function that executes when default close button or clickable overlay is clicked.
  onClose: PropTypes.func.isRequired,
  // If default close button should be displayed.
  showDefaultCloseBtn: PropTypes.bool,
  // If clicking overlay should close the modal.
  overlayClickable: PropTypes.bool
};

export default Modal;
