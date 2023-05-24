import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
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
  const catInfo = document.createElement('div');
  catInfo.classList.add('cat-info');

  const catImage = document.createElement('img');
  catImage.src = cat.url;

  const catName = document.createElement('h2');
  catName.textContent = cat.name;

  const catDescription = document.createElement('p');
  catDescription.textContent = `Description: ${cat.description}`;

  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${cat.temperament}`;

  catInfo.appendChild(catImage);
  catInfo.appendChild(catName);
  catInfo.appendChild(catDescription);
  catInfo.appendChild(catTemperament);

  refs.catInfo.innerHTML = '';
  refs.catInfo.appendChild(catInfo);
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
