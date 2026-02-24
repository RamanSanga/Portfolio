import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MouseGlow({ className }) {
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const sx = useSpring(x, { stiffness: 220, damping: 35, mass: 0.8 })
  const sy = useSpring(y, { stiffness: 220, damping: 35, mass: 0.8 })

  useEffect(() => {
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reduce) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  return (
    <motion.div
      className={className ?? 'c-mouseGlow'}
      aria-hidden="true"
      style={{
        translateX: sx,
        translateY: sy,
      }}
    />
  )
}

