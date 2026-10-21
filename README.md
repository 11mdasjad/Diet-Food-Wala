# Diet Food Wala

A complete 13-page, responsive HTML5/CSS3/vanilla JavaScript website based on the supplied green-and-gold reference. Public pages are frontend-only. No frontend frameworks, runtime packages, API keys, accounts or payment integration are required.

## Run locally

Requirements: Node.js 20+; Python 3 for page generation and link checks.

```sh
npm start
```

Open **http://127.0.0.1:3000**. Use an HTTP server, rather than opening HTML through `file://`, because JavaScript uses ES modules. Set `PORT=3001 npm start` to select another port. `npm start` has no package dependencies.

## Pages and features

- Home: food hero, categories, annual plan preview, process, brand introduction, dynamic meal cards, sourced health education, three-column community story section and contact links.
- Our Meals: ingredient search, category and dietary filters, price sorting, empty state and custom-plan enquiry.
- Meal Details: one shared catalogue, ingredient and allergen information, invalid-ID fallback.
- Cart: add/remove, quantities, INR subtotal, localStorage persistence, cross-tab updates, native accessible dialog, WhatsApp enquiry. A cart is never represented as an order.
- Subscriptions: weekly/monthly/custom enquiry options with explicitly unconfirmed prices, frequency and inclusions.
- Annual Plan: advertised breakdown, all unresolved service/refund conditions, preview acknowledgement, disabled payment control.
- Contact: accessible validation, optional email, consent, user-reviewed WhatsApp message. Nothing is sent automatically or saved locally.
- About, How It Works, Health Blog, FAQ, Privacy, Terms and Refund Policy.

WhatsApp links currently target the supplied primary contact number **+91 7529973199**. Whether that number is WhatsApp-enabled must be confirmed by the owner. The alternate phone number is **+91 9990386825**.

## Edit source

- `scripts/build-pages.py`: shared HTML components and all page copy. Regenerates the root HTML files. Make lasting HTML edits here; a build replaces generated HTML.
- `css/`: base design, components, responsive breakpoints and reduced-motion rules.
- `js/data.js`: single source of demonstration meal data.
- `js/menu.js`, `cart.js`, `contact.js`, `subscriptions.js`, `main.js`, `utils.js`: separate ES modules.
- `assets/images/`: local food photos. The header and footer use a cleaned transparent version of the supplied Diet Food Wala logo.
- `tests/`: Node tests; the DOM utility is development-only and is never shipped.

## Verification

```sh
npm ci
npm test
npm run build
```

`npm test` checks filters, sorting, cart normalization/calculations, phone and form validation, URL encoding, DOM interactions, HTML H1s, static image alternative text, and internal file/anchor paths. `npm run build` generates the HTML and copies only public HTML/CSS/JS/assets into `dist/`.

Manual acceptance checklist at **360, 390, 768, 1024 and 1440 px**:

1. No horizontal overflow; readable cards, hero, footer and pricing layouts.
2. Mobile menu opens, closes on selection/outside click/Escape, and updates `aria-expanded`.
3. Search, diet/category filters, sorting, reset and empty/custom states work together.
4. Cart adds, changes quantities, removes, persists on reload and calculates subtotal; Escape closes and focus returns to its opener.
5. Contact shows inline errors and prepares a correctly encoded enquiry; editing invalidates an already-prepared message.
6. Annual enquiry remains disabled until preview acknowledgement; payment stays disabled regardless.
7. All three community story cards appear side by side on desktop and stack on mobile.
8. Tab focus, skip link, browser console and image loading are checked.

Environment verification limits: the homepage rendered in native Chrome and its accessibility tree exposed the expected page, navigation and dynamic product cards. Subsequent computer-use capture failed with a ScreenCaptureKit capture error. Full screenshot review, exact-width browser checks and live browser console inspection could not be completed in this environment. DOM and logic tests are independent of browser rendering and do not substitute for those checks.

## Deployment

For a private/demo preview:

```sh
npm run build
```

Upload **only `dist/`** to a static host (Netlify, Cloudflare Pages, GitHub Pages or equivalent). Keep normal multi-page routing; do not enable an SPA catch-all that obscures missing pages. The default robots file disallows crawling while business details are unapproved.

After the owner approves content and the actual domain is known:

```sh
SITE_URL=https://your-approved-domain.com npm run build
```

The build emits canonical and Open Graph URLs, a sitemap with all pages and meal-detail URLs, and production robots instructions. `SITE_URL` must be an HTTPS origin. `.env.example` documents settings; `.env` is not automatically loaded. HTTPS hosting and a domain are the only infrastructure required for this frontend.

Do not publish the annual offer as an approved purchasable plan until the written terms and operational process are approved. Prices, menu, brand imagery and policies must also be reviewed. No site has been published to an external host by this project.

## Business information still required

- Approved logo, actual meal photos, menu, prices, portions, nutrition and allergen/cross-contact information.
- Legal business identity, registration/licence information where applicable, grievance contact, operating hours and confirmed location pin.
- Verified WhatsApp-enabled number and any official social accounts.
- Weekly/monthly/custom plan prices, duration, meal frequency, inclusions, exclusions and service availability.
- Actual delivery radius, charge calculation, taxes, collection and service schedules.
- Annual-plan approved agreement/version, eligibility, dine-in/takeaway conditions, meal counts, missed meals, pauses, holiday rules, cancellation/early exit, deductions, refund procedure and maximum processing timeline.
- Clarification of the advertised ₹50 per 2 km charge and minimum 30-day early-refund processing wording.
- Approved privacy/terms/refund notices, retention rules and consented real testimonials. The community story section intentionally contains no invented customers or ratings.
- Production domain and hosting account. No external credentials are required for the demo.

## Production backend boundary

No backend or admin is implemented: the requested frontend demo works independently and no unconfigured service is presented as operational. Do not use localStorage as an order record, identity store or payment ledger.

A later production implementation should add a separate Node/Express API with MySQL or Supabase PostgreSQL. Recommended contracts:

- `GET /api/meals` → versioned catalogue; implement real loading/error/retry states when this replaces local data.
- `POST /api/enquiries` → server-validated contact fields, explicit consent, rate limits; only show submitted status on actual success.
- `POST /api/orders` → product IDs/quantities only; server looks up prices, taxes, fees and availability, creates idempotently.
- Payment creation and signed webhooks → server-only secrets, signature verification, replay protection and transactional state changes.
- Protected admin endpoints → secure sessions, role-based authorization, CSRF protection where applicable, audit trail and restrictive CORS.
- Versioned approved agreements, subscription service events and refund requests → enforce eligibility and retain an audit trail.

Suggested tables: `meals`, `categories`, `customers`, `orders`, `order_items`, `payment_events` (unique provider event IDs), `plans`, `agreement_versions`, `subscriptions`, `meal_service_events`, `refund_requests`, `enquiries`, `admin_users`, `audit_events`. Add foreign keys, quantity/amount constraints, unique idempotency keys and database transactions. Backend secrets belong in private server environment variables, never public files. A real backend requires separate implementation, credentials, operational policy and security testing.

## Sources and assets

Health education links directly to WHO's [Healthy diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet) and [Nutrition](https://www.emro.who.int/nutrition/healthy-eating/) pages. It makes no individual treatment or guaranteed health claims.

Food images are illustrative. See `assets/ASSETS.md` for image sources, generated-image prompts and production replacements.
