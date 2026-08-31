import TextScramble from '../components/ui/TextScramble.jsx'

export default function Glitch() {
  return (
    <section className="glitch">
      <div className="container">
        <div className="glitch-grid">
          <div className="glitch-text-wrap">
            <div className="glitch-sticky">
              <div className="glitch-line"><span className="l">i ship.</span></div>
              <div className="glitch-line"><span className="l2">i ship.</span></div>
              <div className="glitch-line"><span className="l">i ship.</span></div>
              <div className="glitch-line"><span className="l3">i ship.</span></div>
              <p className="glitch-final">
                <TextScramble as="span" text="I build products that scale, perform, and ship." trigger="scroll" />
              </p>
            </div>
          </div>
          <div className="glitch-img">
            <svg viewBox="0 0 200 200" fill="none">
              <g stroke="#f5f5f5" strokeWidth="1.5" fill="none">
                <rect x="40" y="60" width="120" height="80" />
                <line x1="40" y1="80"  x2="160" y2="80" />
                <line x1="60" y1="100" x2="140" y2="100" />
                <line x1="60" y1="115" x2="120" y2="115" />
                <line x1="60" y1="130" x2="130" y2="130" />
              </g>
              <circle cx="100" cy="40" r="6" fill="#f5f5f5" />
              <line x1="100" y1="46" x2="100" y2="60" stroke="#f5f5f5" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
