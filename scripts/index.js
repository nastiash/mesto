/*** ЭЛЕМЕНТЫ ПРОФИЛЯ ***/
const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

/*** ЭЛЕМЕНТЫ КАРТОЧЕК ***/
const cardsContainerElement = document.querySelector(".cards");
const cardsTemplateElement = document.querySelector(".card-template");

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
const fullSizeImageCloseButton = document.querySelector(".pop-up__close-button_content_image");
const fullSizeImagePopupCaption = document.querySelector(".pop-up__image-caption");
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
  profileAbout.textContent = editProfileInputAbout.value;
  closePopup(editProfilePopup);
}

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
  const newItem = cardsTemplateElement.content.cloneNode(true);
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

//слушатели открытия попапов
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  //автозаполнение полей формы
  editProfileInputName.value = profileName.textContent;
  editProfileInputAbout.value = profileAbout.textContent;
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