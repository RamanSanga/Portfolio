import { motion, useScroll, useTransform } from 'framer-motion'

export function BackgroundParallax({ containerRef }) {
  const { scrollYProgress } = useScroll(
    containerRef?.current ? { container: containerRef } : undefined,
  )

  const y1 = useTransform(scrollYProgress, [0, 1], ['0vh', '-14vh'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh'])

  return (
    <div className="c-parallax" aria-hidden="true">
      <motion.div className="c-parallax__orb c-parallax__orb--a" style={{ y: y1 }} />
      <motion.div className="c-parallax__orb c-parallax__orb--b" style={{ y: y2 }} />
    </div>
  )
}

