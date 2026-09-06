# Mayank Sherawat — Portfolio (v2)

Single-page personal portfolio. Dark, editorial/brutalist, heavy on scroll animation and
custom interaction. Plain JavaScript + JSX (no TypeScript), pure CSS (no framework).

## Commands

```bash
npm run dev      # vite dev server, port 5173, auto-opens
npm run build    # vite build -> dist/
npm run preview  # serve dist/
```

There are no tests, no linter, and no typechecker configured. "Verify" means: run the build
and/or look at the page in the browser.

## Stack

- **Vite 5** + **React 18** (`@vitejs/plugin-react`), ESM (`"type": "module"`)
- **GSAP 3** + `ScrollTrigger` — all scroll-driven animation
- **Lenis** — smooth momentum scroll, wired into GSAP's ticker
- **Google Fonts** (loaded in `index.html`, not bundled): Big Shoulders Display 800/900
  (display type), IBM Plex Mono 300/400/500 (body/UI), Instrument Serif italic (pull quotes)
- No router — one page, anchor links only (`#top`, `#works`, `#about`, `#contact`)

That is the whole dependency list: `gsap`, `lenis`, `react`, `react-dom`, plus `vite` and
`@vitejs/plugin-react` in dev. Keep it that way — the WebGL hero is hand-written, not a
library. (`three`, `@react-three/*` and `@gsap/react` were removed in Aug 2026 as unused.)

## Architecture

`main.jsx` → `App.jsx` → `<ErrorBoundary>` wrapping overlays + `<main>` of sections.

`App.jsx` owns three things:
1. **Section order** — Hero, Works, Build, Now, Stats, About, Glitch, then Footer outside
   `<main>`.
2. **Global GSAP ScrollTriggers** — targets sections by *class name* (`.forme`, `.about-h2`,
   `.now-title`, `.glitch-final`, `.footer-h`, `.footer-wordmark-text`).
   Renaming any of those classes in a section silently kills its animation. All of it runs
   inside a `gsap.context()` that reverts on unmount.
3. **`activeCase` state** — which case-study modal is open. `Works` sets it, `CaseStudyModal`
   reads it.

### Directory layout

```
src/
├── main.jsx                  # React root (StrictMode)
├── App.jsx                   # composition, global ScrollTriggers
├── App.css                   # ~all section styles (nav, hero, works, about, footer, loader…)
├── index.css                 # reset, base, vw typography, .display helper, accent tokens
├── Cursor.jsx / .css         # custom cursor (top-level, not in components/)
├── sections/                 # one file per page section
├── components/ui/            # reusable widgets, each with a colocated .css
└── hooks/                    # useSmoothScroll (Lenis), useTilt (3D card tilt)
```

**CSS ownership is split:** `index.css` (globals) + `App.css` (all section styles) +
one colocated `.css` per UI component, imported by that component. `App.jsx` also imports
`ProjectMockup.css` even though `ProjectMockup.jsx` imports it too — redundant, harmless.
Section styles do **not** live next to their section file; they're all in `App.css`.

## Where the content lives

All copy and data is hardcoded inline — there is no CMS, JSON, or content directory.

| Content | Location |
| --- | --- |
| Project cards (3) | `PROJECTS` in `sections/Works.jsx` |
| Case-study long copy | `CASE_STUDIES` in `components/ui/CaseStudyModal.jsx` |
| Capability accordion | `BUILD` in `sections/Build.jsx` |
| Skill radials | `SKILLS` in `sections/About.jsx` |
| Education, certifications | JSX in `sections/About.jsx` |
| Counter stats | `STATS` in `sections/Stats.jsx` |
| Terminal command replies | `COMMANDS` in `components/ui/Terminal.jsx` (rendered in the **hero**) |
| Command-palette actions | `ACTIONS` in `components/ui/CommandPalette.jsx` |

**Contact details and links are duplicated across five files** — `Hero.jsx`, `Nav.jsx`,
`Footer.jsx`, `Terminal.jsx`, `CommandPalette.jsx`. Changing an email, phone number, or
social URL means changing all five. There is no shared constants module (worth adding if
this churns again).

### Project card artwork (real screenshots, Sep 2026)

