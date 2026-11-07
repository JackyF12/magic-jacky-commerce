(() => {
  const consentKey = 'magicJackyCookieConsent';

  function createCookieBanner() {
    if (localStorage.getItem(consentKey)) return;

    const banner = document.createElement('section');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie and privacy choices');
    banner.innerHTML = `
      <div>
        <p class="enhancement-eyebrow">PRIVACY & DATA CONTROL</p>
        <strong>Your preferences, protected.</strong>
        <p>We use cookies and comply with GDPR regulations to enhance your browsing experience and secure cross-border transactions.</p>
      </div>
      <div class="cookie-actions">
        <button type="button" class="cookie-decline">Cookie Settings / Decline</button>
        <button type="button" class="cookie-accept">Accept All</button>
      </div>`;
    document.body.append(banner);

    const saveChoice = (choice) => {
      localStorage.setItem(consentKey, choice);
      banner.classList.add('is-leaving');
      window.setTimeout(() => banner.remove(), 220);
    };
    banner.querySelector('.cookie-accept').addEventListener('click', () => saveChoice('accepted'));
    banner.querySelector('.cookie-decline').addEventListener('click', () => saveChoice('essential-only'));
  }

  function createFeedbackModal() {
    const modal = document.createElement('dialog');
    modal.className = 'feedback-modal';
    modal.innerHTML = `
      <button type="button" class="modal-close" aria-label="Close feedback form">x</button>
      <p class="enhancement-eyebrow">CONTACT / FEEDBACK</p>
      <h2>Let's plan the next market.</h2>
      <p>Share a question, partnership brief, or product note with the Magic Jacky team.</p>
      <form class="feedback-form">
        <label>Name<input name="name" autocomplete="name" required /></label>
        <label>Email<input type="email" name="email" autocomplete="email" required /></label>
        <label>Inquiry type<select name="topic" required><option value="fx">Cross-border FX Settlement</option><option value="tiktok">TikTok Live Collaboration</option><option value="app">Custom App Dev</option><option value="feedback">General Feedback</option></select></label>
        <label>Message<textarea name="message" rows="4" required></textarea></label>
        <fieldset><legend>Rating</legend><div class="rating-options"><label><input type="radio" name="rating" value="1" required />1</label><label><input type="radio" name="rating" value="2" />2</label><label><input type="radio" name="rating" value="3" />3</label><label><input type="radio" name="rating" value="4" />4</label><label><input type="radio" name="rating" value="5" />5</label></div></fieldset>
        <button type="submit">Submit securely</button>
        <p class="form-status" aria-live="polite"></p>
      </form>`;
    document.body.append(modal);

    const openModal = () => modal.showModal();
    document.querySelectorAll('a[href="#contact"]').forEach((link) => link.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
    }));
    modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });
    modal.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const feedback = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        topic: form.elements.topic.value,
        message: form.elements.message.value.trim(),
        rating: form.elements.rating.value,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('magicJackyFeedbackDraft', JSON.stringify(feedback));
      localStorage.setItem('magicJackyLastFeedback', new Date().toISOString());
      form.reset();
      form.querySelector('.form-status').textContent = 'Thank you! Your feedback is saved in this browser demo queue.';
    });

    const feedbackButton = document.createElement('button');
    feedbackButton.type = 'button';
    feedbackButton.className = 'feedback-launch';
    feedbackButton.textContent = 'Feedback';
    feedbackButton.addEventListener('click', openModal);
    document.body.append(feedbackButton);
  }

  function addTrustBadges() {
    const badges = document.createElement('section');
    badges.className = 'trust-badges';
    badges.setAttribute('aria-label', 'Checkout security controls');
    badges.innerHTML = '<strong>TRUST CONTROLS / DEMO</strong><span>HTTPS transport and validated inputs</span><span>PCI-aware payment workflow design</span><span>AML / fraud-review workflow preview</span>';

    const bag = document.querySelector('#bagPanel');
    if (bag) {
      const total = bag.querySelector('.bag-total');
      if (total) total.before(badges);
      return;
    }

    const lookup = document.querySelector('.order-lookup');
    if (lookup) lookup.after(badges);
  }

  function addCrossborderCta() {
    if (!location.pathname.endsWith('/crossborder.html')) return;
    const footer = document.querySelector('.page-footer');
    if (!footer) return;
    const cta = document.createElement('section');
    cta.className = 'crossborder-cta';
    cta.innerHTML = '<p class="enhancement-eyebrow">NEXT STEP / CONNECTED COMMERCE</p><h2>Turn a route into revenue.</h2><p>Pair compliant settlement and fulfilment with creator demand and product infrastructure.</p><div><a href="tiktok.html">Explore TikTok Live Solutions</a><a href="software.html">View Custom FinTech & Software Services</a></div>';
    footer.before(cta);
  }

  function addChildChat() {
    if (document.querySelector('#chatWidget')) return;
    const widget = document.createElement('aside');
    widget.className = 'subpage-chat';
    widget.id = 'subpageChat';
    widget.setAttribute('aria-label', 'Jacky AI commerce assistant');
    widget.innerHTML = '<button type="button" class="subpage-chat-launch" aria-expanded="false">Ask Jacky AI</button><section class="subpage-chat-panel" hidden><header><strong>Jacky AI</strong><button type="button" aria-label="Close Jacky AI">x</button></header><div class="subpage-chat-messages" aria-live="polite"><p>Hi, I can help with event kits, FX settlement, AML controls, TikTok live, software, and cross-border fulfilment.</p></div><form><input aria-label="Message Jacky AI" maxlength="1000" placeholder="Ask about your next market" required /><button type="submit">Send</button></form></section>';
    document.body.append(widget);

    const launch = widget.querySelector('.subpage-chat-launch');
    const panel = widget.querySelector('.subpage-chat-panel');
    const close = panel.querySelector('header button');
    const messages = widget.querySelector('.subpage-chat-messages');
    const history = [];
    const setOpen = (isOpen) => {
      panel.hidden = !isOpen;
      launch.setAttribute('aria-expanded', String(isOpen));
    };
    launch.addEventListener('click', () => setOpen(panel.hidden));
    close.addEventListener('click', () => setOpen(false));
    widget.querySelector('form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const input = event.currentTarget.querySelector('input');
      const question = input.value.trim();
      if (!question) return;
      messages.insertAdjacentHTML('beforeend', `<p class="chat-user"></p>`);
      messages.lastElementChild.textContent = question;
      input.value = '';
      try {
        const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question, history }) });
        if (!response.ok) throw new Error('Chat request failed');
        const payload = await response.json();
        history.push({ role: 'user', text: question }, { role: 'model', text: payload.reply });
        messages.insertAdjacentHTML('beforeend', `<p class="chat-ai"></p>`);
        messages.lastElementChild.textContent = payload.reply;
      } catch {
        messages.insertAdjacentHTML('beforeend', '<p class="chat-ai">I can help with event kits, FX settlement, AML safeguards, TikTok live, software, and fulfilment. Please try again in a moment.</p>');
      }
      messages.scrollTop = messages.scrollHeight;
    });
  }

  function readDemoData(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '');
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function addShopMarketPreview() {
    const bag = document.querySelector('#bagPanel');
    if (!bag || bag.querySelector('.market-preview')) return;
    const total = bag.querySelector('.bag-total');
    if (!total) return;
    const preview = document.createElement('section');
    preview.className = 'market-preview';
    preview.innerHTML = '<p class="enhancement-eyebrow">CROSS-BORDER CHECKOUT PREVIEW</p><label>Delivery market<select><option value="sg">Singapore / SGD</option><option value="jp">Japan / JPY</option><option value="my">Malaysia / MYR</option><option value="tw">Taiwan / TWD</option></select></label><p class="market-preview-result" aria-live="polite"></p>';
    total.before(preview);
    const marketData = {
      sg: { code: 'SGD', rate: 1.35, shipping: 7, days: '2-4 days' },
      jp: { code: 'JPY', rate: 151, shipping: 12, days: '4-6 days' },
      my: { code: 'MYR', rate: 4.7, shipping: 8, days: '3-5 days' },
      tw: { code: 'TWD', rate: 32.5, shipping: 9, days: '3-5 days' },
    };
    const select = preview.querySelector('select');
    select.value = localStorage.getItem('magicJackyCheckoutMarket') || 'sg';
    const update = () => {
      const market = marketData[select.value];
      const cartValue = Number((bag.querySelector('#bagTotal')?.textContent || '$0').replace(/[^0-9.]/g, ''));
      const estimate = (cartValue + market.shipping) * market.rate;
      localStorage.setItem('magicJackyCheckoutMarket', select.value);
      preview.querySelector('.market-preview-result').textContent = cartValue ? `Estimated landed total: ${market.code} ${estimate.toFixed(0)} / delivery ${market.days}.` : 'Add a kit to preview local delivery, currency, and arrival.';
    };
    select.addEventListener('change', update);
    bag.querySelector('#bagButton')?.addEventListener('click', update);
    new MutationObserver(update).observe(bag.querySelector('#bagTotal'), { childList: true, characterData: true, subtree: true });
    update();
  }

  function addFulfilmentConsole() {
    if (!location.pathname.endsWith('/crossborder.html')) return;
    const anchor = document.querySelector('.shipping-estimator');
    if (!anchor) return;
    const console = document.createElement('section');
    console.className = 'demo-tool fulfilment-console';
    console.innerHTML = '<div><p class="enhancement-eyebrow">ORDER CONTROL TOWER</p><h2>Plan the route.<br /><em>See the handoff.</em></h2><p>Build a browser-only fulfilment plan for the selected market.</p></div><form><label>Market<select name="market"><option value="Singapore">Singapore</option><option value="Japan">Japan</option><option value="Malaysia">Malaysia</option><option value="Taiwan">Taiwan</option></select></label><label>Order value (USD)<input name="value" type="number" min="1" value="68" required /></label><label>Item category<select name="category"><option>Event kit</option><option>Reflective apparel</option><option>Hydration accessory</option></select></label><button type="submit">Generate fulfilment plan</button></form><output aria-live="polite"></output>';
    anchor.after(console);
    console.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const market = String(data.get('market'));
      const value = Number(data.get('value'));
      const dutyRate = market === 'Singapore' ? 0.09 : market === 'Japan' ? 0.1 : market === 'Malaysia' ? 0.06 : 0.05;
      const plan = { market, category: data.get('category'), value, duty: Number((value * dutyRate).toFixed(2)), status: 'Documentation review ready', createdAt: new Date().toISOString() };
      localStorage.setItem('magicJackyFulfilmentPlan', JSON.stringify(plan));
      console.querySelector('output').innerHTML = `<strong>${market} fulfilment plan ready</strong><span>PAY: USD planning value $${value.toFixed(2)}; final settlement requires provider confirmation.</span><span>SHIP: customs-ready ${plan.category} review, estimated duty $${plan.duty.toFixed(2)}.</span><span>SERVE: local delivery update and return-policy handoff queued.</span>`;
    });
  }

  function addCampaignPlanner() {
    if (!location.pathname.endsWith('/tiktok.html')) return;
    const anchor = document.querySelector('.live-commerce-board') || document.querySelector('.content-grid');
    if (!anchor) return;
    const planner = document.createElement('section');
    planner.className = 'demo-tool campaign-planner';
    planner.innerHTML = '<div><p class="enhancement-eyebrow">CREATOR CAMPAIGN PLANNER</p><h2>Choose a voice.<br /><em>Model the drop.</em></h2><p>Select a market and creator profile to generate a campaign brief.</p></div><form><label>Market<select name="market"><option value="Singapore">Singapore</option><option value="Japan">Japan</option><option value="Taiwan">Taiwan</option></select></label><label>Creator<select name="creator"><option value="Avery / Run coach">Avery / Run coach</option><option value="Mika / City runner">Mika / City runner</option><option value="Yuna / Night lifestyle">Yuna / Night lifestyle</option></select></label><label>Live kit<select name="kit"><option>Starter Night Kit</option><option>Full Route Kit</option><option>Recovery Edit</option></select></label><button type="submit">Build campaign brief</button></form><output aria-live="polite"></output>';
    anchor.after(planner);
    planner.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const market = String(data.get('market'));
      const campaign = { market, creator: data.get('creator'), kit: data.get('kit'), createdAt: new Date().toISOString() };
      localStorage.setItem('magicJackyCampaignBrief', JSON.stringify(campaign));
      const metrics = market === 'Japan' ? '42K projected views / 3.8% engagement' : market === 'Singapore' ? '36K projected views / 4.2% engagement' : '48K projected views / 4.6% engagement';
      planner.querySelector('output').innerHTML = `<strong>${campaign.creator}</strong><span>${campaign.kit} for ${market}</span><span>${metrics}</span><span>Affiliate attribution and fulfilment handoff are prepared for this demo plan.</span>`;
    });
  }

  function addIntegrationBuilder() {
    if (!location.pathname.endsWith('/software.html')) return;
    const anchor = document.querySelector('.two-column') || document.querySelector('.content-grid');
    if (!anchor) return;
    const builder = document.createElement('section');
    builder.className = 'demo-tool integration-builder';
    builder.innerHTML = '<div><p class="enhancement-eyebrow">INTEGRATION BUILDER</p><h2>Scope the system.<br /><em>Connect the work.</em></h2><p>Choose the operating systems a launch needs, then generate a build scope.</p></div><form><fieldset><label><input type="checkbox" value="Storefront" checked /> Storefront</label><label><input type="checkbox" value="Payments" checked /> Payments</label><label><input type="checkbox" value="CRM" /> CRM</label><label><input type="checkbox" value="WMS" /> Warehouse</label><label><input type="checkbox" value="Analytics" /> Analytics</label></fieldset><button type="submit">Generate build scope</button></form><output aria-live="polite"></output>';
    anchor.after(builder);
    builder.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const systems = [...builder.querySelectorAll('input:checked')].map((input) => input.value);
      localStorage.setItem('magicJackyIntegrationScope', JSON.stringify({ systems, createdAt: new Date().toISOString() }));
      builder.querySelector('output').innerHTML = `<strong>${systems.length}-system delivery scope</strong><span>Discovery: map data owners and customer journey.</span><span>Build: connect ${systems.join(', ')}.</span><span>Optimize: test event orders, operational alerts, and reporting.</span>`;
    });
  }

  function addPrivacyCenter() {
    const dialog = document.createElement('dialog');
    dialog.className = 'privacy-center';
    dialog.innerHTML = '<button type="button" class="modal-close" aria-label="Close privacy center">x</button><p class="enhancement-eyebrow">PRIVACY CENTER</p><h2>Your demo data,<br /><em>under control.</em></h2><p>This coursework prototype stores consent, feedback, orders, and plans only in this browser.</p><div class="privacy-actions"><button type="button" data-export>Download my demo data</button><button type="button" data-delete>Delete my demo data</button></div><p class="form-status" aria-live="polite"></p>';
    document.body.append(dialog);
    const keys = ['magicJackyCookieConsent', 'magicJackyLastFeedback', 'magicJackyFeedbackDraft', 'sentosaGlowNightRunOrders', 'magicJackyCheckoutMarket', 'magicJackyFulfilmentPlan', 'magicJackyCampaignBrief', 'magicJackyIntegrationScope'];
    dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-export]').addEventListener('click', () => {
      const data = Object.fromEntries(keys.map((key) => [key, readDemoData(key, localStorage.getItem(key))]));
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      link.download = 'magic-jacky-demo-data.json';
      link.click();
      URL.revokeObjectURL(link.href);
      dialog.querySelector('.form-status').textContent = 'Demo data export prepared.';
    });
    dialog.querySelector('[data-delete]').addEventListener('click', () => {
      keys.forEach((key) => localStorage.removeItem(key));
      dialog.querySelector('.form-status').textContent = 'All Magic Jacky demo data was removed from this browser.';
    });
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'privacy-launch';
    trigger.textContent = 'Privacy';
    trigger.addEventListener('click', () => dialog.showModal());
    document.body.append(trigger);
  }

  createCookieBanner();
  createFeedbackModal();
  addTrustBadges();
  addCrossborderCta();
  addChildChat();
  addShopMarketPreview();
  addFulfilmentConsole();
  addCampaignPlanner();
  addIntegrationBuilder();
  addPrivacyCenter();
})();
