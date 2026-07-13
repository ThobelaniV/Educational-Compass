# Educational Compass

A clean, modern two-page marketing site for Educational Compass, built as a static HTML/CSS/JS MVP.

## Structure

```
EducationalCompass/
├── index.html        Home page (hero, about, services, events, contact preview)
├── contact.html       Contact page (form, contact info, FAQ)
├── css/style.css       All styles, design tokens as CSS custom properties
├── js/script.js        Nav toggle, scroll reveal, FAQ accordion, form validation
├── images/events/      Drop event photos here if you want to move off the SVG art
└── README.md
```

## Design

- **Palette:** Black `#0B0B0B`, White `#FFFFFF`, Navy `#0F3D91`, Light Gray `#EAEAEA`, Dark Gray `#2C2C2C`
- **Type:** Poppins (headings) + Inter (body), loaded from Google Fonts
- **Signature motif:** a compass rose / needle used as the logo, hero background art, and a
  "bearing" label style (e.g. `000° — About Us`) that stands in for section eyebrows throughout
  the site — a nod to the "compass" in the brand name.

## Running locally

No build step — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes for next steps

- The contact form currently validates client-side and shows a success message; wire it up to
  a real backend or a service like Formspree to actually receive submissions.
- Event cards currently use static content — swap in real event data or hook up to a CMS.
- Icons and hero/compass art are inline SVG, so no image assets are required to run the MVP as-is.
