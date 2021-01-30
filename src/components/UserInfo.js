export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._username = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const data = {
      username: this._username.textContent,
      about: this._about.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._username.textContent = data.username;
    this._about.textContent = data.about;
  }
}