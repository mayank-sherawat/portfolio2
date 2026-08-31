import { useRef, useEffect } from 'react'
import TextScramble from '../components/ui/TextScramble.jsx'
import RadialSkill from '../components/ui/RadialSkill.jsx'

const SKILLS = [
  { value: 95, label: 'React / Next.js',         sub: 'frontend & SSR' },
  { value: 92, label: 'TypeScript / Node.js',    sub: 'type-safe full stack' },
  { value: 88, label: 'PostgreSQL / MongoDB',    sub: 'relational & document' },
  { value: 85, label: 'Prisma / NextAuth / Zod', sub: 'data, auth, validation' },
  { value: 90, label: 'Tailwind CSS',            sub: 'utility-first styling' },
  { value: 80, label: 'REST APIs / Vercel',      sub: 'shipping & deployment' }
]

const FORME_SVGS = [
  { cls: 'f-papier', svg: <svg viewBox="0 0 100 100" fill="none"><rect x="15" y="15" width="70" height="70" stroke="#f5f5f5" strokeWidth="1.5" fill="none" /><rect x="25" y="25" width="50" height="50" stroke="#f5f5f5" strokeWidth="1" fill="none" opacity=".5" /></svg> },
  { cls: 'f-chewing', svg: <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="35" stroke="#f5f5f5" strokeWidth="1.5" fill="none" /><circle cx="50" cy="50" r="20" stroke="#f5f5f5" strokeWidth="1" fill="none" opacity=".5" /></svg> },
  { cls: 'f-bonbon', svg: <svg viewBox="0 0 100 100" fill="none"><polygon points="50,15 85,75 15,75" stroke="#f5f5f5" strokeWidth="1.5" fill="none" /><polygon points="50,35 70,65 30,65" stroke="#f5f5f5" strokeWidth="1" fill="none" opacity=".5" /></svg> },
  { cls: 'f-etoile', svg: <svg viewBox="0 0 100 100" fill="none"><g stroke="#f5f5f5" strokeWidth="1.5"><line x1="50" y1="15" x2="50" y2="85" /><line x1="15" y1="50" x2="85" y2="50" /><line x1="25" y1="25" x2="75" y2="75" /><line x1="75" y1="25" x2="25" y2="75" /></g></svg> },
  { cls: 'f-coeur',  svg: <svg viewBox="0 0 100 100" fill="none"><polygon points="50,15 85,50 50,85 15,50" stroke="#f5f5f5" strokeWidth="1.5" fill="none" /><polygon points="50,30 70,50 50,70 30,50" stroke="#f5f5f5" strokeWidth="1" fill="none" opacity=".5" /></svg> }
]

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    let rect = null
    let raf = null
    let tx = 0, ty = 0

    const updateRect = () => {
      if (el) rect = el.getBoundingClientRect()
    }

    const onEnter = () => updateRect()

    const onMove = (e) => {
      if (!rect) updateRect()
      if (!rect || rect.width === 0 || rect.height === 0) return

      tx = (e.clientX - rect.left) / rect.width  - 0.5
      ty = (e.clientY - rect.top)  / rect.height - 0.5

      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', tx.toFixed(3))
          el.style.setProperty('--my', ty.toFixed(3))
          raf = null
        })
      }
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', updateRect)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', updateRect)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-intro">
          <div className="tag-label">( The Developer )</div>
          <p className="about-quote">
            <TextScramble as="span" text="I build production-ready apps with intent — picking the right tool, shipping the right thing, scaling past the demo." trigger="scroll" />
          </p>
        </div>

        <div className="about-img-grid">
          <div className="about-img about-img-tall">
            <svg viewBox="0 0 200 200" fill="none">
              <rect x="20" y="40" width="160" height="120" stroke="currentColor" strokeWidth="2" fill="none" />
              <line x1="20" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="2" />
              <circle cx="32" cy="50" r="2" fill="currentColor" />
              <circle cx="42" cy="50" r="2" fill="currentColor" />
              <circle cx="52" cy="50" r="2" fill="currentColor" />
              <line x1="35" y1="80"  x2="120" y2="80"  stroke="currentColor" strokeWidth="1" />
              <line x1="35" y1="95"  x2="160" y2="95"  stroke="currentColor" strokeWidth="1" />
              <line x1="35" y1="110" x2="100" y2="110" stroke="currentColor" strokeWidth="1" />
              <line x1="35" y1="125" x2="140" y2="125" stroke="currentColor" strokeWidth="1" />
              <line x1="35" y1="140" x2="90"  y2="140" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="about-img-caption">design with intent →</div>
          </div>
          <div className="about-img">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" fill="none" opacity=".5" />
              <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="1" fill="none" opacity=".3" />
              <circle cx="100" cy="40"  r="4" fill="currentColor" />
              <circle cx="160" cy="100" r="4" fill="currentColor" />
              <circle cx="100" cy="160" r="4" fill="currentColor" />
              <circle cx="40"  cy="100" r="4" fill="currentColor" />
              <line x1="100" y1="40"  x2="100" y2="160" stroke="currentColor" strokeWidth="0.5" opacity=".4" />
              <line x1="40"  y1="100" x2="160" y2="100" stroke="currentColor" strokeWidth="0.5" opacity=".4" />
            </svg>
            <div className="about-img-caption">or something scalable.</div>
          </div>
        </div>

        <h2 className="about-h2 display">
          <TextScramble as="span" text="Forms follow function." trigger="scroll" />
        </h2>

        <div className="skills-block">
          <div><div className="skills-title">I work with :</div></div>
          <div className="radial-grid">
            {SKILLS.map((s, i) => (
              <RadialSkill key={i} value={s.value} label={s.label} sub={s.sub} delay={i * 120} />
            ))}
          </div>
        </div>
        <p className="about-note">Clarity is where engineering meets product. The boring middle of the stack is where most apps are won or lost.</p>

        <div className="formes" aria-hidden="true">
          {FORME_SVGS.map((f, i) => (
            <div key={i} className={`forme ${f.cls}`}>{f.svg}</div>
          ))}
        </div>

        <div className="team-block">
          <div><div className="team-title">Education :</div></div>
          <div className="team-list">
            <div className="team-name">Chitkara University, Punjab <small>BE Computer Science · 8.76 CGPA · 2021—2025</small></div>
            <div className="team-name">Korea University, South Korea <small>Exchange Semester · A Grade · 2022</small></div>
          </div>
        </div>

        <div className="team-block" style={{ marginTop: '3rem' }}>
          <div><div className="team-title">Certifications :</div></div>
          <div className="team-list">
            <div className="team-name">Developing Front-End Apps with React <small>IBM</small></div>
            <div className="team-name">Getting Started with Git and GitHub <small>IBM</small></div>
            <div className="team-name">Agile Project Management <small>Google</small></div>
            <div className="team-name">Python for Data Science, AI Development <small>IBM</small></div>
            <div className="team-name">Software Engineering Specialization <small>HKUST</small></div>
          </div>
        </div>
      </div>
    </section>
  )
}
