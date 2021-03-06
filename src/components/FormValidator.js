export class FormValidator {
  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector,
    this._buttonSelector = validationConfig.submitButtonSelector,
    this._inputInvalidClass = validationConfig.inputInvalidClass,
    this._buttonInvalidClass = validationConfig.buttonInvalidClass,
    this._formSelector = validationConfig.formSelector,
    this._formElement = formElement
  }

//показываем ошибку
_showError(input) {
  const error = this._form.querySelector(`#${input.id}-error`);
  input.classList.add(this._inputInvalidClass);
  error.textContent = input.validationMessage;
}

//скрываем ошибку
_hideError(input) {
  const error = this._form.querySelector(`#${input.id}-error`);
  input.classList.remove(this._inputInvalidClass);
  error.textContent = "";
}

//проверяем валидность инпутов
_checkInputValidity(input) {
  if (input.validity.valid) {
    this._hideError(input);
  } else {
    this._showError(input);
  }
}

//устанавливаем состояние кнопки
_setButtonState(isActive) {
  if (!isActive) {
    this._submitButton.classList.add(this._buttonInvalidClass);
    this._submitButton.disabled = true;
  } else {
    this._submitButton.classList.remove(this._buttonInvalidClass);
    this._submitButton.disabled = false;
  }
}

//удаляем ошибки при ресете попапа
_deleteErrors() {
  this._inputList.forEach((input) => {
    this._hideError(input);
  });
}

//вешаем слушатели
_setEventListeners() {
  this._inputList = this._form.querySelectorAll(this._inputSelector);

  this._form.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  this._inputList.forEach((input) => {
    input.addEventListener("input", () => {
      this._checkInputValidity(input);
      this._setButtonState(this._form.checkValidity());
    });
  });

  this._form.addEventListener("reset", () => {
    this._deleteErrors();
    this._setButtonState(false);
  });
}

//включаем валидацию
enableValidation() {
  this._form = this._formElement.querySelector(this._formSelector);
  this._submitButton = this._form.querySelector(this._buttonSelector);

  this._setButtonState(this._form.checkValidity());
  this._setEventListeners();
}
}
