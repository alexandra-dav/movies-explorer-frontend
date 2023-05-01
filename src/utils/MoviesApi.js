// Тут описана работа со стороннем апи
// beatfilm-movies

class MoviesApi {
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

  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});