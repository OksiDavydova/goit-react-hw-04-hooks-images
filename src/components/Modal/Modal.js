import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import { ReactComponent as Close } from "../../Icons/Close.svg";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  // componentDidUpdate(prevProps, prevState) {}
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  // Escape keydown///
  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };

  handleClose = (e) => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  handleCloseButton = () => {
    this.props.toggleModal();
  };

  render() {
    const { children, largeImgURL } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClose}>
        <div className={s.Modal}>
          <img src={largeImgURL} alt="Large version" width="960" />
          {children}
        </div>
        <button
          type="button"
          className={s.ButtonClose}
          onClick={this.handleCloseButton}
        >
          <Close width="50" />
        </button>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImgURL: PropTypes.string.isRequired,
  children: PropTypes.node,
};
