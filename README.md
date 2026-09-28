# Kris Benedict M. Delos Santos — Portfolio

Personal developer portfolio. Migrated from vanilla HTML/CSS/JS to React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

The output goes into `dist/` — deploy that folder to Netlify, Vercel, or GitHub Pages.

## Project structure

- `src/components/` — reusable UI pieces (Header, Hero, etc.)
- `src/pages/` — full pages (Home, SeaItSolved)
- `src/data/projects.js` — project list
- `src/lib/` — reserved for future third-party component wrappers
- `src/styles.css` — your existing stylesheet

## Where to edit

- Personal info: `src/components/Hero.jsx`, `src/components/About.jsx`
- Social links: `src/components/Header.jsx`, `src/components/Contact.jsx`
- Footer: `src/components/Footer.jsx`
- Tech stack: `src/components/TechStack.jsx`
- Projects: `src/data/projects.js`