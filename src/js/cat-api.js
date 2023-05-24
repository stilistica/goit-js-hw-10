const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_ehvX1JCmEprsriNMrj3JT0T8UQlJxWfRtfLZmBluyY6kKEkvTX4k7OV8ufdgcILt';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error('Запит не виконано');
      return res.json();
    })
    .then(data => {
      return data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    });
};

export const fetchCatByBreed = (breedId) => {
  return fetch(`${BASE_URL}/images/search?breeds_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error('Запит не виконано');
      return res.json();
    })
    .then(data => {
      const cat = data[0];
      return {
        url: cat.url,
        name: cat.breeds[0].name,
        description: cat.breeds[0].description,
        temperament: cat.breeds[0].temperament,
      };
    });
};
