import { useEffect, useRef, useState } from 'react'

/**
 * Animated counter that counts up to `value` when scrolled into view.
 * Supports decimals via `decimals`. Optional `prefix` / `suffix`.
 */
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const playedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const play = () => {
      if (playedRef.current) return
      playedRef.current = true
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / (duration * 1000))
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3)
        setN(value * eased)
        if (t < 1) requestAnimationFrame(tick)
        else setN(value)
      }
      requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { play(); io.disconnect() }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return <span ref={ref}>{prefix}{n.toFixed(decimals)}{suffix}</span>
}
