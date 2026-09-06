/* Every sub-item here is on the resume — these are things that exist in the
   three shipped projects, not a service menu. Adding a capability means adding
   it to the resume first. */
const BUILD = [
  {
    n: '01',
    title: 'Full-stack apps',
    desc: 'Next.js and React on the front, Node and PostgreSQL behind it. End to end, including the parts nobody sees.',
    items: ['Next.js / React', 'Node.js / Express', 'PostgreSQL / Supabase']
  },
  {
    n: '02',
    title: 'APIs & integrations',
    desc: 'RESTful APIs and the third-party services around them — taking payments, storing media, booking a call.',
    items: ['RESTful APIs', 'Razorpay payments', 'Cloudinary / Google Meet']
  },
  {
    n: '03',
    title: 'Auth & security',
    desc: 'Sessions and tokens, and the checks that decide whether a webhook is worth trusting.',
    items: ['NextAuth / OAuth 2.0', 'HMAC-SHA256 verification', 'Zod validation']
  }
]

/**
 * Stacking sticky rows, the way grigoletti.ch does it — and it is worth knowing
 * that there is NO JavaScript here on purpose.
 *
 * Each row is about a screen tall with its content always expanded, and its
 * header is `position: sticky` at an offset staggered by one header height
 * (--i). Scrolling therefore parks header 01 under the nav while its content
 * passes, then header 02 comes to rest directly beneath it, then 03. Because a
 * row is a screenful, the next row's header is below the fold while you are
 * reading the current one.
 *
 * Measured on the reference: headers settle at 134 / 234 / 334 and its
 * `getAnimations()` is empty with every `transition` at 0s. Earlier attempts
 * here drove the same look from a pinned ScrollTrigger scrub; both were
 * rejected — the first showed all three rows at once, the second dropped the
 * expand/collapse altogether. Sticky is the mechanism. Don't reintroduce a pin.
 */
export default function Build() {
  return (
    <section className="build">
      <div className="container">
        <h2 className="build__heading display">What I build</h2>

        <div className="build__list">
          {BUILD.map((row, i) => (
            <div className="build__row" key={row.n} style={{ '--i': i }}>
              <div className="build__head">
                <span className="build__num">{row.n}.</span>
                <h3 className="build__title">{row.title}</h3>
                <span className="build__arrow" aria-hidden="true">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M10.5 3.5L3.5 10.5" stroke="currentColor" />
                    <path d="M9.5 10.5H3.5V4.5" stroke="currentColor" />
                  </svg>
                </span>
              </div>

              <div className="build__panel">
                <p className="build__desc">{row.desc}</p>
                <ul className="build__items">
                  {row.items.map((it, j) => (
                    <li key={j} className="build__item">
                      <span className="build__item-num">{String(j + 1).padStart(2, '0')}</span>
                      <span className="build__item-label">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {/* Real content, not padding: Chrome bounds a sticky element by its
              containing block's CONTENT box, so padding-bottom on the list adds
              no sticky range. Without this the last row is the container's last
              content and can never stick — measured, all three rows collapsed
              onto row 03's offset the moment it arrived. */}
          <div className="build__tail" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
