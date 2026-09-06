import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

function playIntro() {
  try {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.nav',                     { y: -30, opacity: 0, duration: 0.7 }, 0.05)
      .from('.hero-statement__lead',    { y: 20,  opacity: 0, duration: 0.8 }, 0.15)
      .from('.hero-statement__body',    { y: 30,  opacity: 0, duration: 1.0 }, 0.3)
      .from('.hero-cta',                { y: 20,  opacity: 0, duration: 0.7 }, 0.45)
      .from('.hero-terminal',           { y: 24,  opacity: 0, duration: 0.9 }, 0.35)
  } catch (e) {
    console.warn('[intro skipped]', e)
  }
}

export default function Loader() {
  const [done, setDone] = useState(() => {
    try { return sessionStorage.getItem('mayank-loader-played') === '1' } catch { return false }
  })
  const [num, setNum] = useState(0)
  useEffect(() => {
    if (done) return
    let pct = 0
    const tick = setInterval(() => {
      pct += Math.random() * 9 + 3
      if (pct >= 100) {
        pct = 100
        clearInterval(tick)
        setTimeout(() => {
          setDone(true)
          try { sessionStorage.setItem('mayank-loader-played', '1') } catch {}
          /* choreographed intro — fire after loader exits */
          requestAnimationFrame(() => playIntro())
        }, 250)
      }
      setNum(Math.floor(pct))
    }, 90)
    return () => clearInterval(tick)
  }, [done])

  if (done) return null
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-mark"><span>M</span></div>
        <div className="floating f1" /><div className="floating f2" /><div className="floating f3" />
        <div className="floating f4" /><div className="floating f5" />
        <div className="loader-num">{String(num).padStart(3, '0')} / 100</div>
      </div>
    </div>
  )
}
