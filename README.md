# Mayank Sherawat — Portfolio

Personal portfolio site. React + Vite. Custom nothin'-style cursor with magnetic snap.

## Stack
- React 18
- Vite 5
- Big Shoulders Display + IBM Plex Mono + Instrument Serif (Google Fonts)
- Zero CSS frameworks — pure CSS modules

## Run

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── main.jsx          # entry
├── App.jsx           # main app + all sections
├── App.css           # all section styles
├── Cursor.jsx        # the custom cursor (magnetic, letter-swap, trail)
├── Cursor.css        # cursor styles
└── index.css         # reset + base
```

## Custom cursor features

- **Font-rendered letter** via SVG `<text>` (Big Shoulders Display 900) — looks like a real letter, not a crude path
- **Magnetic snap** — when within 110px of any link/button/card, the cursor drifts toward it
- **Section-aware letter swap** — M → A → W → Y → A → N → K as you scroll
- **Pop animation** on letter swap (bouncy spring)
- **Trailing dot** with more lag, scales up near interactives
- **Smooth lerp follow** (0.22 for main cursor, 0.09 for trail)
- **`mix-blend-mode: difference`** so it inverts on any background
- **Hides on touch / mobile** — native cursor restored
