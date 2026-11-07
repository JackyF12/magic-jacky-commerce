# Magic Jacky Commerce: Rubric-Aligned Presentation Outline

Public demo: https://magic-jacky-commerce.onrender.com

## Slide 1 - Problem, Company, and Case Study (Presenter 1)
- Magic Jacky is a cross-border commerce case study for the Sentosa Glow Night Run event.
- The site connects an event marketplace, live-commerce journey, creator commerce, software services, FX planning, and customer support.
- Open the public site and show the responsive global navigation.

## Slide 2 - Marketplace and Customer Journey (Presenter 1)
- `shop.html` provides filterable event merchandise, prices, size information, a client-side bag, and a runner-entry demonstration.
- The bag now includes a delivery-market selector that previews local currency, estimated landed total, and arrival window for Singapore, Japan, Malaysia, or Taiwan.
- A completed demo entry is stored in the browser and can be retrieved in `runner.html` with event guidance and a pickup code.
- Accurate wording: prices are USD demo prices; sizes are displayed product information, not selectable variants; inventory is not live.

## Slide 3 - Live Commerce and UX (Presenter 1)
- `live.html` presents multilingual live-drop schedules and routes the selected live journey to the TikTok live-kit demonstration.
- The Live Commerce Demo lets the presenter start or pause a live room, switch market and host language, pin products, reserve demo stock, send audience questions, and transfer the live bag into Shop.
- `tiktok.html` lets the user choose a creator-led kit and transfers its products to the Shop through browser storage.
- This demonstrates the customer flow from content selection to basket; it is a browser-based simulation rather than a real video stream or TikTok API integration.

## Slide 4 - Cross-Border Operations (Presenter 2)
- `crossborder.html` organizes the operating model into PAY, SHIP, and SERVE.
- The delivery estimator calculates a transparent demo delivery, duty, and arrival estimate from market, value, and quantity inputs.
- The Order Control Tower generates and saves a fulfilment plan with settlement guidance, estimated duty, customs-review category, and customer-service handoff.
- `fx.html` displays five-currency reference data and calculates a planning estimate. It is explicitly a demo snapshot, not a bank quote or locked FX rate.

## Slide 5 - TikTok and Software Services (Presenter 2)
- The TikTok Campaign Planner selects a market, creator profile, and live kit, then generates a campaign brief with projected view and engagement metrics.
- The Integration Builder turns selected storefront, payment, CRM, warehouse, and analytics systems into a discovery/build/optimization delivery scope.
- Accurate wording: these are Magic Jacky's proposed service capabilities demonstrated through the case study; the site does not connect to a real creator network, ERP, CRM, or TikTok Shop account.

## Slide 6 - AI Integration and Architecture (Presenter 3)
- Frontend: responsive HTML, CSS, and vanilla JavaScript. Backend: Python `ThreadingHTTPServer` with `/api/assistant`, `/api/chat`, and `/api/dbs-rates`.
- Jacky AI has prompts for event kits, FX planning, AML/KYC-aware workflows, TikTok operations, software, and fulfilment.
- Gemini or OpenAI is used only when a configured key is available; otherwise a topic-aware local fallback responds. Describe this as an AI-ready assistant, not a guarantee of ChatGPT availability.

## Slide 7 - Privacy, Security, and Compliance (Presenter 3)
- The site implements a persistent cookie choice, feedback form, input length limits for chat, and server-side path/history sanitization.
- It explains GDPR-aligned consent, AML/KYC-aware process design, fraud controls, duty visibility, and consumer-protection workflows.
- Accurate wording: security and PCI/AML badges are coursework demo representations of intended controls. The application does not process payments, conduct KYC, or hold a PCI-DSS certification.

## Slide 8 - Engagement, Design, and Deployment (Presenter 3)
- Demonstrate the feedback modal, one-to-five rating, immediate local confirmation, child-page AI widget, responsive navigation, and the deployed Render URL.
- Feedback and runner entries remain in browser storage in this prototype; a secure CRM/database is a next-step production requirement.

## Slide 9 - Conclusion and Takeaways (Presenter 3)
- The prototype demonstrates an end-to-end cross-border commerce experience: discover, choose a live kit, add products, create a runner entry, estimate delivery/FX, ask AI, and leave feedback.
- Its strongest evidence is the publicly deployed, clickable flow and the visible link between commerce, content, operations, and customer support.
- Production roadmap: authorized FX data, authenticated accounts, payment provider integration, persistent CRM/order storage, consent audit logs, real creator/platform APIs, and independently verified security controls.

## Recommended 4-5 Minute Split
- Presenter 1: Slides 1-3, 1 minute 20 seconds.
- Presenter 2: Slides 4-5, 1 minute 10 seconds.
- Presenter 3: Slides 6-9, 1 minute 40 seconds.
