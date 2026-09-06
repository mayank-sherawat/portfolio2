import TextScramble from '../components/ui/TextScramble.jsx'
import SplashCursor from '../components/ui/SplashCursor.jsx'
import Terminal from '../components/ui/Terminal.jsx'

const SPLASH_COLOR = { r: 0.047, g: 0.047, b: 0.047 }

export default function Hero() {
  return (
    <section className="hero" id="top">
      <SplashCursor
        BACK_COLOR={SPLASH_COLOR}
        RAINBOW_MODE={false}
        COLOR="#ffffff"
        CURL={30}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={8000}
        DENSITY_DISSIPATION={2.2}
      />

      <div className="hero-grid">
        {/* text column blends with the fluid behind it; the terminal must not */}
        <div className="hero-col">
          <h1 className="hero-statement">
            <span className="hero-statement__lead">
              Hi, I am Mayank Sherawat, a developer who —
            </span>
            <span className="hero-statement__body">
              <TextScramble as="span" text="Not just code, shipped products. Because building is everythin’." trigger="mount" />
            </span>
          </h1>

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

        <div className="hero-terminal">
          <Terminal />
        </div>
      </div>
    </section>
  )
}
