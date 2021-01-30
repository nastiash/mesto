import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".pop-up__big-image");
    this._caption = this._popup.querySelector(".pop-up__image-caption");
  }

  openPopup(data) {
    super.openPopup();

    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }
}