`ProjectMockup.jsx` used to draw all three cards by hand in JSX+CSS. Two of them are now
**real screenshots of the live sites**, captured headlessly and encoded to webp in `public/`:

| Card | Artwork | Frame |
| --- | --- | --- |
| Telehealth | `/shot-telehealth.webp` — babydocritu.com at phone width | `.mock--phone` |
| SocialHouse | `/shot-socialhouse.webp` — socialhouse.online at 1440×900 | `.mock--browser` |
| Timeline | still drawn in JSX | `.mock--desktop` |

Capture recipe (both shots, then `ffmpeg` to webp — there is no ImageMagick on this machine):

```bash
chrome.exe --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=12000 --window-size=520,1000 --screenshot=out.png https://babydocritu.com
ffmpeg -y -i out.png -vf "scale=520:-2" -c:v libwebp -quality 84 public/shot-telehealth.webp
```

Three constraints worth knowing before changing any of this:

- **SocialHouse's entire public surface is auth.** `/` is Sign In and `/register` is Create
  Account; the feed, profiles and posts are all behind login. Mayank chose (Sep 2026) to show
  the real sign-in page rather than fake a feed. Capturing the actual product needs
  credentials or a local instance — don't "fix" the card by drawing a feed again.
- **Timeline stays drawn.** It is internal to Escorts Kubota with no public URL, so there is
  nothing to capture. A drawn mockup is the honest option, and the seeded employee names in
  it are invented — don't replace them with anything real.
- **SocialHouse gets the browser frame, not the phone frame, deliberately.** Its mobile
  layout is mostly empty space and reads as a blank card at thumbnail size; the desktop split
  layout is what carries the design.

### Work card layout: two zones, never overlapping (Sep 2026)

The card used to stack copy *on top of* the artwork behind a full-card dark gradient. That
was rebuilt because it failed three ways at once: `.work-desc`'s last line ran straight
through the mockup (on the wide card it was completely swallowed), the overlap forced the
screenshots down to `brightness(.6)` where they read as grey smears, and the artwork was a
small centred object in an `aspect-ratio`-sized card so every card had a dead band.

`.work-card--tilt` is now a flex column of exactly two zones:

```
.work-card--tilt                 (no padding of its own — the zones own it)
  ├ .work-text     flex-shrink:0   num + "case study" · title · desc · tags + year
  └ .work-stage    flex:1          the frame, bottom-anchored and clipped
```

- **Padding lives on the zones, not the card.** The artwork has to reach the card's bottom
  edge, so `.work-card--tilt` cannot carry padding any more.
- **`.mock` is `align-items: flex-end`** and every frame is sized off the stage — phone and
  desktop by `height: 100%` + `aspect-ratio`, browser by `height: 100%` with the shot
  `object-fit: cover`. Each frame drops its bottom border and squares its bottom corners
  because that edge is off the card.
- **`.work-desc` has `min-height: 105px`** (5 lines of 14px/1.5). That is what holds the two
  side-by-side cards' text zones equal so their artwork starts on the same line — without it
  the two frames sit ~20px apart. It's px because the font-size is px.
- **The wide card is a row, not a column** (`flex-direction: row`, text 38% and vertically
  centred) and is **21/9, not 16/9**. At 16/9 the drawn timeline frame stretched to ~700px
  with its lower half empty white. It reverts to a stacked 4/5 column under 768px.
- **`.mock__timeline` is capped at `max-height: 300px`.** Its events are positioned as a
  percentage of that box, so letting it fill a tall frame spread four cards over ~500px.
- **Dimming is now `brightness(.9)` → `1` on hover**, on `.mock__shot` and on
  `.mock--desktop .mock__screen` (a big `#f5f5f5` slab). It is no longer load-bearing for
  legibility — no copy sits on the artwork — it just stops two cream sites glaring out of a
  near-black page. `.work-card__bg` and `.work-card__overlay` are gone; don't reintroduce a
  full-card gradient.
- **`.work-explore` is a standing affordance**, not a hover-only reveal — it sits in
  `.work-head` opposite the number and brightens on hover. Nothing else on the card said it
  opened a case study.

One trap worth keeping: **`aspect-ratio` on the `<img>` does not hold inside the browser
frame.** Stretched as a flex item it resolves to the full card height. `.mock__viewport`
owns the sizing and the image fills it absolutely — keep that wrapper.

