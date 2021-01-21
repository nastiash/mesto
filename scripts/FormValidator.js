export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inputInvalidClass: "form__input_state_invalid",
  buttonInvalidClass: "form__submit-button_state_invalid",
};

export class FormValidator {
  constructor(validationConfig, activeForm) {
    this._form = validationConfig.formSelector,
    this._input = validationConfig.inputSelector,
    this._button = validationConfig.submitButtonSelector,
    this._inputInvalidClass = validationConfig.inputInvalidClass,
    this._buttonInvalidClass = validationConfig.buttonInvalidClass,
    this._activeForm = activeForm
  }

  //https://i.ibb.co/HFRvGW8/plank.jpg

  //показываем ошибку
  _showError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);

    input.classList.add(this._inputInvalidClass);
    error.textContent = input.validationMessage;
  }

  //скрываем ошибку
  _hideError(form, input) {
    const error = form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._inputInvalidClass);
    error.textContent = "";
  }

  _checkInputValidity(form, input) {
    if (input.validity.valid) {
      this._hideError(form, input);
    } else {
      this._showError(form, input);
    }
  }

  _setButtonState(button, isActive) {
    if (!isActive) {
      button.classList.add(this._buttonInvalidClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._buttonInvalidClass);
      button.disabled = false;
    }
  }

  _setEventListeners(form) {
    const inputList = form.querySelectorAll(".form__input");
    const submitButton = form.querySelector(this._button);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(form, input);
        this._setButtonState(submitButton, form.checkValidity());
      });
    });
  }

  enableValidation() {
    const formList = document.querySelectorAll('.form');

    formList.forEach((form) => {
      const submitButton = form.querySelector(this._button);

      this._setEventListeners(form);
      this._setButtonState(submitButton, form.checkValidity());
    });
  }

}
