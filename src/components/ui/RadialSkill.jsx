import { useEffect, useRef, useState } from 'react'
import './RadialSkill.css'

/* SVG circular progress with animated stroke.
   Triggers when scrolled into view. */
export default function RadialSkill({ value = 0, label, sub, delay = 0 }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  const R = 36
  const C = 2 * Math.PI * R

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setV(value), delay)
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, delay])

  const offset = C * (1 - v / 100)

  return (
    <div className="radial" ref={ref}>
      <svg className="radial__svg" viewBox="0 0 80 80">
        <circle className="radial__bg" cx="40" cy="40" r={R} />
        <circle
          className="radial__fg"
          cx="40" cy="40" r={R}
          style={{
            strokeDasharray: C,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1.4s cubic-bezier(.34,1.56,.64,1)'
          }}
        />
      </svg>
      <div className="radial__num">{v}</div>
      <div className="radial__label">
        <div className="radial__label-main">{label}</div>
        {sub && <div className="radial__label-sub">{sub}</div>}
      </div>
    </div>
  )
}
