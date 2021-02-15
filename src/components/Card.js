export class Card {
  constructor(data, cardConfig, templateSelector, ownerId, { handlePhotoClick, handleDeleteCard, setLike, deleteLike }) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardConfig = cardConfig;
    this._templateSelector = templateSelector;
    this._ownerId = ownerId;
    this._handlePhotoClick = handlePhotoClick;
    this._handleDeleteCard = handleDeleteCard;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  //забираем шаблон
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  _checkCardOwner() {
    if (this._data.owner._id !== this._ownerId) {
      this._handleTrashButton(this._delete);
    } else {
      return;
    }
  }

    //счетчик лайков
    setLikesCounter(data) {
      this._likesCounter.textContent = String(data.likes.length);
    }

  //наполняем шаблон данными
  generateCard() {
    this._element = this._getTemplate();
    this._title = this._element.querySelector(this._cardConfig.cardTitleSelector).textContent = this._name;
    this._photo = this._element.querySelector(this._cardConfig.cardImageSelector);
    this._setEventListeners();
    this._photo.alt = this._name;
    this._photo.src = this._link;
    this._like = this._element.querySelector(this._cardConfig.cardLikeButtonSelector);
    this._likesCounter = this._element.querySelector(this._cardConfig.cardLikesCounterSelector);
    this._delete = this._element.querySelector(this._cardConfig.cardDeleteButtonSelector);
    this.setLikesCounter(this._data);
    this._checkCardOwner();
    this._checkLikeStatus();
    return this._element;
  }

  _checkLikeStatus() {
    this._data.likes.forEach((item) => {
      if (item._id === this._ownerId) {
        this._handleLikeCard();
      }
    });
  }

  //вешаем слушатели
  _setEventListeners() {
    //слушатель лайка

    this._element.querySelector(".card__like-button").addEventListener("click", () => {
      if (this._element.querySelector(".card__like-button").classList.contains("card__like-button_active")) {
        this._handleDislikeCard();
      } else {
        this._handleLikeCard();
      }
    });

    //слушатель кнопки удаления
    this._element.querySelector(".card__delete-button").addEventListener("click", () => {
      this._handleDeleteCard();
    });

    //слушатель фулл-сайз попапа
    this._element.querySelector(".card__photo").addEventListener("click", () => {
      this._handlePhotoClick(this._data);
    });
  }

  //обработчик лайка
  _handleLikeCard() {
    this._element.querySelector(".card__like-button").classList.add("card__like-button_active");
    this._setLike(this._data);
  }

  //обработчик дизлайка
  _handleDislikeCard() {
    this._element.querySelector(".card__like-button").classList.remove("card__like-button_active");
    this._deleteLike(this._data);
  }

  //обработчик удаления карточки
  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  //отображение корзины
  _handleTrashButton(item) {
    item.remove();
    item = null;
  }
}
