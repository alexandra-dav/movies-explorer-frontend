// компонент одной карточки фильма.
import { useState } from "react";
import { useContext } from "react";
import { CurrentUsersMoviesContext } from "../../utils/CurrentUserContext";

export function MoviesCard({
  card,
  onCardDelete,
  onCardLike,
  myMovies,
  filterShortMovies
}) {
  const cardCurrentUser = useContext(CurrentUsersMoviesContext);
  const cardIsLiked = cardCurrentUser.find((e) => e.movieId === card.id);
  const [isLiked, setLike] = useState(Boolean(cardIsLiked));
  function handleCardLike() {
    setLike(!isLiked);
    onCardLike();
  }
  
  return (
    <>
      {(!filterShortMovies || card.duration <= 40) && (
        <article
          className="cards__container"
          key={card.id}
        >
          <a href={`${card.trailerLink}`} rel="noreferrer" target="_blank">
            <img
              className="cards__image"
              src={myMovies
                ? `${card.image}`
                : `https://api.nomoreparties.co${card.image.url}`}
              alt={card.nameRU}
            />
          </a>

          <div className="cards__info">
            <h2 className="cards__name">{`${card.nameRU}`}</h2>
            <p className="cards__duration">
              {`${
                parseInt(card.duration / 60)
                  ? `${parseInt(card.duration / 60)}ч `
                  : ""
              }`}
              {`${
                parseInt(card.duration % 60) > 0
                  ? `${parseInt(card.duration % 60)}m`
                  : ""
              }`}
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
      )}
    </>
  );
}
