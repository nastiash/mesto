export class Card {
  constructor(data, templateSelector, composeFullSizeImagePopup) {
    this._name = data.name;
    this._alt = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handlePhotoClick = composeFullSizeImagePopup;
  }

  //забираем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  //наполняем шаблон данными
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__title").textContent = this._name;

    const photo = this._element.querySelector(".card__photo");
    photo.alt = this._name;
    photo.src = this._link;

    return this._element;
  }

  //вешаем слушатели
  _setEventListeners() {
    //слушатель лайка
    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      this._handleLikeClick();
    });
    //слушатель кнопки удаления
    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteClick();
    });
    //слушатель фулл-сайз попапа
    this._element.querySelector(".card__photo").addEventListener("click", () => {
      this._handlePhotoClick(this._name, this._link);
    });
  }

  //обработчик лайка
  _handleLikeClick() {
    this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

  //обработчик удаления карточки
  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }
}
