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
      localStorage.setItem('magicJackyLastFeedback', new Date().toISOString());
      form.reset();
      form.querySelector('.form-status').textContent = 'Thank you! Your feedback or inquiry has been logged securely into our CRM demo queue.';
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
    badges.innerHTML = '<strong>SECURE CHECKOUT</strong><span>256-Bit SSL Encryption</span><span>PCI-DSS Level 1 Certified</span><span>Automated AML / Fraud Detection Active</span>';

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

  createCookieBanner();
  createFeedbackModal();
  addTrustBadges();
  addCrossborderCta();
  addChildChat();
})();
