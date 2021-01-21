export const initialCards = [
  {
    name: "Бикини Боттом",
    link: "https://i.ibb.co/NLKw6WG/bikini-bottom.jpg",
  },
  {
    name: "Красти Планктон",
    link: "https://i.ibb.co/c8Ct20y/krusty-plankton.jpg",
  },
  {
    name: "Тюрьма 😱",
    link: "https://i.ibb.co/HBqnT4G/Jail.jpg",
  },
  {
    name: "Поля медуз",
    link: "https://i.ibb.co/7JKD50c/jellyfish-fields.jpg",
  },
  {
    name: "Дом Белки",
    link: "https://i.ibb.co/QJ5QGWY/squirrel.jpg",
  },
  {
    name: "Красти Краб",
    link: "https://i.ibb.co/znZGSMp/krusty-krab.jpg",
  },
];

export class Card {
  constructor(name, link, templateSelector, composeFullSizeImagePopup) {
    this._name = name;
    this._alt = name;
    this._link = link;
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
    this._element.querySelector(".card__photo").alt = this._name;
    this._element.querySelector(".card__photo").src = this._link;

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
