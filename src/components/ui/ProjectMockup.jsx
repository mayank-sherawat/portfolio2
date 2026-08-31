import './ProjectMockup.css'

/* Custom SVG mockups for each project — looks like real product UI,
   not generic abstract patterns. Each one hints at the actual app. */

export default function ProjectMockup({ id }) {
  if (id === 'telehealth') return <Telehealth />
  if (id === 'socialhouse') return <SocialHouse />
  if (id === 'timeline')    return <Timeline />
  return null
}

/* ====================================================================
   PEDIATRIC TELEHEALTH  —  phone frame + appointment booking
   ==================================================================== */
function Telehealth() {
  return (
    <div className="mock mock--phone" aria-hidden="true">
      <div className="mock__notch" />
      <div className="mock__screen mock__screen--light">
        <div className="mock__topbar">
          <div className="mock__time">9:41</div>
          <div className="mock__dots">
            <span /><span /><span />
          </div>
        </div>
        <div className="mock__app">
          <div className="mock__greet">Good morning,</div>
          <div className="mock__name">Priya's Mom 👋</div>

          <div className="mock__hero-card">
            <div className="mock__hero-tag">UPCOMING</div>
            <div className="mock__hero-title">Dr. Anjali Sharma</div>
            <div className="mock__hero-sub">Pediatrician · Tue 2:30 PM</div>
            <button className="mock__btn mock__btn--primary" type="button">
              Join Google Meet →
            </button>
          </div>

          <div className="mock__sec-head">Next available</div>
          <div className="mock__slots">
            <div className="mock__slot">
              <div className="mock__slot-day">TUE</div>
              <div className="mock__slot-num">14</div>
            </div>
            <div className="mock__slot mock__slot--active">
              <div className="mock__slot-day">WED</div>
              <div className="mock__slot-num">15</div>
            </div>
            <div className="mock__slot">
              <div className="mock__slot-day">THU</div>
              <div className="mock__slot-num">16</div>
            </div>
            <div className="mock__slot">
              <div className="mock__slot-day">FRI</div>
              <div className="mock__slot-num">17</div>
            </div>
          </div>
        </div>
        <div className="mock__tabbar">
          <span className="mock__tab mock__tab--on" />
          <span className="mock__tab" />
          <span className="mock__tab" />
          <span className="mock__tab" />
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   SOCIALHOUSE  —  phone frame + social feed
   ==================================================================== */
function SocialHouse() {
  return (
    <div className="mock mock--phone" aria-hidden="true">
      <div className="mock__notch" />
      <div className="mock__screen mock__screen--dark">
        <div className="mock__topbar">
          <div className="mock__time">9:41</div>
          <div className="mock__dots">
            <span /><span /><span />
          </div>
        </div>
        <div className="mock__app">
          <div className="mock__feed-head">
            <div className="mock__feed-title">feed</div>
            <div className="mock__feed-icon">⌘</div>
          </div>
          <div className="mock__post">
            <div className="mock__post-head">
              <div className="mock__avatar mock__avatar--1">SR</div>
              <div className="mock__post-meta">
                <div className="mock__post-name">sara.rae</div>
                <div className="mock__post-time">2h</div>
              </div>
            </div>
            <div className="mock__post-img" />
            <div className="mock__post-actions">
              <span>♡ 142</span>
              <span>◴ 18</span>
              <span>↗</span>
            </div>
          </div>
          <div className="mock__post mock__post--noimg">
            <div className="mock__post-head">
              <div className="mock__avatar mock__avatar--2">DK</div>
              <div className="mock__post-meta">
                <div className="mock__post-name">dev.kapoor</div>
                <div className="mock__post-time">5h</div>
              </div>
            </div>
            <div className="mock__post-line" />
            <div className="mock__post-line mock__post-line--short" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ====================================================================
   EMPLOYEE TIMELINE  —  desktop frame + HR timeline view
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
