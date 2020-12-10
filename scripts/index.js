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
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1540886955408-0307191f4139',
  },
  {
      name: 'Хельсинки',
      link: 'https://images.unsplash.com/photo-1545302207-884aa31e4265',
  },
  {
      name: 'Мальдивские острова',
      link: 'https://images.unsplash.com/photo-1561571994-3c61c554181a',
  },
  {
      name: 'Сингапур',
      link: 'https://images.unsplash.com/photo-1450170391895-b790726e2318',
  },
  {
      name: 'Токио',
      link: 'https://images.unsplash.com/photo-1580094573009-7a220cc896b2',
  },
  {
      name: 'Владивосток',
      link: 'https://images.unsplash.com/photo-1530454792524-93bc6f892426',
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
  cardTitle.textContent = name;
  cardPhoto.src = link;
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

//лайки
const likeButtonList = document.querySelectorAll('.card__like-button');

function likeCard(event) {
  const targetLikeButton = event.target.closest('.card__like-button');
  targetLikeButton.classList.toggle('.card__like-button:active');
}

// слушатели
editButton.addEventListener('click', openEditPopup); //открытие попапа редактирования
closeEditButton.addEventListener('click', closeEditPopup); //закрытие попапа редактирования
editPopup.addEventListener('submit', submitProfileForm); //сабмит попапа редактирования

addButton.addEventListener('click', openAddPopup); //открытие попапа добавления карточки
closeAddButton.addEventListener('click', closeAddPopup); //закрытие попапа добавления карточки
addPopup.addEventListener('submit', addNewCard); //сабмит попапа добавления карточки

likeButtonList.forEach(() => {addEventListener('click', likeCard)});