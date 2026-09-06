import './ProjectMockup.css'

/* Card artwork for each project.

   Telehealth and SocialHouse are REAL screenshots of the live sites, captured
   with headless Chrome and encoded to webp (recipe in CLAUDE.md). They live in
   public/ and are referenced by root path.

   Timeline is internal to Escorts Kubota with no public URL, so it keeps a
   hand-built mockup — clearly illustrative rather than pretending to be a
   screenshot of something nobody outside the company can see. */

const SHOTS = {
  telehealth: {
    frame: 'phone',
    src: '/shot-telehealth.webp',
    w: 520, h: 1000
  },
  socialhouse: {
    frame: 'browser',
    src: '/shot-socialhouse.webp',
    w: 1280, h: 800,
    host: 'socialhouse.online'
  }
}

export default function ProjectMockup({ id }) {
  const shot = SHOTS[id]
  if (shot) return shot.frame === 'phone' ? <PhoneShot {...shot} /> : <BrowserShot {...shot} />
  if (id === 'timeline') return <Timeline />
  return null
}

/* The whole mock is decorative — the card already carries the project's name,
   description and tags as real text — so the wrapper is aria-hidden and the
   image takes an empty alt rather than repeating that copy to a screen reader. */
function Shot({ src, w, h }) {
  return (
    <img
      className="mock__shot"
      src={src}
      width={w}
      height={h}
      alt=""
      loading="lazy"
      decoding="async"
    />
  )
}

/* ====================================================================
   PHONE FRAME  —  for sites whose real layout is a portrait column
   ==================================================================== */
function PhoneShot(props) {
  return (
    <div className="mock mock--phone" aria-hidden="true">
      <div className="mock__screen mock__screen--shot">
        <Shot {...props} />
      </div>
    </div>
  )
}

/* ====================================================================
   BROWSER FRAME  —  for sites whose real layout is wide
   ==================================================================== */
function BrowserShot({ host, ...props }) {
  return (
    <div className="mock mock--browser" aria-hidden="true">
      <div className="mock__screen mock__screen--shot">
        <div className="mock__chrome">
          <span className="mock__chrome-dot" />
          <span className="mock__chrome-dot" />
          <span className="mock__chrome-dot" />
          <span className="mock__chrome-url">{host}</span>
        </div>
        {/* the wrapper owns the ratio, not the img: an <img> sizing itself from
            aspect-ratio while it is a flex item stretched to the frame's width
            resolved to the full card height instead of 16:10 */}
        <div className="mock__viewport">
          <Shot {...props} />
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   EMPLOYEE TIMELINE  —  desktop frame + HR timeline view
   Drawn, not captured: the system is internal and has no public URL.
   ==================================================================== */
function Timeline() {
  return (
    <div className="mock mock--desktop" aria-hidden="true">
      <div className="mock__screen mock__screen--light">
        <div className="mock__topbar mock__topbar--desktop">
          <div className="mock__logo">▣ Escorts Kubota</div>
          <div className="mock__nav-items">
            <span>Employees</span>
            <span>Timeline</span>
            <span className="mock__nav-active">Reports</span>
            <span>Settings</span>
          </div>
          <div className="mock__avatar mock__avatar--3">A</div>
        </div>
        <div className="mock__desk">
          <div className="mock__desk-side">
            <div className="mock__search">⌕ search employees</div>
            <div className="mock__emp-list">
              {['Rakesh Kumar', 'Priya Singh', 'Vikram Reddy', 'Anjali Mehta', 'Suresh Yadav'].map((n, i) => (
                <div key={i} className={`mock__emp ${i === 0 ? 'mock__emp--on' : ''}`}>
                  <div className={`mock__avatar mock__avatar--${(i % 3) + 1}`}>{n.split(' ').map(p => p[0]).join('')}</div>
                  <div>
                    <div className="mock__emp-name">{n}</div>
                    <div className="mock__emp-id">EID-{(2000 + i * 47).toString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mock__desk-main">
            <div className="mock__emp-hero">
              <div className="mock__avatar mock__avatar--1" style={{ width: 56, height: 56, fontSize: 16 }}>RK</div>
              <div>
                <div className="mock__emp-name" style={{ fontSize: 18 }}>Rakesh Kumar</div>
                <div className="mock__emp-id">EID-2000 · Plant: Faridabad · Joined Mar 2019</div>
              </div>
            </div>
            <div className="mock__timeline">
              <div className="mock__tl-line" />
              {[
                { y: 0,    t: 'Joined',          s: 'Assembly Line',   col: 'a' },
                { y: 32,   t: 'Promoted',        s: 'Senior Operator', col: 'b' },
                { y: 60,   t: 'Training',        s: 'CNC Machining',   col: 'a' },
                { y: 86,   t: 'Transfer',        s: 'Quality Control', col: 'c' }
              ].map((e, i) => (
                <div key={i} className="mock__tl-event" style={{ top: `${e.y}%` }}>
                  <div className={`mock__tl-dot mock__tl-dot--${e.col}`} />
                  <div className="mock__tl-card">
                    <div className="mock__tl-t">{e.t}</div>
                    <div className="mock__tl-s">{e.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
