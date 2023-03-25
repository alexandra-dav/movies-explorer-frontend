// компонент страницы с поиском по фильмам.
import { Header } from "../Header";
import { SearchForm } from "./SearchForm";
import { MoviesCardList } from "./MoviesCardList";
import { Footer } from "../Footer";

export function Movies({ isLogin, onNavigationOpen, card, onCardDelete }) {
  return (
    <>
      <Header
        router={false}
        isLogin={isLogin}
        onNavigationOpen={onNavigationOpen}
      />
      <SearchForm />
      <MoviesCardList
        onCardDelete={onCardDelete}
        card={card}
        myMovies={false}
      />
      <Footer />
    </>
  );
}
