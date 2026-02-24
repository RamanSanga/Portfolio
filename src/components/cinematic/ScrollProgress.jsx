import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress({ containerRef }) {
  const { scrollYProgress } = useScroll(
    containerRef?.current ? { container: containerRef } : undefined,
  )
  const p = useSpring(scrollYProgress, { stiffness: 160, damping: 35, mass: 0.8 })

  return (
    <div className="c-progress" aria-hidden="true">
      <motion.div className="c-progress__bar" style={{ scaleY: p }} />
      <div className="c-progress__track" />
    </div>
  )
}

