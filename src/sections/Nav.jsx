import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="nav">
        <a href="#top" className="nav-logo" data-cursor="home">MAYANK</a>
        <div className="nav-menu">
          <a href="#works"  className="nav-link" data-cursor="works">works</a>
          <a href="#about"  className="nav-link" data-cursor="studio">studio</a>
          <a href="#contact" className="nav-link" data-cursor="contact">contact</a>
        </div>
        <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Open menu">
          <span>menu</span>
          <svg className="burger-svg" viewBox="0 0 12 12" fill="none">
            <rect y="5" width="6" height="2" fill="currentColor" />
            <rect y="9" width="6" height="2" fill="currentColor" />
            <rect y="1" width="6" height="2" fill="currentColor" />
            <rect x="6" y="5" width="6" height="2" fill="currentColor" />
            <rect x="6" y="9" width="6" height="2" fill="currentColor" />
            <rect x="6" y="1" width="6" height="2" fill="currentColor" />
          </svg>
        </button>
      </nav>
      <div className={`menu-overlay ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
        <a href="#works"   className="menu-link" onClick={() => setOpen(false)}>works</a>
        <a href="#about"   className="menu-link" onClick={() => setOpen(false)}>studio</a>
        <a href="#contact" className="menu-link" onClick={() => setOpen(false)}>contact</a>
        <div className="menu-cta">
          <a href="mailto:mayanksherawat21@gmail.com" className="btn btn--light" data-cursor="email">drop an email</a>
          <a href="#contact" className="btn" data-cursor="talk" onClick={() => setOpen(false)}>get in touch</a>
        </div>
      </div>
    </>
  )
}
