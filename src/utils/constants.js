export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inputInvalidClass: "form__input_state_invalid",
  buttonInvalidClass: "form__submit-button_state_invalid",
};

export const cardConfig = {
  cardImageSelector: ".card__photo",
  cardTitleSelector: ".card__title",
  cardDeleteButtonSelector: ".card__delete-button",
  cardLikeButtonSelector: ".card__like",
  cardLikesCounterSelector: ".card__like-counter"
}

/*** КНОПКИ ***/
export const editProfileButton = document.querySelector(".profile__edit-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const changeAvatarButton = document.querySelector(".profile__avatar_edit-button");

/*** ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ ***/
export const editProfilePopup = document.querySelector(".pop-up_content_edit-profile");
export const editProfileInputName = document.querySelector(".form__input_type_name");
export const editProfileInputAbout = document.querySelector(".form__input_type_about");

/*** ПОПАП ИЗМЕНЕНИЯ АВАТАРА ***/
export const changeAvatarPopup = document.querySelector(".pop-up_content_change-avatar");

/*** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ ***/
export const addNewCardPopup = document.querySelector(".pop-up_content_add-card");
