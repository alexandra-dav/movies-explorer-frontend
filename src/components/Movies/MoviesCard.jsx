// компонент одной карточки фильма.
import { useState, } from "react";

export function MoviesCard({ card, onCardDelete, myMovies, countCard }) {
  const [isLiked, setLike] = useState(false);
  // кол-во максимально возможного числа катрочек на странице


  function handleCardLike() {
    setLike(!isLiked);
  }
  return (
    <article
      className="cards__container"
      key={card.id}
      style={{ display: (card.id > countCard) ? "none" : "block" }}
    >
      {console.log(card.id)}
      <img
        className="cards__image"
        src={`https://api.nomoreparties.co/${card.image.url}`}
        alt={card.nameRU}
      />
      <div className="cards__info">
        <h2 className="cards__name">{`${card.nameRU}`}</h2>
        <p className="cards__duration">
          {`${
            parseInt(card.duration / 60)
              ? `${parseInt(card.duration / 60)}ч`
              : ""
          }`}
          {` ${parseInt(card.duration % 60)}м`}
        </p>
        {myMovies ? (
          <button
            aria-label="delete"
            name="button-delete"
            id={`button-delete_${card.id}`}
            className="cards__action cards__action_delete"
            type="button"
            onClick={onCardDelete}
          ></button>
        ) : (
          <button
            aria-label="like"
            name="favorit"
            id={`favorit_${card.id}`}
            className={`cards__action cards__action_favorit ${
              isLiked ? "" : "cards__action_favorit-active"
            }`}
            type="button"
            onClick={handleCardLike}
          ></button>
        )}
      </div>
    </article>
  );
}
