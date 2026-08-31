import { useRef, useEffect } from 'react'

/**
 * High-performance 3D mouse-tracked tilt.
 * Runs RAF only while hovered and cancels immediately once settled.
 */
export function useTilt({ max = 8, scale = 1.02, perspective = 1000, speed = 0.15 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    let rect = null
    let tx = 0, ty = 0
    let cx = 0, cy = 0
    let isHovered = false
    let rafId = null

    const updateRect = () => {
      if (el) rect = el.getBoundingClientRect()
    }

    const tick = () => {
      cx += (tx - cx) * speed
      cy += (ty - cy) * speed

      const currentScale = isHovered ? scale : 1 + (scale - 1) * Math.min(1, Math.hypot(cx, cy) / max)
      el.style.transform = `perspective(${perspective}px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`

      // If mouse left and tilt settled close to 0, stop RAF loop completely
      if (!isHovered && Math.abs(cx) < 0.05 && Math.abs(cy) < 0.05) {
        el.style.transform = ''
        cx = 0
        cy = 0
        rafId = null
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick)
      }
    }

    const onEnter = () => {
      isHovered = true
      updateRect()
      startLoop()
    }

    const onMove = (e) => {
      if (!rect) updateRect()
      if (!rect || rect.width === 0 || rect.height === 0) return

      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      tx = (py - 0.5) * -max
      ty = (px - 0.5) * max
      startLoop()
    }

    const onLeave = () => {
      isHovered = false
      tx = 0
      ty = 0
      startLoop()
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [max, scale, perspective, speed])

  return ref
}

