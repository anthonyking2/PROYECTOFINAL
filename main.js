import stays from './stays.js';
import { renderStays } from './ui.js';

const cityInput = document.getElementById('city-input');
const guestsInput = document.getElementById('guests-input');
const searchBtn = document.getElementById('search-btn');
const results = document.getElementById('results');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim().toLowerCase();
  const guests = parseInt(guestsInput.value) || 1;

  const filteredStays = stays.filter(stay => {
    const stayCity = stay.city.toLowerCase();
    return stayCity.includes(city) && stay.maxGuests >= guests;
  });

  renderStays(filteredStays);
});

// Mostrar todos al cargar
renderStays(stays);
