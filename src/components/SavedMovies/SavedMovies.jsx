import { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { Header } from "../Header";
import { SearchForm } from "../Movies/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList";
import { Footer } from "../Footer";
import Preloader from "../Movies/Preloader";

export function SavedMovies({
  onNavigationOpen,
  isLogin,
  card,
  onCardDelete,
  onCardLike,
}) {
  const [countCard, setCountCard] = useState(0);
  const [countExtraCard, setCountExtraCard] = useState(0); // сколько карточек добавить
  const width = useWindowSize(); // ширина экрана
  const [countWillAdd, setCountWillAdd] = useState(0);
  const [isOnlyShortMovies, setOnlyShortMovies] = useState(false);

  // для фильтра сохраняем массив карточек
  const [movies, setMovies] = useState([]); // массив всех фильмов
  const [filterStringInput, setFilterStringInput] = useState(""); // значение в инпуте поисковой строки
  const [countFiltredCard, setCountFiltredCard] = useState(0); // кол-во найденных фильмов

  const [loader, setLoader] = useState(false);
  // получение значения размера экрана
  function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  function handleOnlyShortMovies() {
    setOnlyShortMovies(!isOnlyShortMovies);
    setCountExtraCard(0); // мб, не нужно менять кол-во
  }
  function handleExtraCard() {
    setCountExtraCard(countExtraCard + countWillAdd);
  }
  const filteredMovies = useMemo(() => {
    const filtered = movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase();
      const nameEn = movie.nameEN.toLowerCase();
      const str = filterStringInput.toLowerCase();
      if (isOnlyShortMovies && movie.duration > 40) {
        return false;
      }

      return nameRu.includes(str) || nameEn.includes(str);
    });

    return filtered;
  }, [filterStringInput, isOnlyShortMovies, movies]);

  const moviesToRender = useMemo(() => {
    setLoader(true);
    if (filterStringInput || isOnlyShortMovies) {
      setCountFiltredCard(filteredMovies.length);
      setLoader(false);
      return filteredMovies.slice(0, countCard);
    } else {
      setCountFiltredCard(card.length);
      setLoader(false);
      return card.slice(0, countCard);
    }
  }, [filterStringInput, isOnlyShortMovies, filteredMovies, countCard, card]);

  useEffect(() => {
    setMovies(card);
    if (width >= 1280) {
      setCountCard(countExtraCard + 12);
      setCountWillAdd(3);
    }
    if (width > 480 && width < 1280) {
      setCountCard(countExtraCard + 8);
      setCountWillAdd(2);
    }
    if (width >= 320 && width < 480) {
      setCountCard(countExtraCard + 5);
      setCountWillAdd(2);
    }
  }, [card, countExtraCard, width]);

  return (
    <>
      <Header
        router={false}
        isLogin={isLogin}
        onNavigationOpen={onNavigationOpen}
      />
      <main>
        <SearchForm
          handleOnlyShortMovies={handleOnlyShortMovies}
          filterMovies={isOnlyShortMovies}
          setFilterString={setFilterStringInput}
          myMovies={true}
        />
        {(loader && <Preloader loader={loader} />) ||
          (countFiltredCard === 0 && filterStringInput ? (
            <>
              <section className="cards" aria-label="Галлерея" id="cards">
                <h2 className="notfound__title">Ничего не найдено</h2>
              </section>
            </>
          ) : (
            <MoviesCardList
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              card={moviesToRender}
              myMovies={true}
              filterShortMovies={isOnlyShortMovies}
            />
          ))}
      </main>
      <button
        aria-label="more-movies"
        className="landing__button landing__button_movies"
        style={{ display: countCard >= countFiltredCard ? "none" : "block" }}
        onClick={handleExtraCard}
      >
        Ещё
      </button>
      <Footer />
    </>
  );
}
