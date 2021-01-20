const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inputInvalidClass: "form__input_state_invalid",
  buttonInvalidClass: "form__submit-button_state_invalid",
};

export class FormValidator {
  constructor(form, formButton, validationConfig) {
    this._validationConfig = validationConfig,
    this._form = form,
    this._formButton = formButton
  }
}