import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._submit = this._submit.bind(this);
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit-button");
  }

  //процесс загрузки
  loadingInfo(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      return;
    }
  }

  _submit(event) {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._submit);
  }

  closePopup() {
    super.closePopup();

    this._form.reset();
    this._form.removeEventListener("submit", this._submit);
  }
}
