import TextScramble from '../components/ui/TextScramble.jsx'

export default function Footer() {
  return (
    <footer id="contact">
      <div className="container">
        <div>
          <h2 className="footer-h display">
            <TextScramble as="span" text="Let’s start from zero." trigger="scroll" />
          </h2>
          <div className="footer-cta">
            <a href="mailto:mayanksherawat21@gmail.com" className="btn btn--light" data-cursor="email">
              <span>drop an email</span><span style={{ marginLeft: 6 }}>@</span>
            </a>
            <a href="tel:+917027004234" className="btn" data-cursor="call">
              <span>book a call</span>
              <span className="arrow">
                <svg viewBox="0 0 14 10" fill="none">
                  <path d="M8.6 0.35L13.12 4.87L8.6 9.39" stroke="currentColor" />
                  <line y1="5" x2="13.12" y2="5" stroke="currentColor" />
                </svg>
              </span>
            </a>
          </div>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/mayank-sherawat" target="_blank" rel="noreferrer noopener" data-cursor="linkedin">LinkedIn</a>
            <a href="https://github.com/mayank-sherawat" target="_blank" rel="noreferrer noopener" data-cursor="github">GitHub</a>
            <a href="https://babydocritu.com" target="_blank" rel="noreferrer noopener" data-cursor="live">BabyDoc</a>
            <a href="https://www.socialhouse.online" target="_blank" rel="noreferrer noopener" data-cursor="live">SocialHouse</a>
            <a href="/Mayank_Sherawat_Resume.pdf" target="_blank" rel="noreferrer noopener" data-cursor="resume">Resume ↓</a>
          </div>
        </div>
        <div className="footer-wordmark">
          <div className="footer-wordmark-text">MAYANK</div>
        </div>
        <div className="footer-info">
          <div>©2026 — Mayank Sherawat</div>
          <div>Built with intent · <a href="mailto:mayanksherawat21@gmail.com">mayanksherawat21@gmail.com</a></div>
          <div>+91 7027004234</div>
        </div>
      </div>
    </footer>
  )
}
