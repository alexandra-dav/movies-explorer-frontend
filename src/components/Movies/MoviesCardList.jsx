/* компонент, который управляет отрисовкой карточек фильмов 
на страницу и их количеством. */
import { MoviesCard } from "./MoviesCard";

export function MoviesCardList(props) {
  return (
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
  );
}
