import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export function TiltCard({ className, children, maxTilt = 12, ...props }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 260, damping: 30, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 260, damping: 30, mass: 0.6 })

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    mx.set(px)
    my.set(py)
    el.style.setProperty('--px', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--py', `${(py + 0.5) * 100}%`)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className ?? 'c-tilt'}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <div className="c-tilt__inner">{children}</div>
    </motion.div>
  )
}

