import { MoviesCard } from "./MoviesCard";

export function MoviesCardList(props) {
  return (
    <>
      <section className="cards" aria-label="Галлерея" id="cards">
        {props.card.map((cardData) => (
          <MoviesCard
            key={cardData.id}
            card={cardData}
            onCardDelete={() => {
              props.onCardDelete(cardData);
            }}
            myMovies={props.myMovies}
          />
        ))}
      </section>
      <button aria-label="more-movies" className="landing__button landing__button_movies">
        Ещё
      </button>
    </>
  );
}
