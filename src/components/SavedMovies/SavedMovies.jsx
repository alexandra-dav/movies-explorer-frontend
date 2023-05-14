import { Movies } from "../Movies/Movies";

export function SavedMovies({
  onNavigationOpen,
  isLogin,  
  card,
  onCardDelete,
  onCardLike,
}) {
  return (
    <>
      <Movies
        onNavigationOpen={onNavigationOpen}
        isLogin={isLogin}
        card={card}
        onCardDelete={onCardDelete}
        onCardLike={onCardLike}
        myMovies={true}
      />
    </>
  );
}