import { Card, initialCards } from "./Card.js";
import { FormValidator, validationConfig } from "./FormValidator.js";

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

//отображение стартовых карточек
function renderCardList() {
  initialCards.forEach((item) => {
    //создаем экземпляр класса карточки
    const card = new Card(item.name, item.link, ".card-template", composeFullSizeImagePopup);
    //создаем карточку и возвращаем наружу
    const cardElements = card.generateCard();
    //добавляем в DOM
    cardsContainerElement.append(cardElements);
  });
}

renderCardList();

//добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const card = new Card(addNewCardInputTitle.value, addNewCardInputLink.value, ".card-template", composeFullSizeImagePopup);
  const cardElement = card.generateCard();
  cardsContainerElement.prepend(cardElement);
  closePopup(addNewCardPopup);
}

//удаление ошибок при ресете попапа
function deleteErrors(popup) {
  const inputList = popup.querySelectorAll(".form__input");
  const errorList = popup.querySelectorAll(".form__input-error");

  inputList.forEach((input) => {
    input.classList.remove('form__input_state_invalid');
  });

  errorList.forEach((error) => {
    error.textContent = "";
  });
}

//слушатель открытия попапа редактирования профиля
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  //автозаполнение полей формы
  editProfileInputName.value = profileName.textContent;
  editProfileInputAbout.value = profileAbout.textContent;
  //убираем ошибки
  deleteErrors(editProfilePopup);
  //включаем валидацию
  const validation = new FormValidator(validationConfig, editProfilePopup);
  validation.enableValidation();
});

//слушатель открытия попапа добавления новой карточки
addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
  addNewCardForm.reset();
  //убираем ошибки
  deleteErrors(addNewCardPopup);
  //включаем валидацию
  const validation = new FormValidator(validationConfig, addNewCardPopup);
  validation.enableValidation();
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
