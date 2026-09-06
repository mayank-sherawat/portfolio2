import { useCallback, useEffect, useRef, useState } from 'react'
import './Terminal.css'

/**
 * Real, working terminal — type a command, hit Enter, get a (scripted) reply.
 * Commands: about, stack, experience, projects, contact, help, clear, sudo
 * Up/Down arrows cycle command history. Tab autocompletes.
 *
 * A *row* is either a single segment or an array of segments rendered inline on
 * one line. A segment is `{ tone, text }`, plus an optional `href` to render it
 * as a link. Output prints character by character (see the printer below).
 */
const LINKS = {
  telehealth: 'https://babydocritu.com',
  socialhouse: 'https://www.socialhouse.online',
  linkedin: 'https://www.linkedin.com/in/mayank-sherawat',
  github: 'https://github.com/mayank-sherawat',
  site: 'https://www.mayanksherawat.in/',
  email: 'mailto:mayanksherawat21@gmail.com',
  resume: '/Mayank_Sherawat_Resume.pdf'
}

const COMMANDS = {
  about: () => [
    [{ tone: 'key', text: 'name      : ' }, { tone: 'val', text: 'Mayank Sherawat' }],
    [{ tone: 'key', text: 'role      : ' }, { tone: 'val', text: 'Graduate Engineer Trainee (GET)' }],
    [{ tone: 'key', text: 'company   : ' }, { tone: 'val', text: 'Decimal Technologies Ltd' }],
    [{ tone: 'key', text: 'focus     : ' }, { tone: 'val', text: 'full-stack · enterprise AI for BFSI' }],
    [{ tone: 'key', text: 'location  : ' }, { tone: 'val', text: 'Gurugram, India' }],
    [{ tone: 'key', text: 'education : ' }, { tone: 'val', text: 'BE CSE, Chitkara University' }],
    [{ tone: 'key', text: 'cgpa      : ' }, { tone: 'val', text: '8.76 / 10' }],
    [{ tone: 'key', text: 'exchange  : ' }, { tone: 'val', text: 'Korea University (2022)' }]
  ],
  stack: () => [
    [{ tone: 'key', text: 'languages : ' }, { tone: 'val', text: 'javascript · typescript · c · sql' }],
    [{ tone: 'key', text: 'frontend  : ' }, { tone: 'val', text: 'react · next.js · tailwind · framer motion' }],
    [{ tone: 'key', text: 'backend   : ' }, { tone: 'val', text: 'node.js · express · rest apis · prisma' }],
    [{ tone: 'key', text: 'databases : ' }, { tone: 'val', text: 'postgresql · supabase · mongodb · mysql' }],
    [{ tone: 'key', text: 'security  : ' }, { tone: 'val', text: 'nextauth · oauth 2.0 · zod · hmac-sha256' }],
    [{ tone: 'key', text: 'tools     : ' }, { tone: 'val', text: 'git · vercel · postman · razorpay · cloudinary' }]
  ],
  experience: () => [
    { tone: 'val',   text: 'Decimal Technologies Ltd — Gurugram' },
    { tone: 'muted', text: '  graduate engineer trainee   aug 2026 — present' },
    { tone: 'muted', text: '  software developer intern   feb 2026 — jul 2026' },
    { tone: 'muted', text: '  enterprise AI for BFSI clients' },
    { tone: 'val',   text: 'Escorts Kubota Ltd — Faridabad' },
    { tone: 'muted', text: '  full stack developer intern  aug 2025 — feb 2026' },
    { tone: 'muted', text: '  employee timeline management system' }
  ],
  projects: () => [
    [
      { tone: 'key', text: '01  ' }, { tone: 'val', text: 'Pediatric Telehealth  ' },
      { tone: 'muted', text: 'babydocritu.com', href: LINKS.telehealth }
    ],
    [
      { tone: 'key', text: '02  ' }, { tone: 'val', text: 'SocialHouse           ' },
      { tone: 'muted', text: 'socialhouse.online', href: LINKS.socialhouse }
    ],
    [
      { tone: 'key', text: '03  ' }, { tone: 'val', text: 'Employee Timeline     ' },
      { tone: 'muted', text: 'internal · Escorts Kubota' }
    ],
    { tone: 'muted', text: '// open to work' }
  ],
  resume: () => [
    [{ tone: 'val', text: 'Mayank_Sherawat_Resume.pdf', href: LINKS.resume }],
    { tone: 'muted', text: '// opens in a new tab' }
  ],
  contact: () => [
    [{ tone: 'key', text: 'email     : ' }, { tone: 'val', text: 'mayanksherawat21@gmail.com', href: LINKS.email }],
    [{ tone: 'key', text: 'phone     : ' }, { tone: 'val', text: '+91 7027004234', href: 'tel:+917027004234' }],
    [{ tone: 'key', text: 'linkedin  : ' }, { tone: 'val', text: 'linkedin.com/in/mayank-sherawat', href: LINKS.linkedin }],
    [{ tone: 'key', text: 'github    : ' }, { tone: 'val', text: 'github.com/mayank-sherawat', href: LINKS.github }],
    [{ tone: 'key', text: 'site      : ' }, { tone: 'val', text: 'mayanksherawat.in', href: LINKS.site }]
  ],
  help: () => [
    [
      { tone: 'muted', text: 'available: ' },
      { tone: 'key', text: 'about' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'stack' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'experience' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'projects' }
    ],
    [
      { tone: 'muted', text: '           ' },
      { tone: 'key', text: 'resume' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'contact' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'clear' }, { tone: 'muted', text: '  ' },
      { tone: 'key', text: 'sudo <cmd>' }
    ]
  ],
  sudo: (args) => args.length
    ? [{ tone: 'err', text: `sudo: '${args.join(' ')}' is not a command. nice try though.` }]
    : [{ tone: 'err', text: 'sudo: a password is required. (just kidding — try: sudo hire mayank)' }],
  'sudo hire mayank': () => [
    { tone: 'val', text: '✓ request sent — ' },
    { tone: 'key', text: 'mayanksherawat21@gmail.com', href: LINKS.email }
  ]
}

