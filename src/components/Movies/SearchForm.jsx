import loupe from "../../images/icon-loupe.svg";
import find from "../../images/find.svg";
import filteron from "../../images/smalltumb-on.svg";
import filteroff from "../../images/smalltumb-off.svg";
import { massageText } from "../../utils/data";
import { useEffect, useState } from "react";

export function SearchForm({
  handleOnlyShortMovies,
  filterMovies,
  setFilterString,
  myMovies,
}) {
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false);
  const handlSubmit = (e) => {
    e.preventDefault();
    if(search){setFilterString(search);}    
  };
  const checkError = (data) => {
    if (data === '') {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };
  const hanleChangeSearch = (e) => {
    checkError(e.target.value);
    setSearch(e.target.value);    
  };
  useEffect(() => {
    const savedSearch = localStorage.getItem("search");

    if (savedSearch && !myMovies) {
      setFilterString(savedSearch);
      setSearch(savedSearch);
    } else {
      setFilterString(search);
      setSearch(search);
    }
  }, []);

  return (
    <section className="movies" aria-label="Страница с сохраненными фильмами">
      <div className="movies__form">
        <form className="movies__main" onSubmit={handlSubmit}>
        <span
            className={`${
              showError && "validation__form validation__text_color"
            }`}
          >
            {showError ? massageText.SEARCHFORMVALIDATIONMESSAGE : ""}
          </span>
          <img
            src={loupe}
            alt="Лупа"
            className="movies__logo movies__logo_loupe"
          />
          <input
            className="movies__search"
            type="text"
            id="movies"
            name="movies"
            placeholder="Фильм"
            value={search}
            onChange={hanleChangeSearch}
            required
          />
          
          <button aria-label="submit" className="movies__find" type="submit">
            <img
              src={find}
              alt="Поиск"
              className="movies__logo movies__logo_find"
            />
          </button>
        </form>
        <div className="movies__filter">
          <img
            src={`${filterMovies ? filteron : filteroff}`}
            onClick={handleOnlyShortMovies}
            className="movies__logo movies__logo_filter"
            alt="Фильтр"
          />
          <p className="movies__tittle-filter">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}
