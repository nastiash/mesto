export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  openPopup() {
    this._popupSelector.classList.add("pop-up_opened");
    this.setEventListeners();
  }

  closePopup() {
    this._popupSelector.classList.remove("pop-up_opened");
    this.removeEventListeners();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.closePopup();
    }
  }

  _handleEverlayClose(event) {
    const activePopup = event.target;

    if (activePopup.closest(".pop-up__container")) {
      event.stopPropagation();
    } else if (activePopup.closest(".pop-up")) {
      this.closePopup();
    }
  }

  setEventListeners() {
    document.addEventListener("keyup", _handleEscClose);
    this._popupSelector.addEventListener("click", _handleEverlayClose);
  }

  removeEventListeners() {
    document.removeEventListener("keyup", _handleEscClose);
    this._popupSelector.removeEventListener("click", _handleEverlayClose);
  }


}