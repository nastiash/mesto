let editProfileButton = document.querySelector('.profile__edit-button');
let profilePopup = document.querySelector('.pop-up');
let closeProfilePopup = document.querySelector('.pop-up__close-button');

editProfileButton.addEventListener('click', openPopup);
closeProfilePopup.addEventListener('click', closePopup);

let profileForm = document.querySelector('.pop-up__form');
let inputProfileName = document.querySelector('.pop-up__form-item_el_name');
let inputProfileCaption = document.querySelector('.pop-up__form-item_el_caption');
let submitProfileFormButton = document.querySelector('.pop-up__submit-button');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

profilePopup.addEventListener('submit', submitProfileForm);

// открыть и закрыть поп-ап
function openPopup() {
  profilePopup.classList.add('pop-up_opened');
  // автозаполнение полей формы
  inputProfileName.value = profileName.textContent;
  inputProfileCaption.value = profileCaption.textContent;
}

function closePopup() {
  profilePopup.classList.remove('pop-up_opened');
}

// запись значений из формы в профиль
function submitProfileForm (event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileCaption.value;
  profilePopup.classList.remove('pop-up_opened');
}