/* clickable shortcuts under the prompt — nothing else tells you what to type */
const CHIPS = ['about', 'stack', 'experience', 'projects', 'resume', 'contact', 'clear']

/* the terminal plays this once on load so it doesn't sit there empty */
const DEMO_CMD = 'about'
const TYPE_SPEED = 95     // input typing, per char
const PRINT_TICK = 18     // output printing, per frame
const PRINT_CHARS = 4     // chars revealed per frame

const WELCOME = [
  { tone: 'muted', text: 'welcome — type ' },
  { tone: 'key', text: 'help' },
  { tone: 'muted', text: ' to get started.' }
]

const toSegs = row => (Array.isArray(row) ? row : [row])
const rowLen = row => toSegs(row).reduce((n, s) => n + (s.text ? s.text.length : 0), 0)
const isSep = row => !Array.isArray(row) && row.tone === 'sep'

/* the first `len` characters of a row, cutting mid-segment when needed */
function sliceRow(row, len) {
  const out = []
  let left = len
  for (const seg of toSegs(row)) {
    if (left <= 0) break
    const t = seg.text || ''
    out.push(left >= t.length ? seg : { ...seg, text: t.slice(0, left) })
    left -= t.length
  }
  return out
}

function Segments({ segs }) {
  return segs.map((s, j) =>
    s.href ? (
      <a
        key={j}
        className={`tl-${s.tone} tl-link`}
        href={s.href}
        target={/^(mailto:|tel:)/.test(s.href) ? undefined : '_blank'}
        rel="noreferrer noopener"
        onClick={e => e.stopPropagation()}
      >
        {s.text}
      </a>
    ) : (
      <span key={j} className={`tl-${s.tone}`}>{s.text}</span>
    )
  )
}

function Row({ row, segs }) {
  if (row && isSep(row)) return <div className="tl-sep"><hr className="tl-sep" /></div>
  return <div className="tl-row"><Segments segs={segs || toSegs(row)} /></div>
}

