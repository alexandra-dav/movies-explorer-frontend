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
            onCardLike={() => {
              props.onCardLike(cardData);
            }}
            myMovies={props.myMovies}
            filterShortMovies={props.filterShortMovies}
          />
        ))}
      </section>      
    </>
  );
}
