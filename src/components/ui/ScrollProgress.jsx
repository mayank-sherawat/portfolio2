import { useEffect, useRef } from 'react'
import './ScrollProgress.css'

/* Themed scrollbar on the right edge + a thin progress line.
   Shows a stable section counter that updates with scroll. */
export default function ScrollProgress() {
  const fillRef = useRef(null)
  const numRef  = useRef(null)

  useEffect(() => {
    let raf = null

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const docEl = document.documentElement
        const scrollY = window.scrollY || docEl.scrollTop
        const max = docEl.scrollHeight - window.innerHeight
        const pct = max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 0

        if (fillRef.current) {
          fillRef.current.style.transform = `scaleY(${pct / 100})`
        }

        if (numRef.current) {
          const sections = document.querySelectorAll('section, footer')
          const total = Math.max(1, sections.length)
          let current = 1
          const triggerY = scrollY + window.innerHeight * 0.35
          sections.forEach((sec, idx) => {
            if (sec.offsetTop <= triggerY) {
              current = idx + 1
            }
          })
          numRef.current.textContent = `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
        }
        raf = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="scroll-track" aria-hidden="true">
        <div className="scroll-fill" ref={fillRef} />
      </div>
      <div className="scroll-num" ref={numRef} aria-hidden="true">01 / 07</div>
    </>
  )
}

