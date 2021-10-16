import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          src={webformatURL}
          data-source={largeImageURL}
          alt={tags}
          className={s.ImageGalleryItem_image}
          onClick={onClick}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
