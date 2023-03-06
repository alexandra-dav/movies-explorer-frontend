/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from 'react';
import { Main } from '../Main/Main'
import Login from '../Login';
import Register from '../Register';
import { Footer } from '../Footer';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Navigation } from '../Navigation';
import { Notfoundpage } from '../Notfoundpage';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';

function App() {
  const [loggedIn, isLoggedIn] = useState(true);
  const [isNavigationOpen, setNavigationOpen] = useState(false);

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
      <Route path="/signup" element={<Register />} />
      <Route
        path="/"
        element={
        <Main           
          loggedIn={loggedIn}
          onNavigationOpen={handleNavigationClick}
        />}
      />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/movies" element={<Movies />} />
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