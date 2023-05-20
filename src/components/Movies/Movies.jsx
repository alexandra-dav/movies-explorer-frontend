// компонент страницы с поиском по фильмам.
import {
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
} from "react";
import { Header } from "../Header";
import { SearchForm } from "./SearchForm";
import { MoviesCardList } from "./MoviesCardList";
import { Footer } from "../Footer";

export function Movies({
  onNavigationOpen,
  isLogin,
  card,
  onCardDelete,
  onCardLike,
  myMovies,
}) {
  const [countCard, setCountCard] = useState(0);
  const [countExtraCard, setCountExtraCard] = useState(0); // сколько карточек добавить
  const width = useWindowSize(); // ширина экрана
  const [countWillAdd, setCountWillAdd] = useState(0);
  const [isOnlyShortMovies, setOnlyShortMovies] = useState(false);

  // для фильтра сохраняем массив карточек
  const [movies, setMovies] = useState([]); // массив всех фильмов
  const [filterString, setFilterString] = useState(""); // значение в инпуте поисковой строки
  const [countFiltredCard, setCountFiltredCard] = useState(0); // кол-во найденных фильмов

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
    if (!filterString) {
      return [];
    }

    const filtered = movies.filter((movie) => {
      const nameRu = movie.nameRU.toLowerCase();
      const nameEn = movie.nameEN.toLowerCase();
      const str = filterString.toLowerCase();
      if (isOnlyShortMovies && movie.duration > 40) {
        return false;
      }

      return nameRu.includes(str) || nameEn.includes(str);
    });

    localStorage.setItem("search", filterString);
    localStorage.setItem("isShort", String(isOnlyShortMovies));

    return filtered;
  }, [filterString, isOnlyShortMovies, movies]);

  const moviesToRender = useMemo(() => {
    setCountFiltredCard(filteredMovies.length);
    return filteredMovies.slice(0, countCard);
  }, [filteredMovies, countCard]);

  useEffect(() => {
    const savedIsShort = localStorage.getItem("isShort");
    setMovies(card);

    if (savedIsShort) {
      setOnlyShortMovies(savedIsShort === "true");
    }

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
  }, [card, countCard, countExtraCard, countWillAdd, setCountCard, width]);

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
          setFilterString={setFilterString}
        />
        {(!countFiltredCard && !filterString) ||
        (countFiltredCard && filterString) ? (
          <MoviesCardList
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            card={moviesToRender}
            myMovies={myMovies}
            filterShortMovies={isOnlyShortMovies}
          />
        ) : (
          <>
            <section className="cards" aria-label="Галлерея" id="cards">
              <h2 className="notfound__title">Ничего не найдено</h2>
            </section>
          </>
        )}
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
