import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Main } from "../Main/Main";
import Login from "../Login";
import Register from "../Register";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
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
import { errorText, massageText } from "../../utils/data";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const state = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const [loggedIn, isLoggedIn] = useState(false);
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const [isNavTabOpen, setNavTabOpen] = useState(false);

  const [card, setCard] = useState([]);
  const [cardCurrentUser, setCardCurrentUser] = useState([]);

  const handleAuthorize = async (data) => {
    try {
      const authData = await auth.authorize(data);
      if (authData.token) {
        localStorage.setItem("jwt", authData.token);
        mainApi.setToken(authData.token);
        isLoggedIn(true);
        const userData = await auth.userData(authData.token);
        setCurrentUser(userData);
        setErrorMessage("");
        // загрузка сохраненных крточек
        const movieData = await mainApi.getUserMovies();
        setCardCurrentUser(movieData);
      }
    } catch (err) {
      switch (err) {
        case "Ошибка: 400":
          setErrorMessage(errorText.LOGINERROR400);
          break;
        case "Ошибка: 404":
          setErrorMessage(errorText.LOGINERROR404);
          break;
        case "Ошибка: 500":
          setErrorMessage(errorText.LOGINERROR500);
          break;
        case "Ошибка: 429":
          setErrorMessage(errorText.ERROR429);
          break;
        default:
          setErrorMessage(errorText.UNOTHER);
          break;
      }
    }
  };
  const handleRegister = async (data) => {
    try {
      const authResult = await auth.register(data);
      if (authResult.statusCode !== 400) {
        handleAuthorize({
          email: data.email,
          password: data.password,
        });
      }
    } catch (err) {
      switch (err) {
        case "Ошибка: 409":
          setErrorMessage(errorText.EMAILERROR409);
          break;
        case "Ошибка: 500":
          setErrorMessage(errorText.REGISTERERROR500);
          break;
        case "Ошибка: 429":
          setErrorMessage(errorText.ERROR429);
          break;
        default:
          setErrorMessage(errorText.UNOTHER);
          break;
      }
      console.log(err);
    }
  };
  const handleUpdateUser = async (newDataProfile) => {
    try {
      const updateUser = await mainApi.patchUserInfo(newDataProfile);
      navigate("/profile");
      setCurrentUser(updateUser);
      setOkMessage(massageText.CHANGEDATAPROFILE);
    } catch (err) {
      switch (err) {
        case "Ошибка: 409":
          setErrorMessage(errorText.EMAILERROR409);
          break;
        case "Ошибка: 500":
          setErrorMessage(errorText.UPDATEERROR500);
          break;
        case "Ошибка: 429":
          setErrorMessage(errorText.ERROR429);
          break;
        default:
          setErrorMessage(errorText.UNOTHER);
          break;
      }
    }
  };

  function handleLogOut() {
    isLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("search");
    localStorage.removeItem("isShort");
    mainApi.removeToken();
    setCardCurrentUser([]);
    navigate("/");
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
      .catch((err) => {
        setApiErrorMessage(errorText.UNOTHER);
        console.log(err, apiErrorMessage);
      });
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
        .catch((err) => {
          setApiErrorMessage(errorText.UNOTHER);
          console.log(err, apiErrorMessage);
        });
    } else {
      handleDeleteCard(findeMovies);
    }
  }
  useEffect(() => {
    const checkMe = async () => {
      try {
        if (localStorage.getItem("jwt")) {
          const jwt = localStorage.getItem("jwt");
          const data = await auth.checkToken(jwt);
          if (data) {
            isLoggedIn(true);
            mainApi.setToken(jwt);
            setCurrentUser(data);
            if (state.pathname === "/signin" || state.pathname === "/signup") {
              navigate("/movies");
            } else {
              navigate(state.pathname);
            }
          }
        } else {
          handleLogOut();
        }
      } catch (err) {
        setApiErrorMessage(errorText.UNOTHER);
        console.log(err, apiErrorMessage);
      }
    };
    checkMe();
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
    }
  }, [loggedIn]);
  // навигация
/*   TODO: скорее всего не нужно, повторяет функционал из предыдущего useEffect
useLayoutEffect(() => {
    if (state.pathname === null || state.pathname === undefined) {
      navigate("/");
    } else {
      navigate(state.pathname);
    }
  }, [navigate]); */

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
                    okMessage={okMessage}
                    setOkMessage={setOkMessage}
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
