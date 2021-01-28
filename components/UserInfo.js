export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = nameSelector;
    this._username = document.querySelector(this._nameSelector);
    this._aboutSelector = aboutSelector;
    this._about = document.querySelector(this._aboutSelector);
  }

  getUserInfo() {
    const data = {
      username: this._username.textContent,
      about: this._about.textContent
    };
  return data;
  }

  setUserInfo(data) {
    this._username.textContent = data.username;
    this._about.textContent = data.about;
    }
}