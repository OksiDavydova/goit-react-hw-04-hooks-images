import React, { Component } from "react";
import fetchPictures from "../../service/serviceApi";
import { Button } from "../Button/Button";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import s from "./ImageGallery.module.css";

import LoadSpinner from "../Loader/Loader";

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    currentPage: 1,
    status: "init",
    // loadingForButton: false,
    loadingForButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchResult;
    const query = this.props.searchResult;
    const { currentPage } = this.state;

    if (prevSearch !== query) {
      this.setState({ status: "pending" });
      fetchPictures(query, 1)
        .then((result) =>
          this.setState({ images: result, currentPage: 1, status: "success" })
        )
        .catch((err) => {
          console.log(err);
          this.setState({ status: "error" });
        });
      // console.log("1");
    }
    if (prevState.currentPage !== currentPage && currentPage !== 1) {
      fetchPictures(query, currentPage)
        .then((result) => {
          this.setState((prev) => ({
            images: [...prev.images, ...result],
            status: "success",
            loadingForButton: false,
          }));
          this.scrollToLoadBtn();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ status: "error" });
        });

      // console.log("2");
    }
  }

  handleClick = (e) => {
    if (e.target.nodeName === "IMG") {
      const largeImg = e.target.dataset.source;
      this.props.handleLargeImg(largeImg);
    }
  };

  scrollToLoadBtn = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onClickLoadMore = () => {
    this.setState((prev) => ({
      currentPage: prev.currentPage + 1,
      loadingForButton: true,
    }));
  };

  render() {
    const { images, status, loadingForButton } = this.state;
    // console.log(images);
    if (status === "init") {
      return (
        <h1 className={s.title}>Hello! Are you want to find something...</h1>
      );
    }
    if (status === "pending") {
      return <LoadSpinner />;
    }

    if (status === "success") {
      //&& images.length !== 0
      if (images.length === 0) {
        return (
          <h1 className={s.title}>
            sorry we did not find photos on your request:
            <span className={s.title_span}>{this.props.searchResult}</span>
          </h1>
        );
      }
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.length > 0 &&
              images.map(
                ({ id, webformatURL, largeImageURL, tags, user_id }) => (
                  <ImageGalleryItem
                    key={`${id}-${user_id}`}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                    onClick={this.handleClick}
                  />
                )
              )}
          </ul>

          <Button onClickLoadMore={this.onClickLoadMore}>
            {loadingForButton && (
              <>
                <span className={s.loader}></span>
                <span>Fetch data</span>
              </>
            )}
            {!loadingForButton && <span>Loading more</span>}
          </Button>
        </>
      );
    }
    if (status === "error") {
      return <h1 className={s.title}>Sorry!!!</h1>;
    }
  }
}

ImageGallery.propTypes = {
  searchResult: PropTypes.string,
  handleLargeImg: PropTypes.func,
};

//full screen
// {loadingForButton ? (
//             <LoadSpinner />
//           ) : (
//             <Button onClickLoadMore={this.onClickLoadMore} />
//           )}
