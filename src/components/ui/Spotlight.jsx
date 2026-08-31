import { useEffect, useRef } from 'react'
import './Spotlight.css'

/* Soft radial gradient that follows the cursor across the page.
   Sits behind everything (z-index: 1) so it just adds depth. */
export default function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return
    let raf
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let cx = tx, cy = ty

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }
    window.addEventListener('mousemove', onMove)

    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.background =
        `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(245,245,245,.06), transparent 50%)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}
