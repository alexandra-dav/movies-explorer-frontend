/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from 'react';
import { Main } from '../Main/Main'
import Login from '../Login';
import Register from '../Register';
import { Footer } from '../Footer';
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  const [loggedIn, isLoggedIn] = useState(true);
  return (    
    <>
    <Routes>
      <Route path="/sing-in" element={<Login />} />
      <Route path="/sing-up" element={<Register />} />
      
      <Route
        path="/"
        element={<ProtectedRoute loggedIn={loggedIn} component={Main} />}
      />
    </Routes>
    <Footer />
    </>    
    
  );
}

export default App;