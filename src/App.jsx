import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Cursor from './Cursor.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import CommandPalette from './components/ui/CommandPalette.jsx'
import CaseStudyModal from './components/ui/CaseStudyModal.jsx'
import Marquee from './components/ui/Marquee.jsx'

import ErrorBoundary from './sections/ErrorBoundary.jsx'
import Loader from './sections/Loader.jsx'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Showreel from './sections/Showreel.jsx'
import Works from './sections/Works.jsx'
import Now from './sections/Now.jsx'
import Stats from './sections/Stats.jsx'
import About from './sections/About.jsx'
import Glitch from './sections/Glitch.jsx'
import Footer from './sections/Footer.jsx'

import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import './App.css'
import './components/ui/ProjectMockup.css'

gsap.registerPlugin(ScrollTrigger)

const STACK    = ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind', 'Vercel', 'Supabase', 'MongoDB', 'Zod', 'NextAuth']
const SERVICES = ['Brand Identities', 'Campaigns', 'Digital Experiences', 'Events', 'Visual Systems', 'Web Apps', 'AI Integrations', 'Design Systems']

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
      gsap.to('.hero-wordmark-text', {
        letterSpacing: '-0.08em',
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      })
      gsap.utils.toArray('.showreel-headline, .about-h2, .now-title, .glitch-final, .footer-h').forEach(el => {
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
      /* parallax on the marquees — slight depth shift */
      gsap.utils.toArray('.marquee').forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? -80 : 80,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
        })
      })
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
        <Marquee items={STACK} duration={40} className="marquee--outline" />
        <Showreel />
        <Works onOpenCase={setActiveCase} />
        <Marquee items={SERVICES} duration={50} />
        <Now />
        <Stats />
        <Marquee items={STACK} duration={45} reverse />
        <About />
        <Glitch />
      </main>

      <Footer />

      <CaseStudyModal projectId={activeCase} onClose={() => setActiveCase(null)} />
    </ErrorBoundary>
  )
}
