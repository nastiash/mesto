export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inputInvalidClass: "form__input_state_invalid",
  buttonInvalidClass: "form__submit-button_state_invalid",
};

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

/*** КНОПКИ ***/
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const submitButton = document.querySelector(".form__submit-button");

/*** ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ ***/
export const editProfilePopup = document.querySelector(".pop-up_content_edit-profile");
export const editProfileInputName = document.querySelector(".form__input_type_name");
export const editProfileInputAbout = document.querySelector(".form__input_type_about");

/*** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ ***/
export const addNewCardPopup = document.querySelector(".pop-up_content_add-card");
