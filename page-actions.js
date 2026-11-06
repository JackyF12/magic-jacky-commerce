const toast = document.querySelector('#toast');
const serviceNav = document.querySelector('.page-nav');
if (serviceNav && !serviceNav.querySelector('[href="runner.html"]')) {
  serviceNav.insertAdjacentHTML('beforeend', '<a href="runner.html">My Run</a>');
}
if (serviceNav && window.matchMedia('(max-width: 600px)').matches) {
  const activeServiceLink = serviceNav.querySelector('[aria-current="page"]');
  if (activeServiceLink) {
    window.requestAnimationFrame(() => activeServiceLink.scrollIntoView({ block: 'nearest', inline: 'center' }));
  }
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('[data-notify]').forEach(button => button.addEventListener('click', () => {
  const label = button.dataset.notify;
  if (button.textContent.trim() === 'Watch') {
    localStorage.setItem('magicJackyLiveRoom', label);
    location.href = 'tiktok.html?source=live-room';
    return;
  }
  showToast(`You are on the list for ${label}.`);
}));

if (location.pathname.endsWith('/tiktok.html')) {
  const liveKits = {
    starter: { title: 'Starter Night Kit', time: '19:30 SGT / Creator warm-up', products: ['3K Night Party Entry Kit', 'LED Route Armband', 'Soft Flask 500'] },
    full: { title: 'Full Route Kit', time: '20:00 SGT / Sentosa live drop', products: ['10K Night Party Entry Kit', 'Night Visibility Vest', 'Race-Day Hydration Pack'] },
    recovery: { title: 'Recovery Edit', time: '21:15 SGT / Post-run creator room', products: ['Moonlight Compression Socks', 'Cooling Recovery Towel', 'Post-Run Recovery Roll'] },
  };
  const liveCommerceBoard = document.createElement('section');
  liveCommerceBoard.className = 'live-commerce-board';
  liveCommerceBoard.innerHTML = `<div><p class="page-kicker">TIKTOK SHOP / LIVE COMMERCE DEMO</p><h2>Choose the live.<br><em>Shop the drop.</em></h2><p>Pick a creator-led live kit, then carry its products into the Magic Jacky marketplace.</p></div><div class="live-kit-list">${Object.entries(liveKits).map(([key, kit], index) => `<button type="button" class="live-kit ${index === 0 ? 'active' : ''}" data-live-kit="${key}"><span>${kit.time}</span><strong>${kit.title}</strong><small>${kit.products.length} products / TikTok Shop affiliate link</small></button>`).join('')}</div><div class="live-kit-summary" aria-live="polite"><p data-live-summary></p><button type="button" data-shop-live>Shop this live kit</button></div>`;
  document.querySelector('.page-main .content-grid').after(liveCommerceBoard);
  const liveSummary = liveCommerceBoard.querySelector('[data-live-summary]');
  const liveRoom = localStorage.getItem('magicJackyLiveRoom') || '';
  let selectedKit = liveRoom.includes('Tokyo') ? 'starter' : liveRoom.includes('Taipei') ? 'full' : liveRoom.includes('Seoul') ? 'recovery' : 'starter';
  localStorage.removeItem('magicJackyLiveRoom');
  function renderLiveKit() {
    const kit = liveKits[selectedKit];
    liveSummary.textContent = `${kit.title}: ${kit.products.join(' · ')}`;
    liveCommerceBoard.querySelectorAll('[data-live-kit]').forEach(button => button.classList.toggle('active', button.dataset.liveKit === selectedKit));
  }
  liveCommerceBoard.querySelectorAll('[data-live-kit]').forEach(button => button.addEventListener('click', () => {
    selectedKit = button.dataset.liveKit;
    renderLiveKit();
  }));
  liveCommerceBoard.querySelector('[data-shop-live]').addEventListener('click', () => {
    localStorage.setItem('magicJackyTikTokLiveKit', JSON.stringify(liveKits[selectedKit].products));
    location.href = 'shop.html?source=tiktok-live';
  });
  renderLiveKit();
}