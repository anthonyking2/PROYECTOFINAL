/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { stays } from './stays.js';

/// RENDERIZAR CARDS
const staysContainer = document.getElementById('stays-container');
const resultsCount = document.getElementById('results-count');

function renderStays(filteredStays) {
  staysContainer.innerHTML = '';
  resultsCount.textContent = `${filteredStays.length} stays`;

  filteredStays.forEach(stay => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-2xl shadow-md p-4 flex flex-col h-full";

    card.innerHTML = `
      <img src="${stay.photo}" alt="${stay.title}" class="w-full h-64 object-cover rounded-2xl mb-3">
      <div class="flex items-center justify-between text-sm text-gray-500">
        <div class="flex items-center gap-2">
          ${stay.superHost ? `<span class="border border-gray-400 text-gray-800 font-bold text-xs px-2 py-1 rounded-full uppercase bg-white">Super host</span>` : ''}
          <span>${stay.type}${stay.beds !== null ? ` · ${stay.beds} beds` : ''}</span>
        </div>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 
            9.24l-7.19-.61L12 2 9.19 8.63 2 
            9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span class="text-gray-800 font-medium">${stay.rating}</span>
        </div>
      </div>
      <h2 class="mt-1 font-semibold text-lg text-gray-900 px-1">${stay.title}</h2>
    `;

    staysContainer.appendChild(card);
  });
}

renderStays(stays);
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('search-modal');
const currentLocation = document.getElementById('current-location');
const currentGuests = document.getElementById('current-guests');

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
  updateGuestsSummary();
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

//// CONTADOR
let adults = 0;
let children = 0;

const adultsCount = document.getElementById('adults-count');
const childrenCount = document.getElementById('children-count');
const plusAdults = document.getElementById('plus-adults');
const minusAdults = document.getElementById('minus-adults');
const plusChildren = document.getElementById('plus-children');
const minusChildren = document.getElementById('minus-children');
const guestsSummary = document.getElementById('guests-summary');

function updateGuestsSummary() {
  const total = adults + children;
  guestsSummary.value = total === 0 ? "Add guests" : `${total} guest${total > 1 ? 's' : ''}`;
}

plusAdults.addEventListener('click', () => {
  adults++;
  adultsCount.textContent = adults;
  updateGuestsSummary();
});
minusAdults.addEventListener('click', () => {
  if (adults > 0) adults--;
  adultsCount.textContent = adults;
  updateGuestsSummary();
});
plusChildren.addEventListener('click', () => {
  children++;
  childrenCount.textContent = children;
  updateGuestsSummary();
});
minusChildren.addEventListener('click', () => {
  if (children > 0) children--;
  childrenCount.textContent = children;
  updateGuestsSummary();
});

/// CIUDADES
const uniqueCities = [...new Set(stays.map(s => `${s.city}, ${s.country}`))];

const cityInput = document.getElementById('city');
const locationOptions = document.getElementById('location-options');
cityInput.addEventListener('input', function () {
  const value = this.value.trim().toLowerCase();
  if (!value) {
    locationOptions.classList.add('hidden');
    locationOptions.innerHTML = '';
    return;
  }
  const filtered = uniqueCities.filter(city =>
    city.toLowerCase().includes(value)
  );
  if (filtered.length === 0) {
    locationOptions.classList.add('hidden');
    locationOptions.innerHTML = '';
    return;
  }
  locationOptions.innerHTML = filtered.map(city => `
    <button type="button" class="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-xl transition gap-2">
      <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"></path></svg>
      <span>${city}</span>
    </button>
  `).join('');
  locationOptions.classList.remove('hidden');
});
locationOptions.addEventListener('click', function (e) {
  const btn = e.target.closest('button');
  if (!btn) return;
  const city = btn.querySelector('span').textContent;
  cityInput.value = city;
  locationOptions.classList.add('hidden');
  locationOptions.innerHTML = '';
});

/// DROPDOWN
document.addEventListener('click', (e) => {
  if (
    !cityInput.contains(e.target) &&
    !locationOptions.contains(e.target)
  ) {
    locationOptions.classList.add('hidden');
  }
});

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let cityValue = cityInput.value.trim().toLowerCase();
  if (cityValue.includes(',')) cityValue = cityValue.split(',')[0].trim();

  const guests = adults + children;

  const filtered = stays.filter(stay => {
    const matchCity = cityValue === "" || stay.city.toLowerCase() === cityValue;
    const matchGuests = guests === 0 || stay.maxGuests >= guests;
    return matchCity && matchGuests;
  });

  renderStays(filtered);
  currentLocation.textContent = cityInput.value ? cityInput.value : "Add location";
  currentGuests.textContent = guests > 0 ? `${guests} guests` : "Add guests";
  modal.classList.add('hidden');
});

