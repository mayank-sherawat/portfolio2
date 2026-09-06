import { useEffect, useRef } from 'react'
import './CaseStudyModal.css'

/* Full case-study data for each project */
export const CASE_STUDIES = {
  telehealth: {
    n: '01',
    title: 'Pediatric Telehealth',
    year: 'Jul — Aug 2026',
    role: 'Full-Stack Developer',
    status: 'live · production',
    summary: 'A production-ready telehealth consultation platform for a pediatric clinic — built end-to-end, with most of the attention going to booking integrity and payment security.',
    sections: [
      {
        head: 'The problem',
        body: 'The clinic was scheduling consultations by hand. Parents had no reliable way to book, no payment trail, and no consultation link until someone messaged it to them. Manual scheduling also meant double-bookings were a matter of when, not if.'
      },
      {
        head: 'What I built',
        body: 'Appointment scheduling on atomic slot-locking, Razorpay payments with signature verification, automatic Google Meet link generation, and a Zod-validated API layer. Next.js and React on the front, Node.js and Supabase/PostgreSQL behind it. Manual scheduling went away entirely, and the double-booking rate held at 0%.'
      },
      {
        head: 'Hard parts',
        body: 'Payment integrity. A booking is only real once money has moved, so the payment webhook had to be trustworthy: HMAC-SHA256 signature verification with timing-safe comparison to reject forged callbacks, then automatic refund and slot-release logic so a failed payment never leaves a slot held or a parent charged. Transactional consistency, guaranteed at both ends.'
      }
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL', 'Razorpay', 'Google Meet API', 'Zod'],
    links: [
      { label: 'live site', href: 'https://babydocritu.com', kind: 'primary' }
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
        body: 'NextAuth.js for authentication and session management, Prisma over PostgreSQL for the whole data model (users, posts, follows, likes, comments), and Cloudinary handling media so image delivery never became the app’s bottleneck. Built in Next.js, React and TypeScript, with a production build deployed on Vercel.'
      },
      {
        head: 'Hard parts',
        body: 'Feed queries. A social feed touches users, posts, follows and likes at once, and the naive version fans out into a pile of round trips per render. Restructuring those reads through Prisma — selecting only what the feed actually renders, batching the relations instead of walking them — was what kept the timeline fast as the data grew.'
      }
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'NextAuth', 'Cloudinary'],
    links: [
      { label: 'live site', href: 'https://www.socialhouse.online', kind: 'primary' }
    ]
  },
  timeline: {
    n: '03',
    title: 'Employee Timeline System',
    year: 'Aug 2025 — Feb 2026',
    role: 'Full-Stack Developer (Intern)',
    status: 'internal · shipped',
    summary: 'An internal workforce-tracking system for Escorts Kubota — a real product used by the HR team to follow an employee’s history across the company instead of reconstructing it from scattered records.',
    sections: [
      {
        head: 'The problem',
        body: 'Workforce tracking and internal employee data were spread across disconnected records. Answering a simple question — where has this person been, what have they been trained on, when did they move — meant assembling the answer by hand every time.'
      },
      {
        head: 'What I built',
        body: 'An Employee Timeline Management System in Next.js, Node.js, Express and TypeScript, styled with Tailwind. Every employee gets one chronological view of their history, backed by RESTful APIs and interactive UI components that make the record navigable instead of just stored.'
      },
      {
        head: 'Hard parts',
        body: 'Designing the API surface so it would hold up as the system spread across teams. Getting the resource boundaries and payload shapes right early is what let the UI stay responsive and the system stay scalable as more of the workforce was loaded into it.'
      }
    ],
    tech: ['Next.js', 'Node.js', 'Express.js', 'TypeScript', 'Tailwind CSS', 'RESTful APIs'],
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
