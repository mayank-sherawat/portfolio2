import TextScramble from '../components/ui/TextScramble.jsx'
import Terminal from '../components/ui/Terminal.jsx'

export default function Now() {
  return (
    <section className="now">
      <div className="container">
        <div className="now-headline">
          <span className="now-label">CURRENTLY · GRADUATE ENGINEER TRAINEE</span>
          <h2 className="now-title display">
            <TextScramble as="span" text="Building AI for BFSI" trigger="scroll" />
          </h2>
          <p className="now-sub">Decimal Technologies Ltd · Gurugram, India</p>
        </div>
        <div className="now-frame">
          <Terminal />
        </div>
      </div>
    </section>
  )
}
