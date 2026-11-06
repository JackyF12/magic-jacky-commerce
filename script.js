const products = [
  { name: 'NeonPulse Reflective Vest', category: 'visibility', style: '360-degree reflective / Acid lime', size: 'XS-XL', price: '$54', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80' },
  { name: 'NightBeam LED Armband', category: 'visibility', style: 'Rechargeable LED / Signal red', size: 'One size', price: '$26', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Lunar Run Shell', category: 'visibility', style: 'Windproof reflective / Ink black', size: 'S-XXL', price: '$138', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80' },
  { name: 'CityGlide Night Runner', category: 'pace', style: 'Road shoe / Reflective silver', size: 'EU 39-45', price: '$149', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Afterdark Run Belt', category: 'pace', style: 'Bounce-free / Charcoal', size: 'XS-L', price: '$34', image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tempo Flask 500', category: 'pace', style: 'Soft bottle / Smoke blue', size: '500 ml', price: '$22', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80' },
  { name: 'Moonlight Compression Socks', category: 'recovery', style: 'Graduated fit / Electric blue', size: 'S-L', price: '$29', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80' },
  { name: 'Post-Run Recovery Roll', category: 'recovery', style: 'Textured foam / Deep violet', size: '33 cm', price: '$38', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80' }
];

const productGrid = document.querySelector('#productGrid');
const bagCount = document.querySelector('#bagCount');
const toast = document.querySelector('#toast');
const bagPanel = document.querySelector('#bagPanel');
const bagBackdrop = document.querySelector('#bagBackdrop');
const bagItems = document.querySelector('#bagItems');
const bagTotal = document.querySelector('#bagTotal');
const checkoutButton = document.querySelector('#checkoutButton');
const bag = [];

document.querySelector('.poster-event-bar strong').textContent = '11 / 24 / 2026';
document.querySelector('.chat-header small').textContent = 'Gemini-ready AI assistant';
document.querySelector('.poster-event-bar span:last-of-type').textContent = 'SENTOSA / 3K + 10K';
document.querySelector('.logo-band span').textContent = 'NIGHT RUN ROUTE / 11.24.2026';
document.querySelector('.race-console-grid article:nth-child(2) strong').textContent = '3K / 10K';
document.querySelector('.race-console-grid article:first-child small').innerHTML = 'Check-in 19:00<br>Sentosa island route';
document.querySelector('.race-shot:nth-child(2) figcaption strong').textContent = '3K Sentosa loop';
document.querySelector('.race-console-copy p:last-child').textContent = 'A live Sentosa case study for marketplace, creator, software, and cross-border operations.';
document.querySelector('.about-copy p:first-child').textContent = 'Magic Jacky helps brands turn local moments into APAC commerce through marketplaces, live content, software, and fulfilment.';
document.querySelector('.about-copy p:nth-child(2)').textContent = 'One partner. Local demand. Global checkout and delivery.';

const sentosaRouteMap = document.createElement('section');
sentosaRouteMap.className = 'sentosa-route-map';
sentosaRouteMap.innerHTML = '<div class="sentosa-route-copy"><p class="eyebrow">ROUTE & TRAVEL</p><h2>Sentosa after <em>dark.</em></h2><div class="route-switch" aria-label="Choose a proposed route"><button type="button" class="active" data-route="3K">3K</button><button type="button" data-route="10K">10K</button></div><p data-route-copy>3K concept route: Sentosa Gateway to Beach Station, built for a relaxed night pace.</p><div class="sentosa-race-facts"><div><span>CHECK-IN</span><strong>19:00</strong></div><div><span>START</span><strong>20:30</strong></div><div><span>FINISH</span><strong data-route-finish>21:10</strong></div></div><a href="https://www.google.com/maps/search/?api=1&query=Sentosa%20Singapore" target="_blank" rel="noreferrer">Open Sentosa in Maps <b>↗</b></a></div><iframe title="Sentosa route area map" src="https://www.google.com/maps?q=Sentosa%2C%20Singapore&z=14&output=embed" loading="lazy"></iframe>';
document.querySelector('.event-route').replaceWith(sentosaRouteMap);
const routeDetails = {
  '3K': { copy: '3K concept route: Sentosa Gateway to Beach Station, built for a relaxed night pace.', finish: '21:10' },
  '10K': { copy: '10K concept route: continue through Palawan and Siloso for the full Sentosa night circuit.', finish: '22:10' },
};
sentosaRouteMap.querySelectorAll('[data-route]').forEach(button => button.addEventListener('click', () => {
  const route = routeDetails[button.dataset.route];
  sentosaRouteMap.querySelectorAll('[data-route]').forEach(item => item.classList.toggle('active', item === button));
  sentosaRouteMap.querySelector('[data-route-copy]').textContent = route.copy;
  sentosaRouteMap.querySelector('[data-route-finish]').textContent = route.finish;
}));

function renderProducts(category = 'all') {
  productGrid.innerHTML = products
    .filter(product => category === 'all' || product.category === category)
    .map((product, index) => `<article class="product-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="product-info"><div><small>${product.category.toUpperCase()} / WORLDWIDE</small><b>${product.name}</b><span class="sport-style">${product.style} · ${product.size}</span></div><div><b>${product.price}</b><button class="add-product" data-product-index="${index}" aria-label="Add ${product.name} to bag">+</button></div></div></article>`)
    .join('');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  renderProducts(button.dataset.filter);
}));

productGrid.addEventListener('click', event => {
  if (!event.target.classList.contains('add-product')) return;
  bag.push(products[Number(event.target.dataset.productIndex)]);
  renderBag();
  showToast('Added to your night-run kit.');
});

function renderBag() {
  bagCount.textContent = bag.length;
  const total = bag.reduce((sum, product) => sum + Number(product.price.slice(1)), 0);
  bagTotal.textContent = `$${total}`;
  checkoutButton.disabled = bag.length === 0;
  bagItems.innerHTML = bag.length
    ? bag.map((product, index) => `<article class="bag-item"><div><small>${product.style} · ${product.size}</small><b>${product.name}</b><button data-remove-index="${index}">Remove</button></div><strong>${product.price}</strong></article>`).join('')
    : '<p class="bag-empty">Your runner kit is empty. Add visibility, pace, or recovery gear to start a checkout demo.</p>';
}
function toggleBag(open) {
  bagPanel.classList.toggle('open', open);
  bagBackdrop.classList.toggle('show', open);
}
document.querySelector('#bagButton').addEventListener('click', () => toggleBag(true));
document.querySelector('#bagClose').addEventListener('click', () => toggleBag(false));
bagBackdrop.addEventListener('click', () => toggleBag(false));
bagItems.addEventListener('click', event => {
  if (!event.target.matches('[data-remove-index]')) return;
  bag.splice(Number(event.target.dataset.removeIndex), 1);
  renderBag();
});
checkoutButton.addEventListener('click', () => {
  toggleBag(false);
  showToast('Checkout demo ready: localized payment, duty estimate, and delivery options prepared.');
});
document.querySelectorAll('.watch-button').forEach(button => button.addEventListener('click', () => showToast(button.textContent === 'Watch' ? `Opening ${button.dataset.live} live room...` : `You are on the list for ${button.dataset.live}.`)));

const panel = document.querySelector('#chatPanel');
const messages = document.querySelector('#messages');
const input = document.querySelector('#chatInput');
const chatStatus = document.querySelector('.chat-header small');
const conversation = [];
function toggleChat(open) { panel.classList.toggle('open', open); if (open) input.focus(); }
document.querySelector('#chatLaunch').addEventListener('click', () => toggleChat(!panel.classList.contains('open')));
document.querySelectorAll('[data-chat-open]').forEach(button => button.addEventListener('click', () => toggleChat(true)));
document.querySelector('#chatClose').addEventListener('click', () => toggleChat(false));
function addMessage(text, kind) { const message = document.createElement('div'); message.className = `message ${kind}`; message.textContent = text; messages.append(message); messages.scrollTop = messages.scrollHeight; return message; }
function setChatStatus(source) {
  const labels = {
    gemini: 'Gemini connected',
    openai: 'OpenAI connected',
    'gemini-fallback': 'Gemini unavailable - demo replies',
    'local-fallback': 'Model unavailable - demo replies',
    'local-demo': 'Demo replies - Gemini key needed',
  };
  chatStatus.textContent = labels[source] || 'AI assistant';
}
function answer(question) {
  const text = question.toLowerCase();
  if (text.includes('tiktok') || text.includes('live') || text.includes('直播')) return 'For TikTok Shop, Magic Jacky pairs night-run products with local creators, produces live gear drops, tracks affiliate conversion, and connects every order to fulfilment.';
  if (text.includes('app') || text.includes('develop') || text.includes('software') || text.includes('開發')) return 'Our team builds localized web stores, mobile apps, payment flows, marketplace APIs, CRM dashboards, and warehouse connections for multi-market operations.';
  if (text.includes('ship') || text.includes('logistic') || text.includes('fulfill') || text.includes('物流')) return 'We coordinate cross-border shipping, overseas warehousing, duty visibility, returns, and local delivery promises through one order view.';
  if (text.includes('privacy') || text.includes('gdpr') || text.includes('compliance') || text.includes('法規')) return 'Magic Jacky uses GDPR-aligned consent, PCI DSS-aware payment controls, consumer protection processes, and transparent duty and tax information.';
  return 'I can help plan a night-run market launch, TikTok live campaign, commerce application, or fulfilment setup. Which city is your next drop?';
}
async function sendQuestion(question) {
  const value = question.trim();
  if (!value) return;
  addMessage(value, 'user');
  conversation.push({ role: 'user', text: value });
  input.value = '';
  const typing = addMessage('Jacky AI is thinking...', 'bot typing');
  try {
    const response = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: value, history: conversation.slice(0, -1).slice(-8) })
    });
    if (!response.ok) throw new Error('Assistant request failed');
    const payload = await response.json();
    typing.remove();
    addMessage(payload.reply, 'bot');
    conversation.push({ role: 'model', text: payload.reply });
    setChatStatus(payload.source);
  } catch {
    typing.remove();
    const reply = answer(value);
    addMessage(reply, 'bot');
    conversation.push({ role: 'model', text: reply });
    setChatStatus('local-fallback');
  }
}
document.querySelector('#chatForm').addEventListener('submit', event => { event.preventDefault(); sendQuestion(input.value); });
document.querySelectorAll('.suggestions button').forEach(button => button.addEventListener('click', () => sendQuestion(button.textContent)));

renderProducts();
