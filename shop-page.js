const products = [
  { name: '3K Night Party Entry Kit', category: 'visibility', style: 'Bib, timing tag, and event guide / Electric yellow', size: 'One runner', price: 34, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80' },
  { name: '10K Night Party Entry Kit', category: 'visibility', style: 'Bib, timing tag, and event guide / Neon blue', size: 'One runner', price: 42, image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sentosa Night Run Tee', category: 'visibility', style: 'Quick-dry event shirt / Signal yellow', size: 'XS-XXL', price: 36, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reflective Bib Holder', category: 'visibility', style: 'No-pin magnetic fasteners / Silver', size: 'Set of 4', price: 14, image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Sentosa Route Band', category: 'visibility', style: 'Waterproof route guide / 3K + 10K', size: 'One size', price: 16, image: 'https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reflective Pace Cap', category: 'pace', style: 'Lightweight running cap / Ink black', size: 'One size', price: 28, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80' },
  { name: 'LED Route Armband', category: 'pace', style: 'Rechargeable red and white light / Acid lime', size: 'One size', price: 26, image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80' },
  { name: 'Night Visibility Vest', category: 'pace', style: '360-degree reflective / Cloud silver', size: 'XS-XL', price: 54, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80' },
  { name: 'Rechargeable Headlamp', category: 'pace', style: 'Three brightness settings / Weatherproof', size: 'One size', price: 46, image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reflective Lock Laces', category: 'pace', style: 'Quick-lock no-tie system / Neon silver', size: 'One pair', price: 12, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80' },
  { name: 'Personal Safety Alarm', category: 'pace', style: 'High-decibel alarm and strobe / Coral', size: 'One size', price: 19, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80' },
  { name: 'Clip-On Safety Light', category: 'pace', style: 'Rechargeable red safety light / Signal red', size: 'One size', price: 22, image: 'https://images.unsplash.com/photo-1501556424050-d4816356a9c5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reflective Wrist Bands', category: 'pace', style: 'High-visibility reflective pair / Neon silver', size: 'One pair', price: 13, image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Waterproof Phone Armband', category: 'pace', style: 'Touch-ready clear window / Charcoal', size: 'Fits 6-7 inch phones', price: 18, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reflective Running Belt', category: 'pace', style: 'Bounce-free zip pocket / Graphite', size: 'XS-L', price: 31, image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=600&q=80' },
  { name: 'Race-Day Hydration Pack', category: 'recovery', style: 'Two soft flasks and electrolyte tabs / Sea blue', size: 'One set', price: 24, image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80' },
  { name: 'Soft Flask 500', category: 'recovery', style: 'Collapsible bottle / Smoke blue', size: '500 ml', price: 17, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Moonlight Compression Socks', category: 'recovery', style: 'Graduated fit / Electric blue', size: 'S-L', price: 29, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80' },
  { name: 'Cooling Recovery Towel', category: 'recovery', style: 'Fast-cooling microfiber / Ice blue', size: '90 x 30 cm', price: 15, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80' },
  { name: 'Post-Run Recovery Roll', category: 'recovery', style: 'Textured foam / Deep violet', size: '33 cm', price: 38, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80' }
];
const categoryLabels = { visibility: 'EVENT KIT', pace: 'NIGHT SAFETY', recovery: 'RECOVERY' };
const bag = [];
const grid = document.querySelector('#productGrid');
const bagCount = document.querySelector('#bagCount');
const bagItems = document.querySelector('#bagItems');
const bagTotal = document.querySelector('#bagTotal');
const panel = document.querySelector('#bagPanel');
const backdrop = document.querySelector('#bagBackdrop');
const checkoutButton = document.querySelector('#checkoutButton');
const toast = document.querySelector('#toast');
const ORDER_STORAGE_KEY = 'sentosaGlowNightRunOrders';
const shopNav = document.querySelector('.page-nav');
if (shopNav && !shopNav.querySelector('[href="runner.html"]')) {
  shopNav.insertAdjacentHTML('beforeend', '<a href="runner.html">My Run</a>');
}
document.querySelector('.page-kicker').textContent = 'MAGIC JACKY / SENTOSA EVENT MERCHANDISE';
document.querySelector('.page-title').innerHTML = 'Race day,<br><em>ready to run.</em>';
document.querySelector('.page-copy').textContent = 'Pick a 3K or 10K kit. Add visibility, hydration, and recovery gear.';
document.querySelector('.page-hero-card span').textContent = 'NIGHT PARTY / 2026';
document.querySelector('.page-hero-card strong').textContent = '11.24';
function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2600); }
function saveOrder(order) {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order, ...(Array.isArray(orders) ? orders : [])].slice(0, 20)));
    return true;
  } catch {
    return false;
  }
}
function showRegistrationDialog() {
  const total = bag.reduce((sum, product) => sum + product.price, 0);
  const defaultDistance = bag.some(product => product.name.startsWith('10K')) ? '10K' : '3K';
  let dialog = document.querySelector('#registrationDialog');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'registrationDialog';
    dialog.className = 'order-dialog';
    document.body.append(dialog);
  }
  dialog.innerHTML = `<button class="order-close" type="button" data-close-registration aria-label="Close registration">x</button><p class="order-kicker">RUNNER REGISTRATION</p><h2>Save your spot.</h2><p class="order-number">Complete the details below to create your demo event entry.</p><form class="runner-registration" id="runnerRegistration"><label>RUNNER NAME<input name="runnerName" autocomplete="name" required /></label><label>EMAIL<input name="email" type="email" autocomplete="email" required /></label><label>PHONE<input name="phone" type="tel" autocomplete="tel" required /></label><label>DISTANCE<select name="distance"><option value="3K" ${defaultDistance === '3K' ? 'selected' : ''}>3K / Social night run</option><option value="10K" ${defaultDistance === '10K' ? 'selected' : ''}>10K / Full Sentosa route</option></select></label><label class="registration-check"><input name="terms" type="checkbox" required /> I understand this creates a demo registration in this browser.</label><div class="order-detail"><span>EVENT DATE</span><strong>11 / 24 / 2026</strong><span>ORDER TOTAL</span><strong>$${total}</strong></div><button class="nav-cta" type="submit">Confirm runner entry</button></form>`;
  dialog.querySelector('[data-close-registration]').addEventListener('click', () => dialog.close());
  dialog.querySelector('#runnerRegistration').addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderNumber = `MJ-1124-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const order = {
      orderNumber,
      runnerName: String(formData.get('runnerName')).trim(),
      email: String(formData.get('email')).trim(),
      phone: String(formData.get('phone')).trim(),
      distance: String(formData.get('distance')),
      items: bag.map(product => ({ name: product.name, price: product.price })),
      total,
      pickupCode: `GLOW-${orderNumber.slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    if (!saveOrder(order)) {
      showToast('Unable to save this registration in the browser.');
      return;
    }
    const orderItems = order.items.map(product => `<li><span>${product.name}</span><strong>$${product.price}</strong></li>`).join('');
    const assistantQuestion = `I have order ${order.orderNumber} for the Sentosa Glow Night Run on 11/24/2026. I am running ${order.distance}, my pickup code is ${order.pickupCode}, and my order total is $${total}. Please help with collection or event preparation.`;
    dialog.innerHTML = `<button class="order-close" type="button" data-close-registration aria-label="Close order confirmation">x</button><p class="order-kicker">ENTRY CONFIRMED</p><h2>You are on the list.</h2><p class="order-number">${order.orderNumber} / ${order.pickupCode}</p><div class="order-detail"><span>DISTANCE</span><strong>${order.distance}</strong><span>CHECK-IN</span><strong>19:00</strong></div><ul class="order-items">${orderItems}</ul><a class="nav-cta order-run-link" href="runner.html?order=${encodeURIComponent(order.orderNumber)}">Open My Run</a><button class="nav-cta" type="button" data-ai-order>Ask Jacky AI about this order</button><p class="order-ai-result" aria-live="polite">Jacky AI can help with collection and race-night preparation.</p>`;
    dialog.querySelector('[data-close-registration]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-ai-order]').addEventListener('click', async clickEvent => {
      const result = dialog.querySelector('.order-ai-result');
      const button = clickEvent.currentTarget;
      button.disabled = true;
      result.textContent = 'Jacky AI is preparing your runner guidance...';
      try {
        const response = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: assistantQuestion }) });
        if (!response.ok) throw new Error('Assistant request failed');
        result.textContent = (await response.json()).reply;
      } catch {
        result.textContent = 'Jacky AI is unavailable right now. Please use My Run for your pickup code and event details.';
      } finally {
        button.disabled = false;
      }
    });
    bag.splice(0, bag.length);
    renderBag();
  });
  dialog.showModal();
}
function renderProducts(category = 'all') { grid.innerHTML = products.filter(product => category === 'all' || product.category === category).map(product => `<article class="product-card"><img src="${product.image}" alt="${product.name}" loading="lazy"><div class="product-info"><div><small>${categoryLabels[product.category]} / WORLDWIDE</small><b>${product.name}</b><span class="sport-style">${product.style} · ${product.size}</span></div><div><b>$${product.price}</b><button class="add-product" data-name="${product.name}" aria-label="Add ${product.name} to bag">+</button></div></div></article>`).join(''); }
function renderBag() { const total = bag.reduce((sum, product) => sum + product.price, 0); bagCount.textContent = bag.length; bagTotal.textContent = `$${total}`; checkoutButton.disabled = bag.length === 0; bagItems.innerHTML = bag.length ? bag.map((product, index) => `<article class="bag-item"><div><small>${product.style} · ${product.size}</small><b>${product.name}</b><button data-remove="${index}">Remove</button></div><strong>$${product.price}</strong></article>`).join('') : '<p class="bag-empty">Your runner kit is empty. Add gear to start a checkout demo.</p>'; }
function toggleBag(open) { panel.classList.toggle('open', open); backdrop.classList.toggle('show', open); }
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); renderProducts(button.dataset.filter); }));
document.querySelector('[data-filter="all"]').textContent = 'All event gear';
document.querySelector('[data-filter="visibility"]').textContent = 'Event kit';
document.querySelector('[data-filter="pace"]').textContent = 'Night safety';
document.querySelector('[data-filter="recovery"]').textContent = 'Recovery';
grid.addEventListener('click', event => { const name = event.target.dataset.name; if (!name) return; bag.push(products.find(product => product.name === name)); renderBag(); showToast('Added to your night-run kit.'); });
document.querySelector('#bagButton').addEventListener('click', () => toggleBag(true));
document.querySelector('#bagClose').addEventListener('click', () => toggleBag(false));
backdrop.addEventListener('click', () => toggleBag(false));
bagItems.addEventListener('click', event => { if (!event.target.dataset.remove) return; bag.splice(Number(event.target.dataset.remove), 1); renderBag(); });
checkoutButton.addEventListener('click', () => {
  if (!bag.length) {
    showToast('Add an event item before creating a runner entry.');
    return;
  }
  toggleBag(false);
  showRegistrationDialog();
});
function importTikTokLiveKit() {
  try {
    const productNames = JSON.parse(localStorage.getItem('magicJackyTikTokLiveKit') || '[]');
    if (!Array.isArray(productNames)) return;
    const selectedProducts = productNames.map(name => products.find(product => product.name === name)).filter(Boolean);
    if (!selectedProducts.length) return;
    bag.push(...selectedProducts);
    localStorage.removeItem('magicJackyTikTokLiveKit');
    showToast(`TikTok live kit added: ${selectedProducts.length} products.`);
  } catch {
    localStorage.removeItem('magicJackyTikTokLiveKit');
  }
}
renderProducts();
importTikTokLiveKit();
renderBag();