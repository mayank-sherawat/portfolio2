import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './Cursor.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import CommandPalette from './components/ui/CommandPalette.jsx'
import CaseStudyModal from './components/ui/CaseStudyModal.jsx'

import ErrorBoundary from './sections/ErrorBoundary.jsx'
import Loader from './sections/Loader.jsx'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Works from './sections/Works.jsx'
import Build from './sections/Build.jsx'
import Now from './sections/Now.jsx'
import Stats from './sections/Stats.jsx'
import About from './sections/About.jsx'
import Glitch from './sections/Glitch.jsx'
import Footer from './sections/Footer.jsx'

import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [activeCase, setActiveCase] = useState(null)

  useSmoothScroll()

  /* GSAP scroll animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.forme').forEach((el, i) => {
        gsap.to(el, {
          y: () => (i % 2 === 0 ? -60 : -100) * (1 + i * 0.15),
          rotation: i % 2 === 0 ? 6 : -8,
          ease: 'none',
          scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true }
        })
      })
      gsap.utils.toArray('.about-h2, .now-title, .glitch-final, .footer-h').forEach(el => {
        gsap.from(el, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        })
      })
      gsap.from('.footer-wordmark-text', {
        scale: 1.4, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-wordmark', start: 'top 90%' }
      })
      /* The three scrolling word strips that used to sit between these
         sections were deleted in Sep 2026 — see CLAUDE.md. Nothing replaced
         them, and their ScrollTrigger went with them. */
    })
    return () => ctx.revert()
  }, [])

  /* smooth in-page scroll */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1) {
        const t = document.querySelector(id)
        if (t) {
          e.preventDefault()
          if (window.__lenis) {
            window.__lenis.scrollTo(t, { offset: 0, duration: 1.2 })
          } else {
            t.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <ErrorBoundary>
      <Cursor />
      <Loader />
      <Nav />
      <ScrollProgress />
      <CommandPalette />

      <main>
        <Hero />
        <Works onOpenCase={setActiveCase} />
        <Build />
        <Now />
        <Stats />
        <About />
        <Glitch />
      </main>

      <Footer />

      <CaseStudyModal projectId={activeCase} onClose={() => setActiveCase(null)} />
    </ErrorBoundary>
  )
}
