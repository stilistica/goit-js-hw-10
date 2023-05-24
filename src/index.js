import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),

  catImage: document.querySelector('.cat-info img'),
  catName: document.querySelector('.cat-info h2'),
  catDescription: document.querySelector('.cat-info .cat-description'),
  catTemperament: document.querySelector('.cat-info .cat-temperament'),
};

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      refs.breedSelect.appendChild(option);
    });
  })
  .catch(() => {
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
      .catch(() => {
        showError();
      });
  } else {
    hideCatInfo();
  }
});

function displayCatInfo(cat) {
  refs.catImage.src = cat.url;
  refs.catName.textContent = cat.name;
  refs.catDescription.textContent = `Description: ${cat.description}`;
  refs.catTemperament.textContent = `Temperament: ${cat.temperament}`;
  showCatInfo();
  hideLoader();
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