### The marquees were deleted (Sep 2026) — don't bring them back

Three full-bleed scrolling word strips used to sit between the sections: `STACK`
after Hero, `SERVICES` after Works, `STACK` again reversed after Stats.
`Marquee.jsx`, `Marquee.css`, the `STACK`/`SERVICES` arrays and the `.marquee`
ScrollTrigger in `App.jsx` are all gone. **Nothing replaced them.**

Mayank's reason: an infinite scrolling tech-stack strip reads as generic
AI-generated portfolio filler. That judgement is about the *pattern*, so a
nicer marquee does not answer it — a velocity-reactive version was built first
and rejected on exactly these grounds.

It was also redundant. The stack appeared four times on one page: twice as a
marquee, again in the terminal's `stack` command, and again as About's six
skill radials. Those two survivors are where the stack lives now.

`SERVICES` went with it, which also closes the long-standing note that it read
like an agency's service list — see *Voice: no boasting*.

If some beat is ever wanted between Hero and Works, it must not be a loop of
scrolling words.

### The Build section — stacking sticky rows (Sep 2026)

A capability section between Works and Now, modelled on grigoletti.ch at Mayank's
request — the mechanics and the type scale, never the copy.

**There is no JavaScript in `Build.jsx`. It is `position: sticky` and nothing
else.** Each row is a screen tall with its content always expanded, and the row
sticks at an offset staggered by one header height (`--i`, set inline). Scrolling
parks row 01 under the nav, then row 02 comes to rest one header lower and its
opaque background covers row 01's body, leaving only row 01's header showing —
then 03 does the same over 02. Nothing animates, which is why it is smooth.

