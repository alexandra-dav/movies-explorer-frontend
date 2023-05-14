import React from 'react';
export const userContext = { 
    name: "Василий", 
    email: "pochta@yandex.ru",
    password: ""
};
export const CurrentUserContext = React.createContext();
export const CurrentUsersMoviesContext = React.createContext();