export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popup.querySelector(".pop-up__close-button");
    this._submitButton = this._popup.querySelector(".form__submit-button");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
    this._handleSubmitButtonState = this._handleSubmitButtonState.bind(this);
  }

  openPopup() {
    this._popup.classList.add("pop-up_opened");
    this._handleSubmitButtonState();
    this.setEventListeners();
  }

  closePopup() {
    console.log(this._popup);
    this._popup.classList.remove("pop-up_opened");
    this._removeEventListeners();
  }

  _handleSubmitButtonState() {
    if (this._popup.classList.contains("pop-up_content_add-card")) {
      this._submitButton.classList.add('form__submit-button_state_invalid');
    } else {
      this._submitButton.classList.remove('form__submit-button_state_invalid');
    }
  }

  _handleButtonClose() {
    this.closePopup();
    }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  _handleOverlayClose(event) {
    const target = event.target;

    if (target.closest(".pop-up__container")) {
      event.stopPropagation();
    } else if (target.closest(".pop-up")) {
      this.closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener("keyup", this._handleEscClose);
    this._popupCloseButton.addEventListener("click", this._handleButtonClose);
    this._popup.addEventListener("click", this._handleOverlayClose);
  }

  _removeEventListeners() {
    document.removeEventListener("keyup", this._handleEscClose);
    this._popupCloseButton.removeEventListener("click", this._handleButtonClose);
    this._popup.removeEventListener("click", this._handleOverlayClose);
  }

}