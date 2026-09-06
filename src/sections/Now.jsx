import TextScramble from '../components/ui/TextScramble.jsx'

/* The live terminal used to live here — it now sits in the hero. */
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
      </div>
    </section>
  )
}
