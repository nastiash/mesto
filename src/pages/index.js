// добавляем импорт главного файла стилей
import './index.css';

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

//зум картинки
const popupWithImage = new PopupWithImage(".pop-up_content_image");

const openPopupWithImage = (data) => {
  popupWithImage.openPopup(data);
};

const createNewCard = (data) => {
  const newCard = new Card(data, ".card-template", openPopupWithImage);
  return newCard;
};

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

//информация профиля
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

//добавление новых карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);

cardList.renderItems();

//слушатели
addNewCardButton.addEventListener("click", () => {

  popupWithAddCardForm.openPopup();
});

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
