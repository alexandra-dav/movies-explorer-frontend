/* форма поиска, куда пользователь будет вводить запрос.
Обратите внимание на фильтр с чекбоксом «Только короткометражки».
Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox. */
import loupe from "../../images/icon-loupe.svg";
import find from "../../images/find.svg";
import filteron from "../../images/smalltumb-on.svg";
import filteroff from "../../images/smalltumb-off.svg";
import { useState } from "react";

export function SearchForm() {
  const [filterMovies, setFilterMovies] = useState(false);
  function handleFilter() {
    setFilterMovies(!filterMovies);
  }
  return (
    <section className="movies" aria-label="Страница с сохраненными фильмами">
      <form
        className="movies__form"
        /* onSubmit={handlSubmit} */
      >
        <div className="movies__main">
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
            required
          />
          <button className="movies__find">
            <img
              src={find}
              alt="Поиск"
              className="movies__logo movies__logo_find"
            />
          </button>
        </div>
        <div className="movies__filter">
          <img
            src={`${filterMovies ? filteron : filteroff}`}
            onClick={handleFilter}
            className="movies__logo movies__logo_filter"
            alt="Фильтр"
          />
          <p className="movies__tittle-filter">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
