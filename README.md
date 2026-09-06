# Mayank Sherawat — Portfolio

Personal portfolio site. Single page, dark editorial style, heavy on scroll animation and
custom interaction. Live at [mayanksherawat.in](https://www.mayanksherawat.in/).

## Stack

- React 18 + Vite 5 (plain JavaScript/JSX, no TypeScript)
- GSAP 3 + ScrollTrigger — scroll-driven animation
- Lenis — smooth momentum scroll, frame-synced to GSAP's ticker
- Big Shoulders Display + IBM Plex Mono + Instrument Serif (Google Fonts)
- Zero CSS frameworks — hand-written CSS

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> dist/
npm run preview
```

## Structure

```
src/
├── main.jsx              # entry
├── App.jsx               # composition, global ScrollTriggers
├── App.css               # all section styles
├── index.css             # reset, base, vw typography
├── Cursor.jsx / .css     # custom magnetic cursor
├── sections/             # Hero, Works, Now, Stats, About, Glitch, Footer, Nav, Loader,
│                         # ErrorBoundary
├── components/ui/        # Terminal, CommandPalette, CaseStudyModal, RadialSkill,
│                         # ScrollProgress, ProjectMockup, TextScramble, Stats (counter),
│                         # SplashCursor (WebGL fluid)
└── hooks/                # useSmoothScroll (Lenis), useTilt (3D card tilt)
```

## Interaction notes

- **Custom cursor** — the native cursor is hidden above 992px on hover-capable devices.
  `Cursor.jsx` draws the replacement: magnetic snap within 80px of buttons and nav links,
  a lagging trail dot, and `mix-blend-mode: difference` so it inverts over any background.
  Any element with `data-cursor="label"` sets the cursor's label text. It hides inside the
  hero so the WebGL fluid simulation reads as the cursor there.
- **Command palette** — `⌘K` / `Ctrl+K`. Arrow keys navigate, Enter runs, Esc closes.
- **Terminal** — the hero has a working terminal beside the intro. Try `help`, `about`,
  `stack`, `experience`, `projects`, `contact`. Up/Down cycles history, Tab autocompletes.
  It does not steal focus on load — click it to type.
- **Loader** — plays once per tab session (gated on `sessionStorage`). Open a new tab to
  see it again.
- Reduced-motion is respected: Lenis is disabled and text scrambles resolve instantly.

See [CLAUDE.md](CLAUDE.md) for architecture notes, gotchas, and where each piece of content
lives.
