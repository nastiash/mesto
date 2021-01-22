import { Card } from "./Card.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./validationConfig.js";

/*** ЭЛЕМЕНТЫ ПРОФИЛЯ ***/
const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

/*** ЭЛЕМЕНТЫ КАРТОЧЕК ***/
const cardsContainerElement = document.querySelector(".cards");

/*** ПОП-АП РЕДАКТИРОВАНИЯ ПРОФИЛЯ ***/
const editProfilePopup = document.querySelector(".pop-up_content_edit-profile");
const editProfileForm = document.querySelector(".form_content_edit-profile");
const editProfileCloseButton = document.querySelector(".pop-up__close-button_content_edit");
const editProfileInputName = document.querySelector(".form__input_type_name");
const editProfileInputAbout = document.querySelector(".form__input_type_about");

/*** ПОП-АП ДОБАВЛЕНИЯ КАРТОЧКИ ***/
const addNewCardPopup = document.querySelector(".pop-up_content_add-card");
const addNewCardForm = document.querySelector(".form_content_add-card");
const addNewCardCloseButton = document.querySelector(".pop-up__close-button_content_add-card");
const addNewCardInputTitle = document.querySelector(".form__input_type_place");
const addNewCardInputLink = document.querySelector(".form__input_type_link");
const addNewCardSubmitButton = addNewCardPopup.querySelector(".form__submit-button");

/*** ПОП-АП ФУЛСАЙЗ ФОТКИ ***/
const fullSizeImagePopup = document.querySelector(".pop-up_content_image");
const fullSizeImagePopupCaption = document.querySelector(".pop-up__image-caption");
const fullSizeImagePopupPhoto = document.querySelector(".pop-up__big-image");
const fullSizeImageCloseButton = document.querySelector(".pop-up__close-button_content_image");

//открытие попапов
const openPopup = (popup) => {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keyup", closePopupWithEsc);
  popup.addEventListener("click", closePopupWithOverlayClick);
};

//закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keyup", closePopupWithEsc);
  popup.removeEventListener("click", closePopupWithOverlayClick);
};

//закрытие попапов через ESC
const closePopupWithEsc = (event) => {
  const activePopup = document.querySelector(".pop-up_opened");

  if (event.key === "Escape") {
    closePopup(activePopup);
  }
};

//закрытие попапов кликом по оверлею
const closePopupWithOverlayClick = (event) => {
  const activePopup = event.target;

  if (activePopup.closest(".pop-up__container")) {
    event.stopPropagation();
  } else if (activePopup.closest(".pop-up")) {
    closePopup(activePopup);
  }
};

//запись значений из формы редактирования в профиль
function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = editProfileInputName.value;
  profileAbout.textContent = editProfileInputAbout.value;
  closePopup(editProfilePopup);
}

//сборка и открытие попапа большой картинки
const composeFullSizeImagePopup = (name, link) => {
  fullSizeImagePopupCaption.textContent = name;
  fullSizeImagePopupPhoto.src = link;
  fullSizeImagePopupPhoto.alt = name;
  openPopup(fullSizeImagePopup);
};

//создание и публикация карточек
function createNewCard(item) {
  //создаем экземпляр класса карточки
  const card = new Card(item, ".card-template", composeFullSizeImagePopup);
  //создаем карточку и возвращаем наружу
  const cardElements = card.generateCard();
  //публикуем в DOM
  cardsContainerElement.prepend(cardElements);
}

//создание стартовых карточек
function initialCardList() {
  initialCards.forEach((item) => {
    createNewCard(item);
  });
}

initialCardList();

//создание новой карточки
function addNewCard(event) {
  event.preventDefault();
  //создаем объект новой карточки
  const newCard = { name: addNewCardInputTitle.value, link: addNewCardInputLink.value, templateSelector: ".card-template", handlePhotoClick: composeFullSizeImagePopup };

  createNewCard(newCard);
  closePopup(addNewCardPopup);
}


//слушатель открытия попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  //автозаполнение полей формы
  editProfileInputName.value = profileName.textContent;
  editProfileInputAbout.value = profileAbout.textContent;
});

//слушатель открытия попапа добавления новой карточки
addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
  addNewCardSubmitButton.classList.add('form__submit-button_state_invalid');
  addNewCardSubmitButton.disabled = true;
  addNewCardForm.reset();
});

//слушатели закрытия попапов
editProfileCloseButton.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

addNewCardCloseButton.addEventListener("click", () => {
  closePopup(addNewCardPopup);
});

fullSizeImageCloseButton.addEventListener("click", () => {
  closePopup(fullSizeImagePopup);
});

//слушатели сабмитов
editProfileForm.addEventListener("submit", submitEditProfileForm);
addNewCardForm.addEventListener("submit", addNewCard);

//включаем валидацию
function setValidation(formElement) {
  const validation = new FormValidator(validationConfig, formElement);
  validation.enableValidation();
}

setValidation(editProfilePopup);
setValidation(addNewCardPopup);