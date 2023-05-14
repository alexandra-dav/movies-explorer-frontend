import React from "react";
import { useState, useEffect } from "react";
import { Main } from "../Main/Main";
import Login from "../Login";
import Register from "../Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Navigation } from "../Navigation";
import { NavTab } from "../Main/NavTab";
import { Notfoundpage } from "../Notfoundpage";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Movies } from "../Movies/Movies";
import { Profile } from "../Profile";
import { auth } from "../../utils/auth";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import {
  CurrentUserContext,
  CurrentUsersMoviesContext,
} from "../../utils/CurrentUserContext";
import { errorText } from "../../utils/data";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [loggedIn, isLoggedIn] = useState(false);
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const [isNavTabOpen, setNavTabOpen] = useState(false);

  const [card, setCard] = useState([]);
  const [cardCurrentUser, setCardCurrentUser] = useState([]);

  function handleAuthorize(data) {
    auth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          isLoggedIn(true);
          navigate("/");
          auth.userData(res.token).then((userData) => setCurrentUser(userData));
          setErrorMessage("");
        }
      })
      .catch((err) => {
        switch (err) {
          case "Ошибка: 400":
            setErrorMessage(errorText.loginError400);
            break;
          case "Ошибка: 404":
            setErrorMessage(errorText.loginError404);
            break;
          case "Ошибка: 500":
            setErrorMessage(errorText.loginError500);
            break;
          default:
            break;
        }
      });
  }
  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        if (res.statusCode !== 400) {
          navigate("/movies", { replace: true });
          isLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          mainApi.setToken(res.token);
          setCurrentUser(data);
        }
      })
      .catch((err) => {
        switch (err) {
          case "Ошибка: 409":
            setErrorMessage(errorText.emailError409);
            break;
          case "Ошибка: 500":
            setErrorMessage(errorText.registerError500);
            break;
          default:
            break;
        }
        console.log(err);
      });
  }
  function handleUpdateUser(newDataProfile) {
    mainApi
      .patchUserInfo(newDataProfile)
      .then(() => {
        navigate("/profile");
        setCurrentUser(newDataProfile);
      })
      .catch((err) => {
        switch (err) {
          case "Ошибка: 409":
            setErrorMessage(errorText.emailError409);
            break;
          case "Ошибка: 500":
            setErrorMessage(errorText.updateError500);
            break;
          default:
            break;
        }
        console.log(err);
      });
  }
  function handleLogOut() {
    isLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("search");
    localStorage.removeItem("isShort");
    mainApi.removeToken();
  }
  function handleClikButtunClose(evt) {
    if (
      evt.target.classList.contains("navigation_opened") ||
      evt.target.classList.contains("navigation__close") ||
      evt.target.classList.contains("navigation__link")
    ) {
      setNavigationOpen(false);
      setNavTabOpen(false);
    }
  }
  function handleNavigationClick() {
    setNavigationOpen(!isNavigationOpen);
  }
  function handleNavTabClick() {
    setNavTabOpen(!isNavTabOpen);
  }
  function handleDeleteCard(card) {
    mainApi
      .deleteCard(card._id)
      .then(() => {
        setCardCurrentUser((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) =>
        console.log("Ошибка: ", err, " код ошибки: ", err.status)
      );
  }
  function handleCardLike(card) {
    const findeMovies = cardCurrentUser.find((e) => e.movieId === card.id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!Boolean(findeMovies)) {
      mainApi
        .likeMovie({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `https://api.nomoreparties.co${card.image.url}`,
          trailerLink: card.trailerLink,
          thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
        })
        .then((newMovie) => {
          const moviesArray = cardCurrentUser;
          moviesArray.push(newMovie);
          setCardCurrentUser(moviesArray);
        })
        .catch((err) =>
          console.log("Ошибка: ", err, " код ошибки: ", err.status)
        );
    } else {
      handleDeleteCard(findeMovies);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            isLoggedIn(true);
            navigate("/");
            mainApi.setToken(jwt);
            auth.userData(jwt).then((userData) => setCurrentUser(userData));
          }
        })
        .catch((err) =>
          console.log(
            "Ошибка: ",
            err,
            " код ошибки: ",
            err.status,
            "текст: ",
            err.message
          )
        );
    } else {
      handleLogOut();
    }
  }, [loggedIn]);

  // загрузка крточек с beatfilm-movies
  useEffect(() => {
    if (loggedIn) {
      moviesApi
        .getInitialCards()
        .then((cardData) => {
          setCard(cardData);
        })
        .catch((err) =>
          console.log("Ошибка: ", err, " код ошибки: ", err.status)
        );
      mainApi
        .getUserMovies()
        .then((movieData) => {
          setCardCurrentUser(movieData);
        })
        .catch((err) =>
          console.log("Ошибка: ", err, " код ошибки: ", err.status)
        );
    }
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentUsersMoviesContext.Provider value={cardCurrentUser}>
          <Routes>
            <Route
              path="/signin"
              element={
                <Login
                  onAuthorize={handleAuthorize}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    onNavigationOpen={handleNavigationClick}
                    isLogin={loggedIn}
                    card={card}
                    onCardDelete={handleDeleteCard}
                    onCardLike={handleCardLike}
                    myMovies={false}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    onNavigationOpen={handleNavigationClick}
                    isLogin={loggedIn}
                    card={cardCurrentUser}
                    onCardDelete={handleDeleteCard}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    isLogin={loggedIn}
                    onNavigationOpen={handleNavigationClick}
                    onLogout={handleLogOut}
                    onUpdateUser={handleUpdateUser}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <Main
                  onNavigationOpen={handleNavigationClick}
                  onNavTabOpen={handleNavTabClick}
                  isLogin={loggedIn}
                />
              }
            />
            <Route path="*" element={<Notfoundpage />} />
          </Routes>

          <Navigation
            isOpen={isNavigationOpen}
            onClose={handleClikButtunClose}
          />
          <NavTab isOpen={isNavTabOpen} onClose={handleClikButtunClose} />
        </CurrentUsersMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
