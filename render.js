export function renderStays(stays) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  stays.forEach(stay => {
    const card = document.createElement('div');
    card.className = 'rounded shadow-md overflow-hidden';
    card.innerHTML = `
      <img src="${stay.photo}" alt="${stay.title}" class="w-full h-48 object-cover" />
      <div class="p-4">
        <div class="text-sm text-gray-600">${stay.city}, ${stay.country}</div>
        <div class="text-lg font-bold">${stay.title}</div>
        <div class="text-sm">${stay.maxGuests} huéspedes - ${stay.beds || 1} camas</div>
        <div class="text-sm text-yellow-500">${stay.rating} ★</div>
      </div>
    `;
    results.appendChild(card);
  });
}
