import PropTypes from "prop-types";
import { useState } from "react";
import s from "./Searchbar.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = ({ target }) => {
    const searchNormalize = target.value.toLowerCase();
    setSearchQuery(searchNormalize);
  };

  const handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("Введите ключевое слово!", {
        theme: "dark",
      });
    }

    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
    setSearchQuery("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
