class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //Метод обработки ответа от сервера
  _handleResponseOfServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  //Метод получения информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод получения карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод загрузки первоначальной информации с сервера на страницу
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  //Метод отправки на сервер новых данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponseOfServer);
  }

  //Метод отправки новой карточки на сервер
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponseOfServer);
  }

  //Метод удаления карточки на сервере
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод добавления лайка
  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод удаления лайка
  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponseOfServer);
  }

  //Метод отправки нового аватара на сервер
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponseOfServer);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "74040f11-910e-4c55-acf1-dcb990a8b9e9",
    "Content-Type": "application/json",
  },
});