export default function Terminal() {
  const [lines, setLines] = useState([WELCOME])
  const [queue, setQueue] = useState([])        // rows waiting to print
  const [partial, setPartial] = useState(null)  // { row, len } printing now
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const demoRef = useRef({ cancelled: false })
  const reduceRef = useRef(false)

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  /* deliberately no autofocus on mount — the terminal sits above the fold, and
     stealing focus there pops the on-screen keyboard on phones. Click to type. */

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines, partial])

  /* ---- printer: reveals queued rows a few characters at a time ---- */
  useEffect(() => {
    if (partial) {
      const total = rowLen(partial.row)
      if (partial.len >= total) {
        setLines(l => [...l, partial.row])
        setPartial(null)
        return undefined
      }
      const t = setTimeout(() => {
        setPartial(p => (p ? { row: p.row, len: Math.min(total, p.len + PRINT_CHARS) } : p))
      }, PRINT_TICK)
      return () => clearTimeout(t)
    }
    if (queue.length) {
      const [next, ...rest] = queue
      /* separators and blank rows have nothing to type */
      if (isSep(next) || rowLen(next) === 0) setLines(l => [...l, next])
      else setPartial({ row: next, len: 0 })
      setQueue(rest)
    }
    return undefined
  }, [partial, queue])

  const exec = useCallback((raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    setHistory(h => [...h, cmd])
    setHIdx(-1)
    if (cmd === 'clear') {
      setLines([]); setQueue([]); setPartial(null)
      return
    }
    const echo = [{ tone: 'prompt', text: '$ ' }, { tone: 'key', text: cmd }]
    const handler = COMMANDS[cmd] || COMMANDS[cmd.split(' ')[0]]
    const args = cmd.split(' ').slice(1)
    const out = handler
      ? handler(args)
      : [{ tone: 'err', text: `command not found: ${cmd}. try 'help'.` }]

    /* the echo lands instantly — you just pressed enter. The reply prints. */
    setLines(l => [...l, echo])
    if (reduceRef.current) setLines(l => [...l, ...out, { tone: 'sep', text: '' }])
    else setQueue(q => [...q, ...out, { tone: 'sep', text: '' }])
  }, [])

  const cancelDemo = useCallback(() => { demoRef.current.cancelled = true }, [])

  /* type DEMO_CMD out by itself, then run it */
  useEffect(() => {
    const state = demoRef.current
    const timers = []
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => { if (!state.cancelled) { setInput(''); exec(DEMO_CMD) } }

    if (reduce) { run(); return undefined }

    /* on a fresh tab the loader covers the page — wait it out rather than
       spending the animation behind an opaque overlay */
    let loaderPlayed = false
    try { loaderPlayed = sessionStorage.getItem('mayank-loader-played') === '1' } catch {}

    timers.push(setTimeout(() => {
      if (state.cancelled) return
      for (let i = 0; i < DEMO_CMD.length; i++) {
        timers.push(setTimeout(() => {
          if (!state.cancelled) setInput(DEMO_CMD.slice(0, i + 1))
        }, i * TYPE_SPEED))
      }
      timers.push(setTimeout(run, DEMO_CMD.length * TYPE_SPEED + 350))
    }, loaderPlayed ? 800 : 2600))

    return () => timers.forEach(clearTimeout)
  }, [exec])

  const onKeyDown = (e) => {
    cancelDemo()
    if (e.key === 'Enter') { exec(input); setInput('') }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const ni = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(ni); setInput(history[ni])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (hIdx < 0) return
      const ni = hIdx + 1
      if (ni >= history.length) { setHIdx(-1); setInput('') }
      else { setHIdx(ni); setInput(history[ni]) }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const m = input.trim().match(/^(\S*)$/)
      if (!m) return
      const match = Object.keys(COMMANDS).find(c => c.startsWith(m[1]))
      if (match) setInput(match)
    }
  }

  const runChip = (e, cmd) => {
    e.stopPropagation()
    cancelDemo()
    setInput('')
    exec(cmd)
    inputRef.current?.focus()
  }

  const busy = partial !== null || queue.length > 0

  return (
    <div className="terminal-live" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-name">mayank@portfolio: ~</span>
      </div>

      <div className="terminal-body" ref={scrollRef} data-lenis-prevent>
        {lines.map((row, i) => <Row key={i} row={row} />)}
        {partial && <Row segs={sliceRow(partial.row, partial.len)} />}

        <div className="tl-line">
          <span className="tl-prompt">$</span>
          <input
            ref={inputRef}
            className="tl-input"
            value={input}
            onChange={e => { cancelDemo(); setInput(e.target.value) }}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
          {/* while output is still printing the block cursor would read as a
              second caret next to the one at the end of the text */}
          {!busy && <span className="tl-cursor" />}
        </div>
      </div>

      <div className="terminal-chips">
        {CHIPS.map(c => (
          <button key={c} type="button" className="terminal-chip" onClick={e => runChip(e, c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
