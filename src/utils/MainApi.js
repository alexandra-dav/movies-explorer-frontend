import {BASE_URL} from './data';
class MainApi {
  constructor(config) {
    // тело конструктора
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  setToken(newToken) {
    this._headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${newToken}`,
    };
  }
  removeToken() {
    this._headers = {
      Authorization: "",
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  // Загрузка карточек с сервера
  getUserMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // добавить в избранное
  likeMovie(movieData) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movieData),
    }).then(this._getResponseData);
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  // Редактирование профиля
  patchUserInfo(UserDataProfile) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: UserDataProfile.name,
        email: UserDataProfile.email,
      }),
    }).then(this._getResponseData);
  }
}

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
});
