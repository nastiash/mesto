
/*** ЭЛЕМЕНТЫ ПРОФИЛЯ ***/
const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");

/*** ЭЛЕМЕНТЫ КАРТОЧЕК ***/
const cardsContainerElement = document.querySelector(".cards");
const cardTemplateElement = document.querySelector(".card-template");

/*** ЭЛЕМЕНТЫ ФОРМ ***/
const form = document.querySelector(".pop-up__form");
const formElement = document.querySelector(".pop-up__form-container");
const formInput = formElement.querySelector(".pop-up__form-input");
// Выбираем элемент ошибки на основе уникального класса
const formError = formElement.querySelector(`.pop-up__form-${formInput.id}-error`);
console.log(formInput.id);
console.log(formError);

/*** ПОП-АП РЕДАКТИРОВАНИЯ ПРОФИЛЯ ***/
const editProfilePopup = document.querySelector(".pop-up_content_edit-profile");
const editProfileForm = document.querySelector(".pop-up__form_content_edit-profile");
const editProfileCloseButton = document.querySelector(".pop-up__close-button_content_edit");
const editProfileInputName = document.querySelector(".pop-up__form-input_el_name");
const editProfileInputCaption = document.querySelector(".pop-up__form-input_el_caption");

/*** ПОП-АП ДОБАВЛЕНИЯ КАРТОЧКИ ***/
const addNewCardPopup = document.querySelector(".pop-up_content_add-card");
const addNewCardForm = document.querySelector(".pop-up__form_content_add-card");
const addNewCardCloseButton = document.querySelector(".pop-up__close-button_content_add-card");
const addNewCardInputTitle = document.querySelector(".pop-up__form-input_el_place");
const addNewCardInputLink = document.querySelector(".pop-up__form-input_el_link");

/*** ПОП-АП ФУЛЛ-САЙЗ ФОТКИ ***/
const fullSizeImagePopup = document.querySelector(".pop-up_content_image");
const fullSizeImageCloseButton = document.querySelector(".pop-up__close-button_content_image");
const fullSizeImagePopupCaption = document.querySelector(".pop-up__text");
const fullSizeImagePopupPhoto = document.querySelector(".pop-up__big-image");


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
  profileCaption.textContent = editProfileInputCaption.value;
  closePopup(editProfilePopup);
}

//массив с карточками
const initialCards = [
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

//удалить карточку
function deleteCard(event) {
  event.target.closest(".card").remove();
}

//собрать и открыть попап большой картинки
const composeFullSizeImagePopup = (name, link) => {
  openPopup(fullSizeImagePopup);
  fullSizeImagePopupCaption.textContent = name;
  fullSizeImagePopupPhoto.src = link;
  fullSizeImagePopupPhoto.alt = name;
};

//собрать карточку
function composeCard({ name, link }) {
  const newItem = cardTemplateElement.content.cloneNode(true);
  const cardTitle = newItem.querySelector(".card__title");
  const cardPhoto = newItem.querySelector(".card__photo");
  const cardLike = newItem.querySelector(".card__like-button");
  const cardDeleteButton = newItem.querySelector(".card__delete-button");
  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  //открытие попапа с картинкой
  cardPhoto.addEventListener("click", () => {
    composeFullSizeImagePopup(name, link);
  });
  //лайк
  cardLike.addEventListener("click", () => {
    cardLike.classList.toggle("card__like-button_active");
  });
  //удаление элемента
  cardDeleteButton.addEventListener("click", deleteCard);
  return newItem;
}

//отрисовка стартовых карточек
function renderCardList() {
  const cardItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardItems);
}

renderCardList();

//добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const newCard = composeCard({ name: addNewCardInputTitle.value, link: addNewCardInputLink.value });
  cardsContainerElement.prepend(newCard);
  addNewCardInputTitle.value = "";
  addNewCardInputLink.value = "";
  closePopup(addNewCardPopup);
}

/*
//валидация
// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
*/

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(inputElement.id);
  formElement.classList.add('pop-up__form-input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('pop-up__form-input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  formElement.classList.remove('pop-up__form-input_type_error');
  errorElement.classList.remove('pop-up__form-input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const checkInputValidity = () => {
  if (!formInput.validity.valid) {
    showInputError(form, formInput, formInput.validationMessage);
} else {
  hideInputError(form, formInput);
  }
};

//слушатели валидации


form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});
/*

formInput.addEventListener('input', isValid);

editProfileForm.addEventListener('submit', function (event) {
  event.preventDefault();
});

addNewCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
});

addNewCardInputTitle.addEventListener('input', function (event) {
  console.log(event.target.validity);
});

addNewCardInputLink.addEventListener('input', function (event) {
  console.log(event.target.validity);
});

editProfileInputName.addEventListener('input', function (event) {
  console.log(event.target.validity);
});

editProfileInputCaption.addEventListener('input', function (event) {
  console.log(event.target.validity);
});

*/















//слушатели открытия попапов
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  //автозаполнение полей формы
  editProfileInputName.value = profileName.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

addNewCardButton.addEventListener("click", () => {
  openPopup(addNewCardPopup);
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

/*
//слушатели закрытия по оверлею
editProfilePopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_edit-profile")) closePopup(editProfilePopup);
});

addNewCardPopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_add-card")) closePopup(addNewCardPopup);
});

fullSizeImagePopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_image")) closePopup(fullSizeImagePopup);
});
*/

//слушатели закрытия попапов по ESC
/*
  document.addEventListener("keyup", (event) => {
  const activePopup = document.querySelector(".pop-up_opened");
  console.log(activePopup);
  if (event.key === "Escape" && activePopup != null) closePopup(activePopup);
});
*/
