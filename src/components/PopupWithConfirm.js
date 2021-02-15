import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);

    this._popupElement = document.querySelector(this._popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._submit = this._submit.bind(this);
  }

  _submit(event) {
    event.preventDefault();
    this._handleFormSubmit(this._data);
    this._removeEventListeners();
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submit);
    super.setEventListeners();
  }

  removeEventListeners() {
    this._form.removeEventListener('submit', this._submit);
    super.removeEventListeners();
  }

  openPopup(data) {
    this._data = data;
    super.openPopup();
  }
}