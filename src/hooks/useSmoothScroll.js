import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Ultra-smooth momentum scroll with Lenis + frame-synced GSAP ScrollTrigger.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      infinite: false,
    })

    window.__lenis = lenis

    // Keep GSAP ScrollTrigger in lockstep with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tickerUpdate = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => {
      ScrollTrigger.refresh()
    }
    const t1 = setTimeout(refresh, 150)
    const t2 = setTimeout(refresh, 700)
    window.addEventListener('resize', refresh)
    document.fonts?.ready?.then(refresh)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      window.removeEventListener('resize', refresh)
      gsap.ticker.remove(tickerUpdate)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}

