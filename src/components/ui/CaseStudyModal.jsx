import { useEffect, useRef } from 'react'
import './CaseStudyModal.css'

/* Full case-study data for each project */
export const CASE_STUDIES = {
  telehealth: {
    n: '01',
    title: 'Pediatric Telehealth',
    year: 'Jan — Feb 2026',
    role: 'Full-Stack Developer',
    status: 'live · production',
    summary: 'A production-ready telehealth platform for a pediatric clinic — built end-to-end in 8 weeks with a tight focus on UX, security, and the boring middleware that actually makes the app work.',
    sections: [
      {
        head: 'The problem',
        body: 'A pediatric clinic was running consultations over WhatsApp and Google Forms. Parents had no reliable way to book, no payment trail, no digital prescriptions, and the clinic had no-shows they couldn’t chase. They needed a real platform — fast.'
      },
      {
        head: 'What I built',
        body: 'Appointment scheduling with slot locking, Razorpay payment + verification + refund recovery, automated Google Meet link generation, a protected doctor dashboard, and a Zod-validated server action layer. The whole thing runs on Next.js Route Handlers with Supabase as the data layer.'
      },
      {
        head: 'Hard parts',
        body: 'The payment → slot-locking race condition. Two parents click the same slot at the same second, one pays, one gets a refund — but only if the slot was actually held. Solved it with a Supabase row-level lock pattern + idempotent webhook handling on the Razorpay callback.'
      }
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Razorpay', 'Google Meet API', 'Zod', 'Vercel'],
    links: [
      { label: 'live demo',  href: '#', kind: 'primary' },
      { label: 'source',     href: '#', kind: 'secondary' }
    ]
  },
  socialhouse: {
    n: '02',
    title: 'SocialHouse',
    year: 'Nov — Dec 2025',
    role: 'Full-Stack Developer',
    status: 'live · production',
    summary: 'A full-stack social media platform — auth, media, feeds, profiles. The kind of project you build once to learn how every layer of the modern web stack actually fits together.',
    sections: [
      {
        head: 'The problem',
        body: 'I wanted to understand what makes a social app feel responsive. Not the DMs, not the algorithm — just the basics: auth that doesn’t break, media that loads fast, a feed that updates without a refresh, and a profile that feels like yours.'
      },
      {
        head: 'What I built',
        body: 'NextAuth.js for sessions, Prisma over PostgreSQL for everything (users, posts, follows, likes, comments), Cloudinary for media transformations on upload, ISR for the public feeds, and a custom optimistic-update layer for the like / save actions.'
      },
      {
        head: 'Hard parts',
        body: 'The feed query. Naive `SELECT * FROM posts ORDER BY created_at DESC` is fine for 100 posts. It’s not fine for 100k. Ended up with a timeline + fan-out-on-write pattern, cursor-based pagination, and aggressive Cloudinary eager-transforms for the post images.'
      }
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Cloudinary', 'Vercel'],
    links: [
      { label: 'live demo',  href: '#', kind: 'primary' },
      { label: 'source',     href: '#', kind: 'secondary' }
    ]
  },
  timeline: {
    n: '03',
    title: 'Employee Timeline System',
    year: 'Aug 2025 — Feb 2026',
    role: 'Full-Stack Developer (Intern)',
    status: 'internal · shipped',
    summary: 'An internal workforce-tracking system for Escorts Kubota — a real product used by the HR team to track employee milestones, transfers, and training records across the company.',
    sections: [
      {
        head: 'The problem',
        body: 'The HR team was managing employee records across three different Excel sheets, two SharePoint lists, and a stack of paper files. The turnover for a 2000-person company was unmanageable, and compliance audits were a nightmare.'
      },
      {
        head: 'What I built',
        body: 'A Next.js + Express + TypeScript app with role-based access, a timeline view of every employee’s history, bulk-import from the existing spreadsheets, and a PDF export for audit packets. REST APIs with proper status codes, Zod-validated payloads, and a clean separation between the admin and employee-facing views.'
      },
      {
        head: 'Hard parts',
        body: 'The data migration. Three Excel sheets that three different people had been editing for two years — with conflicting formats, missing fields, and a handful of rows that were clearly wrong. Wrote a normalisation pipeline that surfaced the bad data instead of silently dropping it, and a small admin tool to fix the inconsistencies by hand.'
      }
    ],
    tech: ['Next.js', 'Node.js', 'Express', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    links: []
  }
}

export default function CaseStudyModal({ projectId, onClose }) {
  const overlay = useRef(null)
  const panel   = useRef(null)

  useEffect(() => {
    if (!projectId) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      if (window.__lenis) window.__lenis.start()
    }
  }, [projectId, onClose])

  if (!projectId) return null
  const cs = CASE_STUDIES[projectId]
  if (!cs) return null

  const onBackdrop = (e) => { if (e.target === overlay.current) onClose() }

  return (
    <div className="cs" ref={overlay} onClick={onBackdrop} role="dialog" aria-modal="true" aria-label={`${cs.title} case study`} data-lenis-prevent>
      <div className="cs__panel" ref={panel} data-lenis-prevent>
        <button 
          className="cs__close" 
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }} 
          aria-label="Close modal" 
          data-cursor="close"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="cs__hero">
          <div className="cs__num">{cs.n}</div>
          <h2 className="cs__title display">{cs.title}</h2>
          <div className="cs__meta">
            <span>{cs.role}</span>
            <span className="cs__dot" />
            <span>{cs.year}</span>
            <span className="cs__dot" />
            <span className="cs__status">{cs.status}</span>
          </div>
          <p className="cs__summary">{cs.summary}</p>
        </div>

        <div className="cs__body">
          {cs.sections.map((s, i) => (
            <div className="cs__section" key={i}>
              <h3 className="cs__section-head">/ {String(i + 1).padStart(2, '0')} — {s.head}</h3>
              <p className="cs__section-body">{s.body}</p>
            </div>
          ))}

          <div className="cs__section">
            <h3 className="cs__section-head">/ tech</h3>
            <div className="cs__tech">
              {cs.tech.map(t => <span key={t} className="cs__chip">{t}</span>)}
            </div>
          </div>

          {cs.links.length > 0 && (
            <div className="cs__section">
              <h3 className="cs__section-head">/ links</h3>
              <div className="cs__links">
                {cs.links.map(l => (
                  <a key={l.label} href={l.href} className={`cs__link cs__link--${l.kind}`} data-cursor={l.kind === 'primary' ? 'view' : 'open'}>
                    {l.label} <span className="cs__arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
