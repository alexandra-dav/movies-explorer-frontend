// компонент страницы с поиском по фильмам.
import { Header } from "../Header";
import loupe from '../../images/icon-loupe.svg';
import find from '../../images/find.svg';
import filteron from '../../images/smalltumb-on.svg';
import filteroff from '../../images/smalltumb-off.svg';
import { useState } from "react";

export function Movies({isLogin, onNavigationOpen}) {
  const [filterMovies, setFilterMovies] = useState(false);
  function handleFilter() {
    setFilterMovies(!filterMovies);
  }
  return(
    <>
    <Header
      router={false}
      isLogin={isLogin}
      onNavigationOpen={onNavigationOpen}
    />
    <section className="movies" aria-label="Страница с поиском фильмов">
      <form className="movies__form">
        <div className="movies__main">
          <img src={loupe} alt="Лупа" className="movies__logo movies__logo_loupe" />
          <input
          className="movies__search"
          type="text"
          id="movies"
          name="movies"
          placeholder="Фильм"
          />
          <img src={find} alt="Поиск" className="movies__logo movies__logo_find" />
        </div>
        <div className="movies__filter">
          <img src={`${filterMovies ? filteron : filteroff}`} onClick={handleFilter} className="movies__logo movies__logo_filter" alt="Фильтр"/>
          <p className="movies__tittle-filter">Короткометражки</p>
        </div>
      </form>
      <div className="movies__cards">Hi!</div>
    </section>
    </>
  );
}