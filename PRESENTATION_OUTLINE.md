# Magic Jacky Commerce: Presentation Outline

## 1. Company Positioning and Five Business Pillars
- Magic Jacky is a Taiwan-based cross-border commerce partner built around the Sentosa Glow Night Run case study.
- Marketplace: localized event kits and sports merchandise.
- Live Commerce: multilingual show planning, moderation, order capture, and fulfilment.
- Software: web, app, CRM, payment, warehouse, and marketplace integration.
- FX and Logistics: dynamic settlement estimates, duties, documentation, and route planning.
- TikTok: creator matching, affiliate attribution, and Shop live operations.

## 2. System Architecture and Technology Stack
- Frontend: responsive HTML, CSS, and vanilla JavaScript.
- Backend: Python `ThreadingHTTPServer` with safe static-file serving and JSON APIs.
- AI: Gemini or OpenAI when credentials are configured, with a local fallback assistant.
- Deployment: GitHub `main` branch auto-deploys to Render.
- Public URL: https://magic-jacky-commerce.onrender.com

## 3. ChatGPT Integration and Prompt Design
- Jacky AI receives a bounded question and sanitized recent conversation history.
- The system role is specialized for event commerce, FX settlement, TikTok live, software delivery, fulfilment, and compliance.
- `/api/chat` and `/api/assistant` provide compatible chat routes.
- If a provider is unavailable, the local assistant returns topic-aware answers instead of an error.

## 4. FinTech Compliance Practice
- GDPR-style cookie choice and privacy notice are shown across the site.
- Checkout messaging surfaces 256-bit SSL, PCI-DSS Level 1, and AML/fraud monitoring controls.
- FX dashboard labels rates as a demo snapshot and directs users to confirm final bank quotes.
- The experience explains AML/KYC-aware workflows without claiming to perform bank-grade verification.

## 5. User Journey Demonstration
- Enter through the night-run hero and acknowledge cookie choices.
- Browse the Shop, use filters, add items, inspect trust badges, and open the runner journey.
- Open Cross-border tools for delivery, duty, and FX planning.
- Use TikTok Live and Software pages to show the connected operating model.

## 6. Feedback and Customer Engagement
- A global feedback modal captures name, email, inquiry type, message, and rating.
- Submission provides immediate confirmation and stores a local demo timestamp.
- Jacky AI stays available on all child pages for contextual questions.

## 7. Visual Design and Mobile Readiness
- Photographic hero media is paired with high-contrast overlays.
- Mobile layouts prevent horizontal overflow, preserve active navigation tabs, and keep key numbers readable.
- The visual system uses a consistent night-run palette, accessible contrast, and restrained motion.

## 8. Deployment and Evaluation Checklist
- Repository: https://github.com/JackyF12/magic-jacky-commerce
- Live demo: https://magic-jacky-commerce.onrender.com
- Test cookie choice, feedback modal, AI fallback, Shop security badges, Cross-border CTA, and mobile navigation.

## 9. Future Roadmap
- Replace demo FX rates with an authorized provider feed.
- Persist feedback and order records in a secure CRM/database.
- Add authenticated customer accounts and consent audit logs.
