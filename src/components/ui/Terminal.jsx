import { useEffect, useRef, useState } from 'react'
import './Terminal.css'

/**
 * Real, working terminal — type a command, hit Enter, get a (scripted) reply.
 * Commands: about, stack, projects, contact, help, clear, sudo
 * Up/Down arrows cycle command history. Tab autocompletes.
 */
const COMMANDS = {
  about: () => [
    { tone: 'key',  text: 'name      : ' }, { tone: 'val', text: 'Mayank Sherawat' },
    { tone: 'key',  text: 'role      : ' }, { tone: 'val', text: 'Full-Stack Developer' },
    { tone: 'key',  text: 'location  : ' }, { tone: 'val', text: 'Gurugram, India' },
    { tone: 'key',  text: 'cgpa      : ' }, { tone: 'val', text: '8.76 / 10' },
    { tone: 'key',  text: 'exchange  : ' }, { tone: 'val', text: 'Korea University (2022)' },
    { tone: 'sep',  text: '—' }
  ],
  stack: () => [
    { tone: 'val', text: 'next.js  ·  react  ·  typescript  ·  node.js  ·  express' },
    { tone: 'val', text: 'postgresql  ·  mongodb  ·  prisma  ·  supabase' },
    { tone: 'val', text: 'tailwind  ·  nextauth  ·  zod  ·  vercel  ·  cloudinary' }
  ],
  projects: () => [
    { tone: 'val', text: '01  Pediatric Telehealth  —  Next.js · Supabase · Razorpay' },
    { tone: 'val', text: '02  SocialHouse           —  Next.js · Prisma · NextAuth' },
    { tone: 'val', text: '03  Employee Timeline     —  Next.js · Express · TypeScript' },
    { tone: 'muted', text: '// 1 more slot — open to work' }
  ],
  contact: () => [
    { tone: 'val', text: 'email     : mayanksherawat21@gmail.com' },
    { tone: 'val', text: 'phone     : +91 7027004234' },
    { tone: 'val', text: 'linkedin  : linkedin.com/in/mayanksherawat' }
  ],
  help: () => [
    { tone: 'muted', text: 'available: ' },
    { tone: 'key',   text: 'about' }, { tone: 'val', text: '  ' },
    { tone: 'key',   text: 'stack' }, { tone: 'val', text: '  ' },
    { tone: 'key',   text: 'projects' }, { tone: 'val', text: '  ' },
    { tone: 'key',   text: 'contact' }, { tone: 'val', text: '  ' },
    { tone: 'key',   text: 'clear' }, { tone: 'val', text: '  ' },
    { tone: 'key',   text: 'sudo <cmd>' }
  ],
  sudo: (args) => args.length
    ? [{ tone: 'err', text: `sudo: '${args.join(' ')}' is not a command. nice try though.` }]
    : [{ tone: 'err', text: 'sudo: a password is required. (just kidding — try: sudo hire mayank)' }],
  'sudo hire mayank': () => [
    { tone: 'val', text: '✓ request sent — opening mail client…' }
  ]
}

export default function Terminal() {
  const [lines, setLines] = useState([
    { tone: 'muted', text: 'welcome — type ' },
    { tone: 'key',   text: 'help' },
    { tone: 'muted', text: ' to get started.' }
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines])

  const exec = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    setHistory(h => [...h, cmd])
    setHIdx(-1)
    const promptLine = [{ tone: 'prompt', text: '$ ' }, { tone: 'key', text: cmd }]
    if (cmd === 'clear') { setLines([]); return }
    const handler = COMMANDS[cmd] || COMMANDS[cmd.split(' ')[0]]
    const args = cmd.split(' ').slice(1)
    let out
    if (handler) out = handler(args)
    else out = [{ tone: 'err', text: `command not found: ${cmd}. try 'help'.` }]
    setLines(l => [...l, promptLine, ...out, { tone: 'sep', text: '' }])
  }

  const onKeyDown = (e) => {
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

  return (
    <div className="terminal-live" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-name">mayank@portfolio: ~</span>
      </div>
      <div className="terminal-body" ref={scrollRef}>
        {lines.map((l, i) => (
          <div key={i} className={`tl-${l.tone}`}>
            {l.tone === 'sep' ? <hr className="tl-sep" /> : l.text}
          </div>
        ))}
        <div className="tl-line">
          <span className="tl-prompt">$</span>
          <input
            ref={inputRef}
            className="tl-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
          />
          <span className="tl-cursor" />
        </div>
      </div>
    </div>
  )
}
