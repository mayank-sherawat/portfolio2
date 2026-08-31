import TextScramble from '../components/ui/TextScramble.jsx'

export default function Showreel() {
  return (
    <section className="showreel">
      <div className="container">
        <h2 className="showreel-headline display balance">
          <TextScramble as="span" text="Most developers write code. I ship products." trigger="scroll" className="scramble-line" />
        </h2>
        <div className="showreel-body">
          <div><div className="showreel-tag">( The step aside )</div></div>
          <p className="showreel-text">
            In a world of infinite frameworks, the rare thing is clarity.
            I build with intent — picking the right tool, shipping the right thing,
            and writing the kind of code that scales past the demo.
          </p>
        </div>
      </div>
    </section>
  )
}
