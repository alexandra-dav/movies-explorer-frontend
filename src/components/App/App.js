/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Main } from "../Main/Main";
import Login from "../Login";
import Register from "../Register";
import { Footer } from "../Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
/* TO DO: для защиты авторизацией
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; */
import { Navigation } from "../Navigation";
import { NavTab } from "../Main/NavTab";
import { Notfoundpage } from "../Notfoundpage";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Movies } from "../Movies/Movies";
import { Profile } from "../Profile";
import {
  CurrentUserContext,
  userContext,
} from "../../utils/CurrentUserContext";
import { initialCards } from "../../utils/data";

function App() {
  const [currentUser, setCurrentUser] = useState(userContext);
  const navigate = useNavigate();

  const [loggedIn, isLoggedIn] = useState(false);
  const [isNavigationOpen, setNavigationOpen] = useState(false);
  const [isNavTabOpen, setNavTabOpen] = useState(false);

  const [card, setCard] = useState(initialCards);

  function handleAuthorize(data) {
    setCurrentUser(data);
    isLoggedIn(true);
    navigate("/");
  }
  function handleRegister() {
    navigate("/signin");
  }
  function handleUpdateUser(newDataProfile) {
    console.log(newDataProfile);
    setCurrentUser(newDataProfile);
  }
  function handleLogOut() {
    isLoggedIn(false);
    /* localStorage.removeItem("jwt"); */
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
    setCard((state) => state.filter((c) => c.id !== card.id));
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signin"
            element={<Login onAuthorize={handleAuthorize} />}
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/"
            element={
              <Main
                onNavigationOpen={handleNavigationClick}
                onNavTabOpen={handleNavTabClick}
                isLogin={loggedIn}
                /* windowWidth={windowWidth} */
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                onNavigationOpen={handleNavigationClick}
                isLogin={loggedIn}
                card={card}
                onCardDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                onNavigationOpen={handleNavigationClick}
                isLogin={loggedIn}
                card={card}
                onCardDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                isLogin={loggedIn}
                onNavigationOpen={handleNavigationClick}
                onLogout={handleLogOut}
                onUpdateUser={handleUpdateUser}
              />
            }
          />
          <Route path="*" element={<Notfoundpage />} />
        </Routes>
        <Footer />

        <Navigation isOpen={isNavigationOpen} onClose={handleClikButtunClose} />
        <NavTab isOpen={isNavTabOpen} onClose={handleClikButtunClose} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
