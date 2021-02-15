export class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.about,
      })
    })
    .then(this._handleResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse)
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
  }

  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse)
  }
  // другие методы работы с API
};