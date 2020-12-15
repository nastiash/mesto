const editPopup = document.querySelector(".pop-up_content_edit-profile");
const addPopup = document.querySelector(".pop-up_content_add-card");
const imagePopup = document.querySelector(".pop-up_content_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileForm = document.querySelector(".pop-up__form_content_edit-profile");
const createCardForm = document.querySelector(".pop-up__form_content_add-card");

const editCloseButton = document.querySelector(".pop-up__close-button_content_edit");
const addCloseButton = document.querySelector(".pop-up__close-button_content_add-card");
const imageCloseButton = document.querySelector(".pop-up__close-button_content_image");

const cardsContainerElement = document.querySelector(".cards");
const templateElement = document.querySelector(".card-template");

const inputTitle = document.querySelector(".pop-up__form-item_el_place");
const inputLink = document.querySelector(".pop-up__form-item_el_link");
const inputProfileName = document.querySelector(".pop-up__form-item_el_name");
const inputProfileCaption = document.querySelector(".pop-up__form-item_el_caption");

const popupText = imagePopup.querySelector(".pop-up__text");
const popupPhoto = imagePopup.querySelector(".pop-up__big-image");
const profileName = document.querySelector(".profile__name");
const profileCaption = document.querySelector(".profile__caption");

const popup = document.querySelector(".pop-up");
const popupContainer = document.querySelector(".pop-up__container");

// открытие попапа
const openPopup = (popup) => {
  popup.classList.add("pop-up_opened");
};

// закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove("pop-up_opened");
};

// запись значений из формы редактирования в профиль
function submitProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileCaption.value;
  closePopup(editPopup);
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
const composeImagePopup = (name, link) => {
  openPopup(imagePopup);
  popupText.textContent = name;
  popupPhoto.src = link;
  popupPhoto.alt = name;
};

//собрать карточку
function composeCard({ name, link }) {
  const newItem = templateElement.content.cloneNode(true);
  const cardTitle = newItem.querySelector(".card__title");
  const cardPhoto = newItem.querySelector(".card__photo");
  const cardLike = newItem.querySelector(".card__like-button");
  const cardDeleteButton = newItem.querySelector(".card__delete-button");
  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  //открытие попапа с картинкой
  cardPhoto.addEventListener("click", () => {
    composeImagePopup(name, link);
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
  const newCard = composeCard({ name: inputTitle.value, link: inputLink.value });
  cardsContainerElement.prepend(newCard);
  inputTitle.value = "";
  inputLink.value = "";
  closePopup(addPopup);
}


// слушатели открытия попапов
editButton.addEventListener("click", () => {
  openPopup(editPopup);
  // автозаполнение полей формы
  inputProfileName.value = profileName.textContent;
  inputProfileCaption.value = profileCaption.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addPopup);
});

// слушатели закрытия попапов
editCloseButton.addEventListener("click", () => {
  closePopup(editPopup);
});

addCloseButton.addEventListener("click", () => {
  closePopup(addPopup);
});

imageCloseButton.addEventListener("click", () => {
  closePopup(imagePopup);
});

//слушатели закрытия по оверлею
editPopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_edit-profile")) closePopup(editPopup);
});

addPopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_add-card")) closePopup(addPopup);
});

imagePopup.addEventListener("click", function (event) {
  const target = event.target;
  if (target.closest(".pop-up__container")) event.stopPropagation();
  else if (target.closest(".pop-up_content_image")) closePopup(imagePopup);
});

//слушатели закрытия попапов по ESC
document.addEventListener("keyup", (event) => {
  const activePopup = document.querySelector(".pop-up_opened");
  console.log(activePopup);
  if (event.key === "Escape" && activePopup != null) closePopup(activePopup);
});

// слушатели сабмитов
profileForm.addEventListener("submit", submitProfileForm);
createCardForm.addEventListener("submit", addNewCard);
