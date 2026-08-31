import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

/**
 * Text scramble — cycles random characters per glyph then settles on the
 * target text. Triggers on mount + every time the element scrolls into view.
 *
 *   <TextScramble text="MAYANK" as="h1" className="..." />
 */
export default function TextScramble({
  text,
  as: Tag = 'span',
  className = '',
  speed = 28,
  revealDelay = 0,
  trigger = 'mount',          // 'mount' | 'scroll'
  respectMotion = true
}) {
  const ref = useRef(null)
  const [out, setOut] = useState(() => text.replace(/[A-Za-z0-9]/g, () => ' '))

  useEffect(() => {
    if (respectMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text); return
    }

    let cancelled = false
    let startTimer

    const run = () => {
      if (cancelled) return
      const target = text.split('')
      const len = target.length
      const queue = target.map((_, i) => {
        const from = Math.min(Math.max(i * 0.6, 0), 8)  // wave per char
        const to   = from + 6
        return { from, to, char: target[i], start: -1 }
      })

      let frame = 0
      const tick = () => {
        if (cancelled) return
        let s = ''
        let done = 0
        for (let i = 0; i < len; i++) {
          const q = queue[i]
          if (q.char === ' ') { s += ' '; done++; continue }
          if (frame >= q.from) {
            if (q.start < 0) q.start = frame
            if (frame > q.to) { s += q.char; done++ }
            else s += CHARS[Math.floor(Math.random() * CHARS.length)]
          } else {
            s += ' '
          }
        }
        setOut(s)
        if (done >= len) return
        frame++
        setTimeout(tick, speed)
      }
      tick()
    }

    if (trigger === 'scroll') {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { run(); io.disconnect() }
        })
      }, { threshold: 0.3 })
      if (ref.current) io.observe(ref.current)
      return () => { cancelled = true; io.disconnect() }
    } else {
      startTimer = setTimeout(run, revealDelay)
    }

    return () => { cancelled = true; if (startTimer) clearTimeout(startTimer) }
  }, [text, speed, revealDelay, trigger, respectMotion])

  return <Tag ref={ref} className={className}>{out}</Tag>
}
