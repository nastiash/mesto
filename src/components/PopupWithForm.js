import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector(".form");
    this._handleFormSubmit = handleFormSubmit;
    this._submit = this._submit.bind(this);
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  _submit(event) {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _getInputValues() {
    // создаём пустой объект
    const data = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    // возвращаем объект значений
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
