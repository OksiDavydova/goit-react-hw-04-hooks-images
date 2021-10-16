import PropTypes from "prop-types";
import { Component } from "react";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  handleChange = (e) => {
    const searchNormalize = e.currentTarget.value.toLowerCase();
    this.setState({ searchQuery: searchNormalize });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      return toast.error("Введите ключевое слово!", {
        theme: "dark",
      });
    }

    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ searchQuery: "" });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            value={searchQuery}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
