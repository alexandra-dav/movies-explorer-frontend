/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from 'react';
import { Main } from '../Main/Main'
import Login from '../Login';
import Register from '../Register';
import { Footer } from '../Footer';
import { Route, Routes } from "react-router-dom";
// import { Header } from '../Header';
/* TO DO: для защиты авторизацией
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; */
import { Navigation } from '../Navigation';
import { Notfoundpage } from '../Notfoundpage';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile';

function App() {
  const [loggedIn, isLoggedIn] = useState(true);
  const [isNavigationOpen, setNavigationOpen] = useState(false);
/*   const [windowWidth, setWindowWidth] = useState(768);
  function handlChangeWindow (pix) {
    setWindowWidth(pix);
  }
  useEffect(() => {
    // Узнаем ширину области просмотра (вьюпорта)
    handlChangeWindow(window.innerWidth);
    console.log(window.innerWidth);
  }, windowWidth); */
  function handleClikButtunClose(evt) {
    if (
      evt.target.classList.contains("navigation_opened") ||
      evt.target.classList.contains("navigation__close") ||
      evt.target.classList.contains("navigation__link")
    ) {
      setNavigationOpen(false);
    }
  }
  function handleNavigationClick() {
    setNavigationOpen(!isNavigationOpen);
  }
  return (    
    <>
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />}/>
      <Route
        path="/"
        element={
        <Main
          onNavigationOpen={handleNavigationClick}
          isLogin={loggedIn}
          /* windowWidth={windowWidth} */
        />}
      />
      <Route
        path="/saved-movies"
        element={
          <SavedMovies
            onNavigationOpen={handleNavigationClick}
            isLogin={loggedIn}
          />
        } />
      <Route
        path="/movies"
        element={
        <Movies
          onNavigationOpen={handleNavigationClick}
          isLogin={loggedIn}
        />
      } />
      <Route
        path="/profile"
        element={
        <Profile
          onNavigationOpen={handleNavigationClick}
          isLogin={loggedIn}
        />
      } />
      <Route path="*" element={<Notfoundpage />} />
    </Routes>
    <Footer />

    <Navigation
      isOpen={isNavigationOpen}
      onClose={handleClikButtunClose}
      loggedIn={loggedIn}
    />
    </>    
    
  );
}

export default App;