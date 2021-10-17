import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

export function Button({ onClickLoadMore, children }) {
  return (
    <button type="button" onClick={onClickLoadMore} className={s.Button}>
      <div className={s.Btn_children}>{children}</div>
    </button>
  );
}

Button.propTypes = {
  onClickLoadMore: PropTypes.func,
  children: PropTypes.node,
};
