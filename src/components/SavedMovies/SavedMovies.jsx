// компонент страницы с сохранёнными карточками фильмов.
import { Header } from "../Header";
import { MoviesCardList } from "../Movies/MoviesCardList";
import { SearchForm } from "../Movies/SearchForm";
import { Footer } from "../Footer";

export function SavedMovies({ isLogin, onNavigationOpen, card, onCardDelete }) {
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
          myMovies={true}
        />
      </main>
      <Footer />
    </>
  );
}
