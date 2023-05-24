import SlimSelect from 'slim-select';
// new SlimSelect({
//   select: '.breed-select',
// });

import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(breed => ({
      value: breed.id,
      text: breed.name,
    }));
    // breedOptions.unshift({ value: '', text: 'Оберіть кота' });

    new SlimSelect({
      select: refs.breedSelect,
      data: breedOptions,
      placeholder: 'Select a breed',
    });
  })
  .catch(error => {
    console.log(error);
    showError();
  });


refs.breedSelect.addEventListener('change', () => {
  const selectedBreedId = refs.breedSelect.value;
  if (selectedBreedId) {
    showLoader();
    hideError();
    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
      })
      .catch(error => {
        console.log(error);
        showError();
      });
  } else {
    hideCatInfo();
  }
});

function displayCatInfo(cat) {
  const catInfo = createCatInfoElement(cat);
  refs.catInfo.innerHTML = '';
  refs.catInfo.appendChild(catInfo);
  showCatInfo();
  hideLoader();
}
function createCatInfoElement({ url, name, description, temperament }) {
  const catInfo = document.createElement('div');
  catInfo.innerHTML = `
  <img src="${url}" alt="${name}">
    <h2>${name}</h2>
    <p>Description: ${description}</p>
    <p>Temperament: ${temperament}</p>`;
  return catInfo;
}

function showLoader() {
  refs.loader.style.display = 'block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

function showError() {
  refs.error.style.display = 'block';
}

function hideError() {
  refs.error.style.display = 'none';
}

function showCatInfo() {
  refs.catInfo.style.display = 'block';
}

function hideCatInfo() {
  refs.catInfo.style.display = 'none';
}
