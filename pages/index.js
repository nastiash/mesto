import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

import { validationConfig,
         initialCards,
         editProfileButton,
         addNewCardButton,
         editProfilePopup,
         editProfileInputName,
         editProfileInputAbout,
         addNewCardPopup } from "../utils/constants.js";

//https://i.ibb.co/HFRvGW8/plank.jpg

//попап с большой картинкой
const popupWithImage = new PopupWithImage(".pop-up_content_image");

const openPopupWithImage = (data) => {
  popupWithImage.openPopup(data);
};

//создание и отрисовка новых карточек
const cardList = new Section(
  {
    items: {},
    renderer: (data) => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);

const createNewCard = (data) => {
  const newCard = new Card(data, ".card-template", openPopupWithImage);
  return newCard;
};

//попап добавления новой карточки
const popupWithAddCardForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
      popupWithAddCardForm.closePopup();
    },
  },
  ".pop-up_content_add-card"
);

//попап с информацией профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

const popupWithUserInfo = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      popupWithUserInfo.closePopup();
    },
  },
  ".pop-up_content_edit-profile"
);

//отрисовка стартовых карточек
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();
      initialCardList.addItem(cardElement);
    },
  },
  ".cards"
);

initialCardList.renderItems();

//слушатель открытия попапа добавления новой карточки
addNewCardButton.addEventListener("click", () => {
  popupWithAddCardForm.openPopup();
});

//слушатель открытия попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  editProfileInputName.value = userData.username;
  editProfileInputAbout.value = userData.about;

  popupWithUserInfo.openPopup();
});

//валидация форм
const setValidation = (formElement) => {
  const validation = new FormValidator(validationConfig, formElement);
  validation.enableValidation();
};

setValidation(editProfilePopup);
setValidation(addNewCardPopup);
