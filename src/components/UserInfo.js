export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._username = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const data = {
      username: this._username.textContent,
      about: this._about.textContent,
    };
    return data;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._username.textContent = data.name;
    this._about.textContent = data.about;
  }

  setInitialInfo(data) {
    this._username.textContent = data.name;
    this._about.textContent = data.about;
    this.setUserAvatar(data);
    this._avatar.alt = data.name;
  }
}