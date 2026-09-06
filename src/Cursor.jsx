import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const cursorRef = useRef(null)
  const trailRef  = useRef(null)
  const labelRef  = useRef(null)

  useEffect(() => {
    /* Bail on touch / mobile / unsupported devices */
    const isTouch = window.matchMedia('(hover: none)').matches ||
                    window.matchMedia('(max-width: 991px)').matches ||
                    'ontouchstart' in window
    if (isTouch) {
      document.documentElement.style.cursor = 'auto'
      return
    }

    const cursor = cursorRef.current
    const trail  = trailRef.current
    const label  = labelRef.current
    if (!cursor || !trail) return

    let tx = -100, ty = -100
    let cx = -100, cy = -100
    let bx = -100, by = -100
    let isVisible = false
    let isHero = false
    /* elements that keep the OS pointer instead (see index.css) — the custom
       cursor hides over them so you never see two cursors at once */
    let isNative = false
    let isHovering = false
    let currentLabel = ''
    let magneticCenter = null
    let rafId = null

    const MAG_RADIUS = 80
    const MAG_PULL   = 0.35
    const NATIVE_CURSOR = '.nav a, .nav button, .hero a, .hero button'

    const updateVisibility = () => {
      const show = isVisible && !isHero && !isNative
      if (show) {
        cursor.classList.add('is-visible')
        trail.classList.add('is-visible')
      } else {
        cursor.classList.remove('is-visible')
        trail.classList.remove('is-visible')
      }
    }

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY

      if (!isVisible) {
        isVisible = true
        cx = tx
        cy = ty
        bx = tx
        by = ty
        updateVisibility()
      }
    }

    const onEnter = () => {
      isVisible = true
      updateVisibility()
    }

    const onLeave = () => {
      isVisible = false
      isNative = false
      magneticCenter = null
      updateVisibility()
    }

    /* Event delegation for hover & magnetic target detection */
    const onOver = (e) => {
      const heroEl = e.target.closest('.hero')
      const nextIsHero = heroEl !== null
      const nextIsNative = e.target.closest(NATIVE_CURSOR) !== null
      if (nextIsHero !== isHero || nextIsNative !== isNative) {
        isHero = nextIsHero
        isNative = nextIsNative
        updateVisibility()
      }

      const interactive = e.target.closest('a, button, .btn, .work-card, [data-cursor], [data-magnetic]')
      if (interactive) {
        isHovering = true
        cursor.classList.add('is-hovering')
        const lbl = interactive.dataset.cursor || interactive.getAttribute('aria-label') || (interactive.tagName === 'A' ? '→' : '')
        if (label && lbl !== currentLabel) {
          currentLabel = lbl
          label.textContent = lbl
        }

        if (interactive.hasAttribute('data-magnetic') || interactive.classList.contains('btn') || interactive.classList.contains('nav-link')) {
          const rect = interactive.getBoundingClientRect()
          magneticCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            radius: Math.max(MAG_RADIUS, Math.hypot(rect.width, rect.height) / 2)
          }
        } else {
          magneticCenter = null
        }
      }
    }

    const onOut = (e) => {
      const interactive = e.target.closest('a, button, .btn, .work-card, [data-cursor], [data-magnetic]')
      if (interactive && !interactive.contains(e.relatedTarget)) {
        isHovering = false
        cursor.classList.remove('is-hovering')
        currentLabel = ''
        if (label) label.textContent = ''
        magneticCenter = null
      }
    }

    const onScroll = () => {
      /* Invalidate magnetic target & hide label on rapid scrolling to prevent sticky tooltips */
      if (magneticCenter) magneticCenter = null
      if (isHovering) {
        isHovering = false
        cursor.classList.remove('is-hovering')
        currentLabel = ''
        if (label) label.textContent = ''
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    /* Smooth 60/120fps animation loop */
    const loop = () => {
      let targetX = tx
      let targetY = ty

      if (magneticCenter) {
        const d = Math.hypot(tx - magneticCenter.x, ty - magneticCenter.y)
        if (d < magneticCenter.radius) {
          const pull = (1 - d / magneticCenter.radius) * MAG_PULL
          targetX = tx + (magneticCenter.x - tx) * pull
          targetY = ty + (magneticCenter.y - ty) * pull
        } else {
          magneticCenter = null
        }
      }

      // Crisp, responsive lerp speeds
      cx += (targetX - cx) * 0.35
      cy += (targetY - cy) * 0.35
      bx += (tx - bx) * 0.18
      by += (ty - by) * 0.18

      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`
      trail.style.transform  = `translate3d(${bx}px, ${by}px, 0) translate(-50%, -50%) scale(${magneticCenter ? 2.2 : 1})`

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <div className="cursor-square" />
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />
    </>
  )
}

