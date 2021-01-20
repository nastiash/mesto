import { Card, initialCards } from "./Card.js";
import { FormValidator } from "./FormValidator.js"

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
const editProfileSubmitButton = editProfilePopup.querySelector(".form__submit-button");
const editProfileInputList = editProfileForm.querySelectorAll(".form__input");
const editProfileInputName = document.querySelector(".form__input_type_name");
const editProfileInputAbout = document.querySelector(".form__input_type_about");

/*** ПОП-АП ДОБАВЛЕНИЯ КАРТОЧКИ ***/
const addNewCardPopup = document.querySelector(".pop-up_content_add-card");
const addNewCardForm = document.querySelector(".form_content_add-card");
const addNewCardCloseButton = document.querySelector(".pop-up__close-button_content_add-card");
const addNewCardSubmitButton = addNewCardPopup.querySelector(".form__submit-button");
const addNewCardInputList = addNewCardPopup.querySelectorAll(".form__input");
const addNewCardInputTitle = document.querySelector(".form__input_type_place");
const addNewCardInputLink = document.querySelector(".form__input_type_link");

/*** ПОП-АП ФУЛСАЙЗ ФОТКИ ***/
const fullSizeImagePopup = document.querySelector(".pop-up_content_image");
const fullSizeImagePopupCaption = document.querySelector(".pop-up__image-caption");
const fullSizeImagePopupPhoto = document.querySelector(".pop-up__big-image");
const fullSizeImageCloseButton = document.querySelector(".pop-up__close-button_content_image");

// открытие попапов
const openPopup = (popup) => {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keyup", closePopupWithEsc);
  popup.addEventListener("click", closePopupWithOverlayClick);
};

// закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keyup", closePopupWithEsc);
  popup.removeEventListener("click", closePopupWithOverlayClick);
};

// закрытие попапов через ESC
const closePopupWithEsc = (event) => {
  const activePopup = document.querySelector(".pop-up_opened");
  if (event.key === "Escape") closePopup(activePopup);
};

//закрытие попапов кликом по оверлею
const closePopupWithOverlayClick = (event) => {
  const activePopup = event.target;
  if (activePopup.closest(".pop-up__container")) event.stopPropagation();
  else if (activePopup.closest(".pop-up")) closePopup(activePopup);
};

// запись значений из формы редактирования в профиль
function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = editProfileInputName.value;
  profileAbout.textContent = editProfileInputAbout.value;
  closePopup(editProfilePopup);
}

//собрать и открыть попап большой картинки
const composeFullSizeImagePopup = (name, link) => {
  openPopup(fullSizeImagePopup);
  fullSizeImagePopupCaption.textContent = name;
  fullSizeImagePopupPhoto.src = link;
  fullSizeImagePopupPhoto.alt = name;
};

//отображение стартовых карточек
function renderCardList() {
  initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, ".card-template", composeFullSizeImagePopup);
    // Создаём карточку и возвращаем наружу
    const cardElements = card.generateCard();
    // Добавляем в DOM
    cardsContainerElement.append(cardElements);
  });
}

renderCardList();

//добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const card = new Card(addNewCardInputTitle.value, addNewCardInputLink.value, ".card-template", composeFullSizeImagePopup);
  console.log(card);
  const cardElement = card.generateCard();
  cardsContainerElement.prepend(cardElement);
  closePopup(addNewCardPopup);
}

//слушатели открытия попапов
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  //автозаполнение полей формы
  editProfileInputName.value = profileName.textContent;
  editProfileInputAbout.value = profileAbout.textContent;
  //установка состояния кнопки
  setButtonState(editProfileSubmitButton, editProfileForm.checkValidity(), validationConfig);
  //удаление сообщений об ошибке
  editProfileInputList.forEach((input) => {
    hideError(editProfileForm, input, validationConfig);
  });
});

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
  addNewCardForm.reset();
  //установка состояния кнопки
  setButtonState(addNewCardSubmitButton, addNewCardForm.checkValidity(), validationConfig);
  //удаление сообщений об ошибке
  addNewCardInputList.forEach((input) => {
    hideError(addNewCardForm, input, validationConfig);
  });
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
