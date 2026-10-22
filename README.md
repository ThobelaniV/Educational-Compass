# Educational Compass

A clean, modern two-page marketing site for Educational Compass, built as a static HTML/CSS/JS MVP.

## Structure

```
EducationalCompass/
├── index.html        Home page (hero, about, services, events, contact preview)
├── contact.html       Contact page (form, contact info, FAQ)
├── css/style.css       All styles, design tokens as CSS custom properties
├── js/script.js        Nav toggle, scroll reveal, scrollspy, count-up stats, countdown, FAQ, form
├── images/logo.png     Transparent logo (used for nav/footer/about/favicon)
├── images/logo.jpeg    Original logo file on a grey background (kept as supplied)
└── README.md
```

## Design

- **Palette:** Black `#0B0B0B`, White `#FFFFFF`, Navy `#0F3D91`, Light Gray `#EAEAEA`, Dark Gray `#2C2C2C`
- **Type:** Poppins (headings) + Inter (body), loaded from Google Fonts
- **Signature motif:** a compass rose / needle used as the logo, hero background art, and a
  "bearing" label style (e.g. `000° — About Us`) that stands in for section eyebrows throughout
  the site — a nod to the "compass" in the brand name.

## Interactive features

- Scrollspy nav highlighting as you move through the home page sections.
- Animated count-up on the "700+ tutorials" / "10+ partner schools" stats.
- Live countdown timer to the Math & Science Leadership Camp (29 Sept 2026).
- Working `mailto:`, `tel:` and WhatsApp (`wa.me`) links throughout — nothing is a dead link.
- Floating WhatsApp button + a "back to top" button on every page.
- Contact form validates client-side, then opens the visitor's email app with the message
  pre-filled (via `mailto:`) — no backend required to receive a real enquiry.
- FAQ accordion with proper `aria-expanded` state for screen readers.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes for next steps

- The contact form opens a `mailto:` link today; swap in a real backend or a service like
  Formspree if you'd rather receive submissions without relying on the visitor's email client.
- Only one event is running right now, so the events grid is centred on a single featured card —
  it will lay itself out in a responsive grid automatically once more events are added.
- Icons and hero/compass art are inline SVG, so no extra image assets are required beyond the logo.
