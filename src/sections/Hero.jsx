import { useRef, useEffect } from 'react'

import TextScramble from '../components/ui/TextScramble.jsx'

import SplashCursor from '../components/ui/SplashCursor.jsx'

const SPLASH_COLOR = { r: 0.047, g: 0.047, b: 0.047 }

export default function Hero() {
  const ref = useRef(null)
  const layerA = useRef(null)
  const layerB = useRef(null)
  const layerC = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    let raf = null
    let targetX = 0, targetY = 0

    const onMove = (e) => {
      // Use window-relative coordinates to eliminate getBoundingClientRect layout thrashing
      targetX = (e.clientX / window.innerWidth) - 0.5
      targetY = (e.clientY / window.innerHeight) - 0.5

      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (layerA.current) layerA.current.style.transform = `translate3d(${targetX * -28}px, ${targetY * -18}px, 0)`
          if (layerB.current) layerB.current.style.transform = `translate3d(${targetX *  18}px, ${targetY *  12}px, 0)`
          if (layerC.current) layerC.current.style.transform = `translate3d(${targetX *  60}px, ${targetY *  40}px, 0)`
          raf = null
        })
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section 
      className="hero" 
      id="top" 
      ref={ref}
    >
      <SplashCursor 
        BACK_COLOR={SPLASH_COLOR} 
        RAINBOW_MODE={false}
        COLOR="#ffffff"
        CURL={30}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={8000}
        DENSITY_DISSIPATION={2.2}
      />



      <div className="hero-top">
        <p className="hero-tagline">
          <TextScramble text="Not just code, shipped products. Because building is everythin’." trigger="mount" />
        </p>
        <div className="hero-cta">
          <a href="mailto:mayanksherawat21@gmail.com" className="btn" data-cursor="email">
            <span>get in touch</span>
            <span className="arrow">
              <svg viewBox="0 0 14 10" fill="none">
                <path d="M8.6 0.35L13.12 4.87L8.6 9.39" stroke="currentColor" />
                <line y1="5" x2="13.12" y2="5" stroke="currentColor" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="hero-wordmark">
        <div ref={layerA} className="hero-layer hero-layer--slow">
          <h1 className="hero-wordmark-text outline">MAYANK</h1>
        </div>
        <div ref={layerB} className="hero-layer hero-layer--main">
          <h1 className="hero-wordmark-text">MAYANK</h1>
        </div>
        <div ref={layerC} className="hero-layer hero-layer--fast">
          <span className="hero-glyph">M</span>
        </div>
      </div>

      <div className="hero-bottom">
        <div>Full-Stack Developer · Gurugram, India</div>
        <div className="hero-socials">
          <a href="#" data-cursor="LKDN">LKDN</a>
          <span style={{ color: '#444' }}>/</span>
          <a href="#" data-cursor="GH">GitHub</a>
          <span style={{ color: '#444' }}>/</span>
          <a href="#" data-cursor="PORTFOLIO">Portfolio</a>
        </div>
      </div>
    </section>
  )
}
