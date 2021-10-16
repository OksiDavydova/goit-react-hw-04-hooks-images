import React, { Component } from "react";
import "./App.css";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { Modal } from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";

class App extends Component {
  state = {
    showModal: false,
    searchResult: "",
    largeImg: "",
  };

  handleFormSubmit = (searchQuery) => {
    // console.log(searchQuery);
    this.setState({ searchResult: searchQuery });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleLargeImg = (data) => {
    this.setState({ largeImg: data });
    this.toggleModal();
  };

  render() {
    const { showModal, largeImg, searchResult } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchResult={searchResult}
          handleLargeImg={this.handleLargeImg}
        />
        {showModal && (
          <Modal toggleModal={this.toggleModal} largeImgURL={largeImg} />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
