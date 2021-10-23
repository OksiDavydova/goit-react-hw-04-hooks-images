import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import { ReactComponent as Close } from "../../Icons/Close.svg";

const modalRoot = document.querySelector("#modal-root");

export function Modal({ toggleModal, largeImgURL, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  // Escape keydown///
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      toggleModal();
    }
  };

  const handleClose = (e) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  const handleCloseButton = () => {
    toggleModal();
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>
        <img src={largeImgURL} alt="Large version" width="960" />
        {children}
      </div>
      <button
        type="button"
        className={s.ButtonClose}
        onClick={handleCloseButton}
      >
        <Close width="50" />
      </button>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImgURL: PropTypes.string.isRequired,
  children: PropTypes.node,
};
