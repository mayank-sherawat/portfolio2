import './Marquee.css'

/**
 * Infinite horizontal marquee. Pure CSS animation — no JS scroll loops.
 * Duplicates the children once and translates the track 50% over the
 * duration so the loop is seamless.
 */
export default function Marquee({
  items = [],
  separator = '·',
  duration = 30,
  reverse = false,
  className = ''
}) {
  const track = (
    <div className="marquee__track" style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
      {[0, 1].map(k => (
        <div className="marquee__group" key={k} aria-hidden={k === 1}>
          {items.map((it, i) => (
            <span key={i} className="marquee__item">
              <span className="marquee__text">{it}</span>
              <span className="marquee__sep">{separator}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      {track}
    </div>
  )
}