This took three wrong turns; don't repeat them. It was first a fixed-duration CSS
accordion fired at scroll thresholds ("too fast and can be easily ignored"), then
a pinned ScrollTrigger scrub showing all three rows at once ("should be like the
screenshot — when 1st point is open cannot see 2 and 3"), then a pinned scrub
that slid one row at a time and dropped the expand/collapse entirely ("the
accordion effect is not working at all"). **Don't reintroduce a pin.** The
mechanism was settled by tracing the reference's own header positions:

```
y=1500  headers at [134,  905, 1695]   header 01 parks at 134
y=2300  headers at [134,  234,  895]   header 02 parks beneath it
y=2700  headers at [134,  234,  495]   both held, 03 still rising
```

Two traps, both measured, both easy to reintroduce:

- **Sticky must be on `.build__row`, not `.build__head`.** A sticky header is
  bounded by its own row, so it unsticks and leaves the moment the next row
  arrives — header 01 vanished instead of staying put. Sticking the whole row
  gives the stacking-card behaviour, with later rows covering earlier bodies.
- **Chrome bounds sticky by the containing block's CONTENT box, so
  `padding-bottom` on the list buys no sticky range.** The last row is then the
  container's last content and can never stick at all: all three rows collapsed
  onto row 03's own offset the instant it arrived. `.build__tail` is a real
  element for exactly this reason — it is not decorative spacing.
- **A row must be at least `100svh`.** A row parks at `--stick`, so anything
  shorter than the viewport lets the next row's header peek in below it —
  at 86svh row 02 showed 49px early.

Verified stacking (`S..` → `SS.` → `SSS`) at 1400×900, 1365×620 and 520×880,
with the last sub-item still on screen in the fully stacked state at every size.

- **One type scale, `--u`, every size a multiple of it.** Ratios measured off the
  reference at 1400px wide: heading 100px, row number and title 64px, sub-item
  label 32px, description 20px — `7u / 4.6u / 2.3u / 1.4u` at `u = 14px`. `--u`
  is `clamp(10px, min(1vw, 2vh), 22px)`; the floor is for phones, where `1vw` is
  far too small a driver. Change the scale by moving `--u`, not the sizes.
- **`--head-h` must match the header's real height** (`5.9u + 1px`: its padding
  plus one line of the title). It is the stagger between parked rows, so if the
  header's padding or type size changes, this changes with it.
- **`--stick` (4.6rem) is where row 01 comes to rest** — clear of the fixed nav.
- **Row titles are title case; only the heading is uppercase.** That matches the
  reference (`text-transform: none` on its rows), and is why `.build__num` /
  `.build__title` do **not** use the `.display` helper — it uppercases.

**This is not a services menu, and must not become one.** The reference's rows
are Design / Development / SEO with sub-items like "Framer Development" and
"Keyword Research". Every sub-item here is instead something that exists in the
three shipped projects and on the resume — adding a capability means adding it
to the resume first. See *The marquees were deleted* and *Voice: no boasting*.

### Works section: no meta row (Sep 2026)

The `( 03 ) · © 25 — 26` row under the project cards (`.works-meta`) was removed
at Mayank's request — the count was decorative and the copyright already lives in
the footer. `.works` now carries only a small bottom padding, because `.build`
follows and centres itself in a full screen so its own leading whitespace
supplies the separation; the two together used to leave a ~180px void.

### The footer must fit the viewport (Sep 2026)

The footer is the last thing on the page, so at max scroll its top sits at
`viewport height − footer height`. Once the footer is taller than the screen
that goes negative and the **fixed nav eats the top of the CTA heading** —
measured at 1365×605 the footer was 651px tall, its top landed at −46px, and
25px of "Let's start from zero." was hidden behind the nav.

- **`.footer-wordmark-text` is capped by viewport height as well as width:**
  `clamp(2.6rem, min(22vw, 34vh), 22rem)`. Sized on `vw` alone, a wide but short
  window (1365×540) made it tall enough to push the footer past the viewport
  again. `min()` keeps that continuous rather than stacking breakpoints.
- **`footer`'s `padding-top` is the clearance** that holds the heading below the
  nav once the footer does fit. Don't cut it to save height — that takes back
  most of what shrinking the footer gains. The `max-height: 560px` block trims
  only the wordmark for this reason.
- **`.footer-wordmark-text` carries `padding-bottom: 0.09em`.** `line-height:
  0.85` pulls the line box inside the em box, so the glyph bottoms spill out and
  `.footer-wordmark`'s `overflow: hidden` sliced the letterforms off flat.

Verified with zero nav overlap at 1365×500/540/620/700, 1024×600, 1440×900,
1920×1080, 2560×1440, 520×850 and 390×780. If the footer gains content,
re-measure across that range rather than eyeballing one window.

### Canonical facts (source: Mayank_Resume.pdf, Aug 2026)

Site copy must match the resume. Current values:

- Email `mayanksherawat21@gmail.com` · Phone `+91 7027004234` · Gurugram, India
- LinkedIn `https://www.linkedin.com/in/mayank-sherawat`
- GitHub `https://github.com/mayank-sherawat`
- Site `https://www.mayanksherawat.in/`
- Pediatric Telehealth (Jul — Aug 2026) — live at `https://babydocritu.com`
- SocialHouse (Nov — Dec 2025) — live at `https://www.socialhouse.online`
- Employee Timeline System (Aug 2025 — Feb 2026) — internal to Escorts Kubota, no public link
- Decimal Technologies Ltd: Graduate Engineer Trainee Aug 2026 — present; Software Developer
  Intern Feb — Jul 2026. Escorts Kubota Ltd: Full Stack Developer Intern Aug 2025 — Feb 2026.
- Chitkara University BE CSE 2021—2025, 8.76 CGPA; Korea University exchange 2022, A grade
- 5 certifications: IBM (React, Git/GitHub, Python for Data Science), Google (Agile PM),
  HKUST (Software Engineering Specialization)

**Do not invent project specifics.** Case-study copy was rewritten in Aug 2026 to drop
embellishments the resume does not support (invented headcounts, migration war stories,
scale numbers). Keep new copy traceable to the resume or to something Mayank has confirmed.

The **"0% double-booking rate via atomic slot-locking"** on the telehealth project *is*
resume-backed — it appears verbatim in `Mayank_Sherawat_Resume.pdf`, so the claim in
`Works.jsx` and in the case study's "What I built" stays. Don't strip it as an invented
metric; it already got audited once.

### Voice: no boasting (decided Aug 2026)

Mayank is ~1 year into his career and asked for the swagger removed, because it read as
overclaiming. The old copy compared him favourably to other developers ("Most developers
write code. I ship products."), repeated "i ship." as a mantra, and asserted seniority-level
philosophy ("the boring middle of the stack is where most apps are won or lost"). All of it
is gone, and **the whole `Showreel` section was deleted** rather than rewritten.

Current voice: first person, specific, quietly self-aware. Facts over adjectives — a clinic
using the booking flow beats any superlative. The Glitch section is now
`i build. / i break it. / i fix it. / i learn.` → "Mostly in that order."

When adding copy: no comparisons to other developers, and no claims about what "most apps"
or "most developers" do. Admitting the learning curve is on-brand here, not a weakness.

**The hero serif is a deliberate exception — leave it alone.** It reads "Not just code,
shipped products. Because building is everythin'." Mayank tried the humbler alternative
("learns by building things people actually use.") and asked for this one back, so keep it,
including the dropped *g*. Note it does not grammatically complete the lead's "…a developer
who —"; that's accepted. Elsewhere "ship" survives only as the factual status label
`internal · shipped` on the Timeline case study.

Still open, not yet changed: the About section keeps the aphorism "Forms follow function."
It is not a self-boast, so it was left alone. (The `SERVICES` marquee that used to be listed
here alongside it is gone — see *The marquees were deleted*.)

## Conventions

- Function components, default export, `.jsx` extension **included in every import path**
  (`from './Nav.jsx'`) — match this, Vite is configured with no extension resolution aliases.
- Data arrays live as module-level `const` in SCREAMING_CASE above the component.
- Class names are plain kebab-case, loosely BEM-ish for components (`cmdk__item`,
  `work-card--wide`, `cs__section-head`); sections use flat names (`hero-tagline`).
- Copy is lowercase-leaning and terse ("get in touch", "works", "studio"). Display headings
  are uppercased via CSS (`.display`), not in the string.
- Comments are sparse; when present they're `/* lowercase banner */` or short `//` notes.
- Imperative DOM/animation work goes in `useEffect` with a real cleanup function and a
  touch-device bail (`window.matchMedia('(hover: none)').matches`).

## The hero (redesigned Aug 2026, to Mayank's own mock)

**There is no MAYANK wordmark and no nav logo anywhere** — deliberately removed. The name
appears only inside the hero sentence. Don't "restore" either one.

The hero is one statement in two voices (the em dash is the hinge) beside the live terminal:

```
.hero > .hero-grid (2 cols: 1.15fr text | 0.85fr terminal, vertically centred)
          ├ .hero-col          ← mix-blend-mode: difference
          │   └ h1.hero-statement
          │       ├ span.hero-statement__lead   mono, small     "Hi, I am Mayank Sherawat, a developer who —"
          │       └ span.hero-statement__body   serif italic, large
          │   └ .hero-cta
          └ .hero-terminal     ← NO blend; opaque near-square box over the fluid
```

That is the whole hero — **there is no meta/role row and no visible ⌘K chip.** Both were
removed on request. The palette is keyboard-only now (Cmd/Ctrl+K); nothing on the page hints
at it, which is intentional. Role and location survive in the terminal's `about` command and
the Now section, not in the hero.

- **The whole text column is flush-left on one spine.** Under 768px the grid collapses to one
  column and the terminal stacks beneath the CTA.
- **The terminal's height comes from `aspect-ratio: 1.35 / 1`** on
  `.hero-terminal .terminal-live` (near-square, a touch wider than tall), with `width: 100%`
  so it fills its column and `max-height: min(70svh, 660px)` so it flattens further rather
  than overflowing short windows. Its body must keep `flex: 1; min-height: 0;
  max-height: none` — the component's own `max-height: 420px` would otherwise stop the box
  from filling the shape. `.hero-terminal` is `justify-self: end` + a flex right-align:
  when max-height clamps, `aspect-ratio` also shrinks the width, and without this the box
  drifts off the right margin instead of staying aligned with the nav.
- **Hero type sizes are tuned to fill the column against the terminal**, not picked freely.
  `4.6vw` on the serif is roughly the ceiling that keeps "Not just code, shipped products."
  on one line (so the quote breaks into two, as in Mayank's mock); larger forces a third
  line. The generous `margin-top` values (`11svh` above the serif, `8svh` above the CTA) are
  doing the work of filling the height — reduce them and the hero reads empty again.
- **One `<h1>` wraps the whole sentence**, with the two halves as block `span`s. Keep it that
  way: the h1 is the page's only heading and carries both the name and the value prop.
- **`.hero-grid` must not get a `z-index`.** It is `position: relative` with z-index auto on
  purpose — a z-index would make it an isolated group, and `.hero-col`'s `difference` blend
  would have nothing to blend against, rendering white text invisible over the white fluid.
  Being positioned and later in the DOM than the canvas is enough to paint above it.
- **The blend lives on `.hero-col`, not on the grid** — the terminal has to render normally,
  and `difference` would invert its whole colour scheme. Don't add a blend to `.hero-cta`
  either; it's inside `.hero-col` and would nest blend contexts for nothing.
- `Terminal.jsx` deliberately **does not autofocus on mount** — it sits above the fold, so
  stealing focus popped the on-screen keyboard on phones. Click-to-focus only. Its scroll area
  carries `data-lenis-prevent` (Lenis owns the wheel) and `Terminal.css` re-enables a real
  `cursor: text` inside it, since `index.css` forces `cursor: none` globally and `Cursor.jsx`
  hides the custom cursor inside `.hero` — without that the input had no pointer feedback.

### Terminal output model

A **row** is either one segment `{ tone, text, href? }` on its own line, *or* an array of
segments rendered inline on one line. The array form is what aligns `key : value` pairs and
makes the `$ cmd` echo visible — before it existed, `exec` pushed the echo in as a single
array element that the renderer read `.tone`/`.text` off of, so it rendered an empty `div`
and the echo was invisible, while every key/value pair broke across two lines. `.tl-row` sets
`white-space: pre-wrap` so the padding spaces that align the value column survive.

A segment with `href` renders as an `<a class="tl-link">` (dotted underline), so project and
contact values are clickable. `mailto:`/`tel:` stay in-tab; everything else gets
`target="_blank"`. Its click handler calls `stopPropagation` — the wrapper's click focuses the
input, which would otherwise fire on every link click. All URLs live in one `LINKS` map at the
top of the file.

**Output prints character by character.** `exec` puts the echo straight into `lines` (you just
pressed enter) and pushes the reply into `queue`; a printer effect moves rows from `queue`
through `partial` (`{ row, len }`) into `lines`, revealing `PRINT_CHARS` per `PRINT_TICK`.
`sliceRow` cuts mid-segment, so a half-typed `key : value` keeps its two colours. Separators
and empty rows skip the printer. Under `prefers-reduced-motion` output lands instantly. The
block cursor is hidden while `busy`, or it reads as a second caret next to the printing text.

The terminal also **auto-types `about` once on load** so it never sits empty. It waits out the
loader on a fresh tab (2600ms vs 800ms, read from the same `mayank-loader-played`
sessionStorage key) and any keypress or chip click cancels it mid-type. `CHIPS` renders
clickable command shortcuts under the prompt — without them nothing tells a visitor what to
type.

Note `about` reports the **resume title**: `role : Graduate Engineer Trainee (GET)` with a
separate `focus` line carrying "full-stack · enterprise AI for BFSI". It used to say
`role : Full-Stack Developer`, which was the self-description rather than the actual title.
- The nav row is socials (left) · links (right), with a `menu` burger replacing the links
  under 768px. **There is no ⌘K chip and no `.cmdk-hint` element** — it was removed along
  with the hero's, so nothing on the page advertises the palette. Don't add one back.
- There is no longer any clickable "back to top" in the nav; the `#top` anchor still exists
  and the command palette's "Go to Home" still uses it.

Removed with this redesign: the full-bleed wordmark and its parallax layers, the
mouse-parallax effect in `Hero.jsx` (it existed only to move those layers), the
`.hero-wordmark-text` letter-spacing ScrollTrigger in `App.jsx`, and `.nav-logo`. The
`Loader.jsx` intro timeline was repointed at the new elements — **it animates by class name,
so renaming any hero class silently breaks the intro.**

## Verifying visual changes

There is no browser tool wired up, but Chrome is installed at
`%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe` and can screenshot headlessly:

```bash
chrome.exe --headless=new --disable-gpu --hide-scrollbars \
  --virtual-time-budget=8000 --window-size=1365,660 --screenshot=out.png <url>
```

Two traps found the hard way:
- Screenshotting the real app is useless — the `Loader` overlay covers the page and
  `sessionStorage` can't be pre-set. Screenshot a **harness page** in `dist/` instead: real
  compiled CSS via `<link>`, real markup, no Loader and no `SplashCursor`. Note `npm run
  build` wipes `dist/`, so re-inject the harness after every build.
- `--dump-dom` does not load webfonts (metrics come back as a fallback face, ~4.46×
  instead of 2.78×) and `--headless=new` clamps the viewport to a **500px minimum**, so
  true phone widths can't be measured this way. Use `--screenshot` for anything type-related.
- Serve `dist/` over HTTP (`python -m http.server`) rather than opening the harness as a
  `file://` URL — root-relative paths like `/shot-telehealth.webp` resolve to nothing on
  `file://`, so every image silently renders empty. And when writing the harness from Git
  Bash, build the `/assets/index-*.css` href **inside** the script: MSYS rewrites a bare
  leading-slash argument into `C:/Program Files/Git/assets/…` and the page loads unstyled.

## Gotchas — read before editing

- **`rem` is viewport-relative.** `index.css` sets `html { font-size: calc(0rem + 1vw) }`
  above 991px (fixed `1rem` below). Every `rem` in the codebase therefore scales with window
  *width* on desktop. Use `px` when you want a fixed size.
- **`window.__lenis` is a global handle.** Set by `useSmoothScroll`, read by `App.jsx`
  (anchor scrolling), `CommandPalette.jsx` (`goTo`), and `CaseStudyModal.jsx`
  (`stop()`/`start()` on open/close). Always guard with `if (window.__lenis)` — it's `null`
  when reduced-motion is on.
- **Reduced motion disables Lenis entirely** (`useSmoothScroll` returns early), and
  `TextScramble` renders its final text immediately. New animation should respect this.
- **The native cursor is hidden** via `cursor: none !important` on everything at
  `min-width: 992px and (hover: hover)`. `Cursor.jsx` draws the replacement, and it
  intentionally **hides itself inside `.hero`** so the fluid `SplashCursor` reads as the
  cursor there. Adding a `.hero`-like full-bleed section means deciding which cursor wins.
- **`data-cursor="label"`** on any interactive element sets the custom cursor's label text.
  `Cursor.jsx` uses event delegation on `document`, so new elements work with no wiring.
- **The loader only plays once per tab session** — gated on `sessionStorage`
  `mayank-loader-played`. Clear it (or use a fresh tab) to see the loader and the GSAP intro
  timeline in `Loader.jsx#playIntro`, which animates `.nav`, `.hero-statement__lead`,
  `.hero-statement__body`, `.hero-cta`, `.hero-terminal` by class name.
- **Never use `end: 'max'` on a ScrollTrigger here.** It resolves against the document
  height *at the moment the trigger is built*, and if that is stale the trigger decides it
  is already past its end and goes inactive. The nav's `is-solid` toggle used it and broke
  exactly this way after any Vite HMR update: `end` came back **605** (one viewport) instead
  of **6951**, so `is-solid` dropped, the nav stayed in `difference` blend, and its labels
  inverted to black over the WORKS letters. Production escaped it only because
  `useSmoothScroll` fires `ScrollTrigger.refresh()` at 150ms and 700ms — an HMR update
  re-runs one module and nothing repairs it. `Nav.jsx` now derives the class from
  `hero.getBoundingClientRect().bottom <= 110` and keeps both trigger bounds hero-relative,
  so no bound depends on document height and the class is correct at any scroll position
  however the trigger was created. Same trap applies to `toggleClass`: it only fires on
  *crossing* a bound, so a trigger created already past its start never applies the class.
- **`ScrollProgress` counts `document.querySelectorAll('section, footer')`** at scroll time,
  so adding or removing a section changes the "03 / 11" counter automatically. Its initial
  render is a neutral `01 / 01`, corrected on the first scroll/resize tick — don't hardcode a
  real total there, it goes stale.
- **`sections/Stats.jsx` and `components/ui/Stats.jsx` are different things.** The section
  imports the component as `Counter` (the component's own default export is named `Counter`;
  only the filename says Stats). Don't consolidate them by name alone.
- **`SplashCursor.jsx` is ~1170 lines of vendored WebGL fluid simulation.** It's third-party
  in origin, configured via props from `Hero.jsx`. Tune it with props; don't refactor inside.
- `mix-blend-mode: difference` is used on `.nav` (until `.nav.is-solid` flips it back to
  `normal` past the hero), `.hero-col`, the loader's floating shapes, and both cursor layers
  in `Cursor.css`. It's why they invert over the fluid canvas — changing background colors
  there has non-obvious results.

## Cleanup already done (Aug 2026) — don't reintroduce

Deleted as dead: `Hero3D.jsx`, `Spotlight.jsx` + `.css`, `public/hero-bg.png`,
`src/assets/hero_bg.png`, the `three`/`@react-three/*`/`@gsap/react` deps, `App.jsx`'s
redundant `ProjectMockup.css` import, and the dead CSS blocks `.section`, `.h1`, `.h2`,
`.p-lead`, `.mono`, `.hero-grid*`, `.hero--white*`, `.hero-3d*`, `@keyframes orbit-spin`,
`.skills-list`, `.skill-item*`, and the unused `--accent*` custom properties.

Also removed: the command palette's "Toggle theme" action (it toggled a `theme-invert` class
that no CSS ever defined) and its konami no-op stub. `alert()` calls there were replaced with
the existing `flash()` toast. **There is no light theme** — if one is wanted it needs real
CSS, and note that a `filter` on `body` would break the `position: fixed` nav, cursor, and
scroll rail.

## Static assets in `public/`

Everything here is served from the domain root and is **generated, not hand-drawn** — the
recipe matters if any of it needs regenerating:

| File | What it is |
| --- | --- |
| `Mayank_Sherawat_Resume.pdf` | copy of the resume; linked from nav, footer, `resume` terminal command, and the palette |
| `og.png` | 1200×630 link-preview card |
| `shot-telehealth.webp` (520×1000), `shot-socialhouse.webp` (1280×800) | real screenshots of the live sites, shown in the work cards — see *Project card artwork* |
| `favicon.ico` (32px), `icon-32/180/192/512.png` | white "M" on `#0c0c0c` |
| `robots.txt`, `sitemap.xml` | single-page sitemap; namespace must be `sitemaps.org` (plural) or validators reject it |

**`og.png` and the icons were rendered with headless Chrome**, not an image editor: an HTML
file styled with the site's own fonts, screenshotted at exact pixel dimensions (see
*Verifying visual changes*). `ffmpeg` did the downscaling and wrote the `.ico` — there is no
ImageMagick on this machine, and the `convert` on PATH is Windows' filesystem tool, not
ImageMagick. Chrome cannot screenshot below ~500px, so small icons must be rendered large and
downscaled.

The icons are deliberately **white on dark**. The old inline-SVG favicon was black on
transparent and disappeared in dark browser tab bars; the SVG data URI in `index.html` now
paints its own dark background too.

`index.html` also carries JSON-LD `Person` structured data. Keep `jobTitle`, `worksFor` and
`sameAs` in step with the canonical facts above.

## Known incomplete work

- No source links on the case studies — the resume only carries live URLs, and the project
  repos may be private.
- The `Now` section is thin: it is one centred headline since the terminal moved to the hero.
- No visible affordance returns you to the top of the page (the nav logo used to).
- Vercel preview builds still fail (see below) — **nothing in this rewrite is live yet.**

## Git & deploy

- Repo: `github.com/mayank-sherawat/portfolio2`. Work happens on branch **`v2`**; `main`
  holds an older version and has diverged (v2 is not a descendant of it).
- Git identity is set **locally in this repo** (Mayank Sherawat /
  mayanksherawat21@gmail.com), not globally.
- Vercel auto-deploys this repo (project `mayank-portfolio`, domain `mayanksherawat.in`).
  **Preview deploys of `v2` are currently failing** even though `npm ci && npm run build`
  succeeds locally — cause not yet diagnosed, needs the Vercel build log. There is no
  `vercel.json`; Vercel relies on dashboard settings.
