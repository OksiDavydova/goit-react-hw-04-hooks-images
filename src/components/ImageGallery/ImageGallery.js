import React, { useEffect, useState } from "react";
import fetchPictures from "../../service/serviceApi";
import { Button } from "../Button/Button";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";
import LoadSpinner from "../Loader/Loader";

export function ImageGallery({ handleLargeImg, searchResult }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("init");
  const [loadingForButton, setLoadingForButton] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResult]);

  useEffect(() => {
    if (!searchResult) {
      return;
    }

    setStatus("pending");
    fetchPictures(searchResult, currentPage)
      .then((result) => {
        if (currentPage === 1) {
          setImages(result);
        } else {
          setImages((prev) => [...prev, ...result]);
        }
        setStatus("success");
        setLoadingForButton(false);
        scrollToLoadBtn();
      })
      .catch(() => setStatus("error"));
  }, [searchResult, currentPage]);

  const handleClick = (e) => {
    if (e.target.nodeName === "IMG") {
      const largeImg = e.target.dataset.source;
      handleLargeImg(largeImg);
    }
  };

  const scrollToLoadBtn = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onClickLoadMore = () => {
    setLoadingForButton(true);
    setCurrentPage((page) => page + 1);
  };

  if (status === "init") {
    return (
      <h1 className={s.title}>Hello! Are you want to find something...</h1>
    );
  }
  if (status === "pending") {
    return <LoadSpinner />;
  }

  if (status === "success") {
    if (images.length === 0) {
      return (
        <h1 className={s.title}>
          sorry we did not find photos on your request:
          <span className={s.title_span}>{searchResult}</span>
        </h1>
      );
    }
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.length > 0 &&
            images.map(({ id, webformatURL, largeImageURL, tags, user_id }) => (
              <ImageGalleryItem
                key={`${id}-${user_id}`}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={handleClick}
              />
            ))}
        </ul>

        <Button onClickLoadMore={onClickLoadMore}>
          {loadingForButton ? (
            <>
              <span className={s.loader}></span>
              <span>Fetch data</span>
            </>
          ) : (
            <span>Loading more</span>
          )}
        </Button>
      </>
    );
  }
  if (status === "error") {
    return <h1 className={s.title}>Sorry!!!</h1>;
  }
}

ImageGallery.propTypes = {
  searchResult: PropTypes.string,
  handleLargeImg: PropTypes.func,
};
