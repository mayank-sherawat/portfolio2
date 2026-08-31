import { useEffect, useRef, useState, useMemo } from 'react'
import './CommandPalette.css'

/* The action library — every command the palette knows about */
const ACTIONS = [
  { id: 'home',     label: 'Go to Home',      section: 'Navigation', shortcut: 'G H', icon: '→', run: () => goTo('#top') },
  { id: 'works',    label: 'Go to Works',     section: 'Navigation', shortcut: 'G W', icon: '→', run: () => goTo('#works') },
  { id: 'studio',   label: 'Go to Studio',    section: 'Navigation', shortcut: 'G S', icon: '→', run: () => goTo('#about') },
  { id: 'contact',  label: 'Go to Contact',   section: 'Navigation', shortcut: 'G C', icon: '→', run: () => goTo('#contact') },
  { id: 'email',    label: 'Send me an email',         section: 'Actions', icon: '@', run: () => window.location.href = 'mailto:mayanksherawat21@gmail.com' },
  { id: 'call',     label: 'Copy phone number',        section: 'Actions', icon: '☎', run: () => copy('+917027004234') },
  { id: 'linkedin', label: 'Open LinkedIn',            section: 'Actions', icon: 'in', run: () => window.open('https://www.linkedin.com', '_blank') },
  { id: 'github',   label: 'Open GitHub',              section: 'Actions', icon: 'gh', run: () => window.open('https://github.com', '_blank') },
  { id: 'resume',   label: 'View source (GitHub repo)', section: 'Actions', icon: '<>', run: () => window.open('https://github.com', '_blank') },
  { id: 'theme',    label: 'Toggle theme (easter egg)', section: 'Play',   icon: '◐', run: () => flipTheme() },
  { id: 'konami',   label: '↑↑↓↓←→←→BA — try it',       section: 'Play',   icon: '✦', run: () => {} },
  { id: 'time',     label: 'What time is it?',          section: 'Fun',    icon: '◴', run: () => alert(new Date().toLocaleTimeString()) },
  { id: 'hire',     label: 'sudo hire mayank',          section: 'Fun',    icon: '$', run: () => alert('✓ request sent — opening mail client…\n(window.location = mailto)') }
]

function goTo(id) {
  const el = document.querySelector(id)
  if (el) {
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    flash(`copied: ${text}`)
  } catch {
    flash('copy failed — your browser blocked it')
  }
}
function flash(msg) {
  const el = document.getElementById('cmdk-flash')
  if (!el) return
  el.textContent = msg
  el.classList.add('is-on')
  setTimeout(() => el.classList.remove('is-on'), 1800)
}
function flipTheme() {
  document.body.classList.toggle('theme-invert')
  flash(document.body.classList.contains('theme-invert') ? 'theme: inverted' : 'theme: normal')
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  /* toggle open on Cmd/Ctrl+K */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* focus input when opened */
  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  /* filtered list */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ACTIONS
    return ACTIONS.filter(a =>
      a.label.toLowerCase().includes(q) ||
      a.section.toLowerCase().includes(q) ||
      a.id.includes(q)
    )
  }, [query])

  /* group by section */
  const groups = useMemo(() => {
    const map = new Map()
    filtered.forEach(a => {
      if (!map.has(a.section)) map.set(a.section, [])
      map.get(a.section).push(a)
    })
    return Array.from(map.entries())
  }, [filtered])

  /* flat list for keyboard nav */
  const flat = filtered

  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected(s => Math.min(flat.length - 1, s + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected(s => Math.max(0, s - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const a = flat[selected]
      if (a) { a.run(); setOpen(false) }
    }
  }

  /* scroll selected into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  /* click-outside to close */
  const onBackdrop = (e) => { if (e.target === e.currentTarget) setOpen(false) }

  return (
    <>
      <div className={`cmdk ${open ? 'is-open' : ''}`} onClick={onBackdrop} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cmdk__panel" onKeyDown={onKey}>
          <div className="cmdk__input-row">
            <svg className="cmdk__search" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              className="cmdk__input"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelected(0) }}
              placeholder="Type a command or search…"
              spellCheck="false"
              autoComplete="off"
            />
            <kbd className="cmdk__esc">esc</kbd>
          </div>

          <div className="cmdk__list" ref={listRef}>
            {groups.length === 0 && (
              <div className="cmdk__empty">no results for "{query}"</div>
            )}
            {groups.map(([section, items]) => (
              <div key={section} className="cmdk__group">
                <div className="cmdk__group-label">{section}</div>
                {items.map(a => {
                  const idx = flat.indexOf(a)
                  return (
                    <button
                      key={a.id}
                      data-idx={idx}
                      className={`cmdk__item ${idx === selected ? 'is-selected' : ''}`}
                      onMouseEnter={() => setSelected(idx)}
                      onClick={() => { a.run(); setOpen(false) }}
                      type="button"
                    >
                      <span className="cmdk__icon">{a.icon}</span>
                      <span className="cmdk__label">{a.label}</span>
                      {a.shortcut && <kbd className="cmdk__kbd">{a.shortcut}</kbd>}
                      <span className="cmdk__arrow">↵</span>
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="cmdk__foot">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
            <span className="cmdk__brand">cmd palette</span>
          </div>
        </div>
      </div>

      <div id="cmdk-flash" className="cmdk-flash" />

      <button
        className="cmdk-hint"
        onClick={() => setOpen(true)}
        data-cursor="cmd"
        aria-label="Open command palette"
      >
        <kbd>⌘</kbd><kbd>K</kbd>
      </button>
    </>
  )
}
