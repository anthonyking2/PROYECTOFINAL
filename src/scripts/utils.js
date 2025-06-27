/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */


export function filterStays(stays, location, guests) {
  return stays.filter(stay => {
    const matchesLocation = !location || stay.city.toLowerCase().includes(location);
    const matchesGuests = !guests || stay.maxGuests >= guests;
    return matchesLocation && matchesGuests;
  });
}

export function renderStays(stays) {
  const container = document.getElementById('stays-container');
  const countElement = document.getElementById('stays-count');
  countElement.textContent = `${stays.length}+ stays`;
  container.innerHTML = stays.map(stay => `
    <div class="bg-white rounded-xl overflow-hidden shadow-md">
      <img src="${stay.photo}" alt="${stay.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <div class="flex justify-between items-start">
          <h3 class="font-semibold">${stay.title}</h3>
          <span class="flex items-center text-sm text-red-500">★ ${stay.rating}</span>
        </div>
        <p class="text-gray-500 text-sm mt-1">${stay.type} · ${stay.beds || 'No'} beds</p>
        </div>
      </div>
  `).join('');
}