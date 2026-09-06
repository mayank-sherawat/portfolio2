import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* how much bigger the nav runs while you are still in the hero */
const HERO_NAV_SCALE = 1.5

/* Nav labels roll on hover: the label slides up and an identical copy takes
   its place. The second copy is decorative, so the link still reads as one
   label to a screen reader.
   Three levels, and each one is load-bearing: .nav-item is the padded hit area
   that draws the iOS pill, __win is the one-line clip window, __roll is what
   actually translates. The clip cannot live on .nav-item — it would cut off
   that element's own pill. */
function NavItem({ children, className = '', ...rest }) {
  return (
    <a className={`nav-item ${className}`} {...rest}>
      <span className="nav-item__win">
        <span className="nav-item__roll">
          <span className="nav-item__t">{children}</span>
          <span className="nav-item__t" aria-hidden="true">{children}</span>
        </span>
      </span>
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  /* The nav runs oversized over the hero and settles to its normal size as
     you scroll out of it. --nav-scale multiplies the nav's own font sizes, so
     one scrubbed number drives every label and the separators at once, and
     scrolling back up runs it in reverse for free. scrub is a duration, not a
     boolean: it eases the catch-up instead of snapping to scroll position. */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* This toggle no longer reveals the glass (that is scrubbed below) — it
         carries the two things that cannot be scrubbed: mix-blend-mode, which
         is not animatable, and the reduced-motion fallback that snaps the
         glass on when no scrub exists. It fires at ~110px, by which point the
         scrubbed glass is ~82% in (measured), so the flip is hidden under it.
         It stays outside the reduced-motion bail because legibility is not
         decoration. end: 'max' keeps it on for the rest of the page. */
      /* The class is decided by measuring the hero, not by the trigger's own
         isActive, and the trigger's bounds are both hero-relative.

         This used to be `start: 'bottom top+=110', end: 'max'` with
         `toggleClass`. `'max'` resolves against the document height at the
         moment the trigger is built, and if that is stale the trigger decides
         it is already past its end, goes inactive and drops the class — the
         nav stays in difference blend and its labels invert to black over the
         WORKS letters. Measured after a Vite HMR swap: end came back 605
         (one viewport) instead of 6951. Production only escaped it because
         useSmoothScroll fires ScrollTrigger.refresh() at 150ms and 700ms;
         an HMR update re-runs this module alone, so nothing ever repaired it.

         Deriving the class from geometry makes it true at any scroll position
         however the trigger was built, and dropping `'max'` means no bound
         depends on document height at all. */
      const syncSolid = () => {
        const nav = document.querySelector('.nav')
        const hero = document.querySelector('.hero')
        if (nav && hero) nav.classList.toggle('is-solid', hero.getBoundingClientRect().bottom <= 110)
      }
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top+=110',
        onToggle: syncSolid,
        onUpdate: syncSolid,
        onRefresh: syncSolid
      })
      syncSolid()

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo('.nav',
        { '--nav-scale': HERO_NAV_SCALE },
        {
          '--nav-scale': 1,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=40%', scrub: 0.6 }
        }
      )

      /* The glass reveal is scrubbed to the hero's exit rather than fired as a
         transition, so the backdrop blurs in under the scroll itself and runs
         backwards on the way up. The range is measured from the hero's bottom
         edge travelling up the viewport: it starts at 60% of viewport height
         and finishes at 8%, which is roughly the nav's own height — so the
         glass is fully in just before the next section slides underneath it,
         and never sits half-drawn while content is passing. */
      gsap.fromTo('.nav',
        { '--nav-glass': 0 },
        {
          '--nav-glass': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'bottom top+=60%',
            end: 'bottom top+=8%',
            scrub: 0.5
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <nav className="nav">
        <div className="nav-socials">
          <NavItem href="https://www.linkedin.com/in/mayank-sherawat" target="_blank" rel="noreferrer noopener" data-cursor="linkedin">LinkedIn</NavItem>
          <span className="nav-socials__sep">/</span>
          <NavItem href="https://github.com/mayank-sherawat" target="_blank" rel="noreferrer noopener" data-cursor="github">GitHub</NavItem>
          <span className="nav-socials__sep">/</span>
          <NavItem href="mailto:mayanksherawat21@gmail.com" data-cursor="email">Email</NavItem>
          <span className="nav-socials__sep">/</span>
          <NavItem href="/Mayank_Sherawat_Resume.pdf" target="_blank" rel="noreferrer noopener" data-cursor="resume">Resume</NavItem>
        </div>
        <div className="nav-menu">
          <NavItem href="#works"   className="nav-link" data-cursor="works">works</NavItem>
          <NavItem href="#about"   className="nav-link" data-cursor="studio">studio</NavItem>
          <NavItem href="#contact" className="nav-link" data-cursor="contact">contact</NavItem>
        </div>
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Open menu">
          <span>menu</span>
          <svg className="burger-svg" viewBox="0 0 12 12" fill="none">
            <rect y="5" width="6" height="2" fill="currentColor" />
            <rect y="9" width="6" height="2" fill="currentColor" />
            <rect y="1" width="6" height="2" fill="currentColor" />
            <rect x="6" y="5" width="6" height="2" fill="currentColor" />
            <rect x="6" y="9" width="6" height="2" fill="currentColor" />
            <rect x="6" y="1" width="6" height="2" fill="currentColor" />
          </svg>
        </button>
      </nav>
      <div className={`menu-overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
        <a href="#works"   className="menu-link" onClick={() => setOpen(false)}>works</a>
        <a href="#about"   className="menu-link" onClick={() => setOpen(false)}>studio</a>
        <a href="#contact" className="menu-link" onClick={() => setOpen(false)}>contact</a>
        <div className="menu-cta">
          <a href="mailto:mayanksherawat21@gmail.com" className="btn btn--light" data-cursor="email">drop an email</a>
          <a href="#contact" className="btn" data-cursor="talk" onClick={() => setOpen(false)}>get in touch</a>
        </div>
      </div>
    </>
  )
}
