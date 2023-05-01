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
    
    // Загрузка карточек с сервера
/*     getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
        .then(this._getResponseData);
    } */
  
    // Удаление карточки
/*     deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponseData);
    } */
  
    // поставить или удалить лайк
    changeLikeCardStatus (cardId, flag) {
      if(flag){
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._getResponseData);
  
    }
  
    // Загрузка информации о пользователе с сервера
    getUserInfo() {       
      return fetch(`${this._url}/users/me`, {
          headers: this._headers
      })
      .then(this._getResponseData);
    }
  
    // Редактирование профиля
    patchUserInfo(UserDataProfile) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
        body: JSON.stringify({
          name: UserDataProfile.name,
          email: UserDataProfile.email
        })
      })
      .then(this._getResponseData);
    }
  }
  
  export const mainApi = new MainApi({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    },
  });