// компонент страницы с поиском по фильмам.
import { useState, useEffect, useLayoutEffect } from "react";
import { Header } from "../Header";
import { SearchForm } from "./SearchForm";
import { MoviesCardList } from "./MoviesCardList";
import { Footer } from "../Footer";

export function Movies({ isLogin, onNavigationOpen, card, onCardDelete }) {
  const [countCard, setCountCard] = useState(0);
  const [countExtraCard, setCountExtraCard] = useState(0);
  const width = useWindowSize(); // ширина экрана
  const [countWillAdd, setCountWillAdd] = useState(0);

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

  function handleExtraCard() {
    setCountExtraCard(countExtraCard + countWillAdd);
  }

  useEffect(() => {
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
  }, [countExtraCard, width]);

  return (
    <>
      <Header
        router={false}
        isLogin={isLogin}
        onNavigationOpen={onNavigationOpen}
      />
      <main>
        <SearchForm />
        <MoviesCardList
          onCardDelete={onCardDelete}
          card={card}
          myMovies={false}
          countCard={countCard}
          handleExtraCard={handleExtraCard}
        />
      </main>
      <Footer />
    </>
  );
}
