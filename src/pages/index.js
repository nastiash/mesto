// добавляем импорт главного файла стилей
import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirm } from "../components/PopupWithConfirm.js";
import { Api } from "../components/Api.js";

import { validationConfig,
         cardConfig,
         editProfileButton,
         addNewCardButton,
         editProfilePopup,
         editProfileInputName,
         editProfileInputAbout,
         addNewCardPopup,
         changeAvatarPopup,
         changeAvatarButton} from "../utils/constants.js";

//https://i.ibb.co/TTVhhJ0/sb.jpg

//информация профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

//карточки
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createNewCard(data);
      const cardElement = card.generateCard();
      //она там и была уже реализована, получается задублировала =)
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);

//апи
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "c2b5de8d-b686-4636-b034-3279d66783c0",
    "Content-Type": "application/json",
  },
});



//отрисовка начальных данных
export let ownerId = null;

api
  .getInitialInfo()
  .then((data) => {
    const [userData, cardsData] = data;
    ownerId = userData._id;
    userInfo.setInitialInfo(userData);
    cardList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(err);
  });

//удаление карточек
export let cardToDelete = null;

const popupWithConfirmDelete = new PopupWithConfirm(
  {
    handleFormSubmit: (data) => {
      api
        .deleteCard(data)
        .then(() => {
          cardToDelete.handleDeleteCard();
        })
        .then(() => {
          cardToDelete = null;
          popupWithConfirmDelete.closePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  ".pop-up_content_delete-card"
);

//зум картинки
const popupWithImage = new PopupWithImage(".pop-up_content_image");

//создание новой карточки
const createNewCard = (data) => {
  const card = new Card(data, cardConfig, ".card-template", ownerId, {
    handlePhotoClick: (data) => {
      popupWithImage.openPopup(data);
    },
    handleDeleteCard: () => {
      cardToDelete = card;
      popupWithConfirmDelete.openPopup(data);
    },
    setLike: (data) => {
      api
        .setLike(data)
        .then((data) => {
          card.setLikesCounter(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteLike: (data) => {
      api
        .deleteLike(data)
        .then((data) => {
          card.setLikesCounter(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return card;
};

//попап новой карточки
const popupWithAddCardForm = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupWithAddCardForm.loadingInfo(true);
      api
        .addCard(data)
        .then((res) => {
          const card = createNewCard(res);
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithAddCardForm.loadingInfo(false);
          popupWithAddCardForm.closePopup();
        });
    },
  },
  ".pop-up_content_add-card"
);

//попап с информацией пользователя
const popupWithUserInfo = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupWithUserInfo.loadingInfo(true);
      api
        .setUserInfo(data)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithUserInfo.loadingInfo(false);
          popupWithUserInfo.closePopup();
        });
    },
  },
  ".pop-up_content_edit-profile"
);

//попап изменения аватара
const popupWithAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupWithAvatar.loadingInfo(true);
      api
        .setUserAvatar(data)
        .then((res) => {
          userInfo.setUserAvatar(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithAvatar.loadingInfo(false);
          popupWithAvatar.closePopup();
        });
    },
  },
  ".pop-up_content_change-avatar"
);

//слушатели
addNewCardButton.addEventListener("click", () => {
  popupWithAddCardForm.openPopup();
});

changeAvatarButton.addEventListener("click", () => {
  popupWithAvatar.openPopup();
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
setValidation(changeAvatarPopup);
