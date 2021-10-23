import React, { useState } from "react";
import "./App.css";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Modal } from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [largeImg, setLargeImg] = useState("");

  const handleFormSubmit = (searchQuery) => {
    // console.log(searchQuery);
    setSearchResult(searchQuery);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLargeImg = (data) => {
    setLargeImg(data);
    toggleModal();
  };

  // const { showModal, largeImg, searchResult } = this.state;

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        searchResult={searchResult}
        handleLargeImg={handleLargeImg}
      />
      {showModal && <Modal toggleModal={toggleModal} largeImgURL={largeImg} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
