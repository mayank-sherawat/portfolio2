import { useTilt } from '../hooks/useTilt.js'
import ProjectMockup from '../components/ui/ProjectMockup.jsx'

const PROJECTS = [
  {
    id: 'telehealth',
    n: '01 / 03',
    title: ['Pediatric', 'Telehealth'],
    desc: 'A production-ready telehealth platform for a pediatric clinic — scheduling, payments, Meet links, doctor dashboard.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'Zod'],
    year: 'JAN — FEB 2026',
    accent: 'cyan'
  },
  {
    id: 'socialhouse',
    n: '02 / 03',
    title: ['Social', 'House'],
    desc: 'A full-stack social platform — auth, media, feeds, deployed on Vercel. The kind of thing you build to learn how everything fits.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Cloudinary'],
    year: 'NOV — DEC 2025',
    accent: 'orange'
  },
  {
    id: 'timeline',
    n: '03 / 03',
    title: ['Employee', 'Timeline System'],
    desc: 'An internal workforce tracking system for Escorts Kubota — RESTful APIs, interactive UI, designed to scale across teams.',
    tags: ['Next.js', 'Node.js', 'Express', 'TypeScript', 'Tailwind'],
    year: 'AUG 2025 — FEB 2026',
    wide: true,
    accent: 'green'
  }
]

function WorkCard({ project, tiltRef, onOpen }) {
  return (
    <article
      ref={tiltRef}
      className={`work-card work-card--tilt work-card--${project.accent} ${project.wide ? 'work-card--wide' : ''}`}
      onClick={() => onOpen(project.id)}
      data-cursor="view"
    >
      <div className="work-card__shine" aria-hidden="true" />
      <div className="work-card__bg" aria-hidden="true">
        <ProjectMockup id={project.id} />
      </div>
      <div className="work-card__overlay" aria-hidden="true" />
      <div className="work-content">
        <div className="work-num">{project.n}</div>
        <h3 className="work-title display">
          {project.title.map((t, j) => <span key={j}>{t}<br /></span>)}
        </h3>
        <p className="work-desc">{project.desc}</p>
      </div>
      <div className="work-foot">
        <div className="work-tags">
          {project.tags.map((t, j) => <span key={j} className="work-tag">{t}</span>)}
        </div>
        <div className="work-year">{project.year}</div>
      </div>
      <div className="work-explore">
        <span>case study</span>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M8.6 0.35L13.12 4.87L8.6 9.39" stroke="currentColor" />
          <line y1="5" x2="13.12" y2="5" stroke="currentColor" />
        </svg>
      </div>
    </article>
  )
}

export default function Works({ onOpenCase }) {
  const t1 = useTilt({ max: 6, scale: 1.015 })
  const t2 = useTilt({ max: 6, scale: 1.015 })
  const t3 = useTilt({ max: 4, scale: 1.008 })
  const tilts = [t1, t2, t3]
  return (
    <section className="works" id="works">
      <div className="container">
        <div className="works-letters">
          <span>w</span><span>o</span><span>r</span><span>k</span><span>s</span>
          <span className="underline"></span>
        </div>
        <div className="works-grid">
          {PROJECTS.map((p, i) => (
            <WorkCard key={i} project={p} tiltRef={tilts[i]} onOpen={onOpenCase} />
          ))}
        </div>
        <div className="works-meta">
          <div className="count">(<span>03</span>)</div>
          <div>© 25 — 26</div>
        </div>
      </div>
    </section>
  )
}
