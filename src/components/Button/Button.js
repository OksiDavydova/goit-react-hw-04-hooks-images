import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

export function Button({ onClickLoadMore }) {
  return (
    <button type="button" onClick={onClickLoadMore} className={s.Button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClickLoadMore: PropTypes.func,
};
