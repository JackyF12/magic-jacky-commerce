const ORDER_STORAGE_KEY = 'sentosaGlowNightRunOrders';
const lookupForm = document.querySelector('#orderLookup');
const lookupInput = document.querySelector('#orderQuery');
const lookupMessage = document.querySelector('#lookupMessage');
const runnerResult = document.querySelector('#runnerResult');

function readOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderOrder(order) {
  const itemList = order.items.map(item => `<li><span>${escapeHtml(item.name)}</span><strong>$${escapeHtml(item.price)}</strong></li>`).join('');
  runnerResult.hidden = false;
  runnerResult.innerHTML = `<div class="runner-ticket"><div><p class="page-kicker">ENTRY CONFIRMED</p><h2>${escapeHtml(order.runnerName)}</h2><p class="runner-order">${escapeHtml(order.orderNumber)}</p></div><div class="pickup-code"><span>PICKUP CODE</span><strong>${escapeHtml(order.pickupCode)}</strong></div><dl><div><dt>DISTANCE</dt><dd>${escapeHtml(order.distance)}</dd></div><div><dt>EVENT DATE</dt><dd>11 / 24 / 2026</dd></div><div><dt>CHECK-IN</dt><dd>19:00</dd></div><div><dt>START</dt><dd>20:30</dd></div></dl><ul>${itemList}</ul><a href="https://www.google.com/maps/search/?api=1&query=Sentosa%20Singapore" target="_blank" rel="noreferrer">Open Sentosa in Maps <b>↗</b></a></div>`;
}

lookupForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = lookupInput.value.trim().toLowerCase();
  const order = readOrders().find(item => item.orderNumber.toLowerCase() === query || item.email.toLowerCase() === query);
  if (!order) {
    runnerResult.hidden = true;
    lookupMessage.textContent = 'No local registration found. Complete a Shop checkout in this browser first.';
    return;
  }
  lookupMessage.textContent = 'Registration found.';
  renderOrder(order);
});

const query = new URLSearchParams(location.search).get('order');
if (query) {
  lookupInput.value = query;
  lookupForm.requestSubmit();
}