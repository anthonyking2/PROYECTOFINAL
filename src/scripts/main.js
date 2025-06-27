/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { stays } from './src/scripts/stays.js';

document.addEventListener('DOMContentLoaded', () => {
  const staysContainer = document.getElementById('stays-container');
  const resultsCount = document.getElementById('results-count');

  resultsCount.textContent = `${stays.length}+ stays`;

  stays.forEach(stay => {
    const card = document.createElement('div');
    card.className = "rounded-lg overflow-hidden shadow-sm";

    card.innerHTML = `
      <img src="${stay.photo}" alt="${stay.title}" class="w-full h-60 object-cover rounded-lg">
      <div class="mt-2 flex items-center justify-between text-sm text-gray-500">
        ${stay.superHost ? '<span class="border border-gray-500 text-gray-500 font-bold text-xs px-2 py-1 rounded-full mr-2">SUPER HOST</span>' : ''}
        <span>${stay.type}${stay.beds !== null ? ` · ${stay.beds} beds` : ''}</span>
        <span class="ml-auto flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
              6.42 3.42 5 5.5 5c1.54 0 
              3.04.99 3.57 2.36h1.87C13.46 
              5.99 14.96 5 16.5 
              5 18.58 5 20 6.42 20 
              8.5c0 3.78-3.4 6.86-8.55 
              11.54L12 21.35z"/>
          </svg>
          ${stay.rating}
        </span>
      </div>
      <h2 class="mt-1 font-semibold text-sm">${stay.title}</h2>
    `;

    staysContainer.appendChild(card);
  });
});
