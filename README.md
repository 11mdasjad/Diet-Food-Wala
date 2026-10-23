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
- Our Menu: 92 catalog products across 13 categories; multi-word search, dietary filters, price/name sorting, shareable category/search links and empty state.
- Portion selection: 10 pizzas and 3 fries have catalog price variants; cart quantities and WhatsApp enquiry totals preserve each selected variant.
- Meal Details: one shared catalogue, ingredient and allergen information, invalid-ID fallback.
- Cart: add/remove, quantities, INR subtotal, localStorage persistence, cross-tab updates, native accessible dialog, WhatsApp enquiry. A cart is never represented as an order.
- Subscriptions: weekly/monthly/custom enquiry options with explicitly unconfirmed prices, frequency and inclusions.
- Annual Plan: advertised breakdown, all unresolved service/refund conditions, preview acknowledgement, disabled payment control.
- Contact: accessible validation, optional email, consent, user-reviewed WhatsApp message. Nothing is sent automatically or saved locally.
- About, How It Works, Health Blog, FAQ, Privacy, Terms and Refund Policy.

WhatsApp catalog and enquiry links target **+91 9990386835**, from the supplied catalog URL. Existing call-only contact numbers are retained separately.

## Edit source

- `scripts/build-pages.py`: shared HTML components and all page copy. Regenerates the root HTML files. Make lasting HTML edits here; a build replaces generated HTML.
- `css/`: base design, components, responsive breakpoints and reduced-motion rules.
- `data/catalog-source.json`: editable catalog source, with 92 unique products, source names, prices, portions and size variants.
- `scripts/build-catalog.js`: validates the catalog and generates `js/catalog-data.js` during a build. Do not edit the generated module directly.
- `js/data.js`: catalog categories, dietary labels, WhatsApp contact and pricing helpers.
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

Catalog update verification (23 October 2026): production build, 23 Node/DOM tests and local links across all 13 pages passed. The updated menu rendered in native Chrome with all 92 items and category counts; a desktop screenshot confirmed card layout. Exact-width mobile screenshot checks and browser-console inspection were not completed; responsive layouts are implemented in `css/catalog.css`.

## WhatsApp catalog import

Source: https://wa.me/c/919990386835, read in the WhatsApp desktop app through the end of its All items list. Collection previews were also checked. The 95 source listings contain 92 unique products after consolidating duplicate Chicken Schezwan Fried Rice, Paneer Schezwan Fried Rice and Tandoori Paneer Pizza entries. Their matching prices and the more complete pizza size listing are retained.

Names are cleaned for spelling/capitalization, with original names retained as `sourceName`. Listed prices range from ₹49 to ₹349 before variants; large pizza options reach ₹499. The catalog does not identify the size of the base pizza/fries price, so it is labelled **Listed portion**, not Small/Half. Nutrition figures were not imported as verified nutritional values. Unknown recipes remain unspecified.

Original product photos could be viewed in WhatsApp but were not exported. All 92 menu cards, detail pages and cart thumbnails use dish-family food photographs, including 37 newly generated illustrations. Images use consistent responsive crops and are explicitly labelled serving suggestions; related variants can share a photograph. The menu also links to the original WhatsApp catalog. No original photo import is claimed. Catalog completeness refers to the product inventory and listed prices, not original photographs or verified nutrition.

Updating `data/catalog-source.json` followed by `npm run build` refreshes the browser catalog and `dist/`. The cart uses `dfw-catalog-cart-v2` so old demonstration items are not carried into the real catalog. It stores only item IDs, selected portions and quantities; prices always come from the catalog.

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

- Original catalog photo files, verified nutrition and full allergen/cross-contact information. Product names, listed prices and supplied portions were imported on 23 October 2026.
- Legal business identity, registration/licence information where applicable, grievance contact, operating hours and confirmed location pin.
- Any official social accounts. The supplied catalog number is configured for WhatsApp enquiries.
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
