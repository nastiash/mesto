//открыть попап редактирования профиля
const editPopup = document.querySelector('.pop-up_content_edit-profile');
const editButton = document.querySelector('.profile__edit-button');

function openEditPopup() {
  editPopup.classList.add('pop-up_opened');
  // автозаполнение полей формы
  inputProfileName.value = profileName.textContent;
  inputProfileCaption.value = profileCaption.textContent;
}

//закрыть попап редактирования профиля
const closeEditButton = document.querySelector('.pop-up__close-button');

function closeEditPopup() {
  editPopup.classList.remove('pop-up_opened');
}

// запись значений из формы редактирования в профиль
const inputProfileName = document.querySelector('.pop-up__form-item_el_name');
const inputProfileCaption = document.querySelector('.pop-up__form-item_el_caption');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

function submitProfileForm (event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileCaption.value;
  closeEditPopup();
}

//открыть попап добавления карточки
const addPopup = document.querySelector('.pop-up_content_add-card');
const addButton = document.querySelector('.profile__add-button');

function openAddPopup() {
  addPopup.classList.add('pop-up_opened');
}

//закрыть попап добавления карточки
const closeAddButton = document.querySelector('.pop-up__close-button_content_add-card');

function closeAddPopup() {
  addPopup.classList.remove('pop-up_opened');
}

//массив с карточками
const initialCards = [
  {
      name: 'Бикини Боттом',
      link: 'https://i.ibb.co/NLKw6WG/bikini-bottom.jpg',
  },
  {
      name: 'Красти Планктон',
      link: 'https://i.ibb.co/c8Ct20y/krusty-plankton.jpg',
  },
  {
      name: 'Тюрьма 😱',
      link: 'https://i.ibb.co/HBqnT4G/Jail.jpg',
  },
  {
      name: 'Поля медуз',
      link: 'https://i.ibb.co/7JKD50c/jellyfish-fields.jpg',
  },
  {
      name: 'Дом Белки',
      link: 'https://i.ibb.co/QJ5QGWY/squirrel.jpg',
  },
  {
      name: 'Красти Краб',
      link: 'https://i.ibb.co/znZGSMp/krusty-krab.jpg',
  }
];

const cardsContainerElement = document.querySelector('.cards'); //находим контейнер, куда будем добавлять карточки
const templateElement = document.querySelector('.card-template'); //находим шаблон

//отрисовка стартовых карточек
function renderCardList() {
  const cardItems = initialCards.map(composeCard);
  cardsContainerElement.append(...cardItems);
}

function composeCard({name, link}) {
  const newItem = templateElement.content.cloneNode(true);
  const cardTitle = newItem.querySelector('.card__title');
  const cardPhoto = newItem.querySelector('.card__photo');
  const cardLike = newItem.querySelector('.card__like-button');
  const cardDeleteButton = newItem.querySelector('.card__delete-button');
  cardTitle.textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;
  //открытие попапа с картинкой
  cardPhoto.addEventListener('click', () => {
    composeImagePopup(name, link);
  });
  //лайк
  cardLike.addEventListener('click', () => {
    cardLike.classList.toggle('card__like-button_active');
  });
  //удаление элемента
  cardDeleteButton.addEventListener('click', cardDelete);
  return newItem;
}

renderCardList();

//добавление новой карточки
function addNewCard(event) {
  event.preventDefault();
  const inputTitle = document.querySelector('.pop-up__form-item_el_place');
  const inputLink = document.querySelector('.pop-up__form-item_el_link');
  const newCard = composeCard({name : inputTitle.value, link : inputLink.value})
  cardsContainerElement.prepend(newCard);
  inputTitle.value = '';
  inputLink.value = '';
  closeAddPopup();
}


//собрать и открыть попап большой картинки
const imagePopup = document.querySelector('.pop-up_content_image');

const composeImagePopup = (name, link) => {
  openImagePopup();
      const popupText = imagePopup.querySelector('.pop-up__text');
      const popupPhoto = imagePopup.querySelector('.pop-up__big-image');
      popupText.textContent = name;
      popupPhoto.src = link;
      popupPhoto.alt = name;
  };

//открыть попап большой картинки
function openImagePopup() {
  imagePopup.classList.add('pop-up_opened');
}

//закрыть попап большой картинки
const closeImageButton = document.querySelector('.pop-up__close-button_content_image');

function closeimagePopup() {
  imagePopup.classList.remove('pop-up_opened');
}

//удалить карточку
function cardDelete(event){
  const targetItem = event.target.closest('.card');
  targetItem.remove();
}

// слушатели
editButton.addEventListener('click', openEditPopup); //открытие попапа редактирования
closeEditButton.addEventListener('click', closeEditPopup); //закрытие попапа редактирования
editPopup.addEventListener('submit', submitProfileForm); //сабмит попапа редактирования

addButton.addEventListener('click', openAddPopup); //открытие попапа добавления карточки
closeAddButton.addEventListener('click', closeAddPopup); //закрытие попапа добавления карточки
addPopup.addEventListener('submit', addNewCard); //сабмит попапа добавления карточки

closeImageButton.addEventListener('click', closeimagePopup); //закрытие попапа большой картинки
