import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LoaderIntro } from './LoaderIntro.jsx'
import { ScrollProgress } from './ScrollProgress.jsx'

const EASE_CINEMATIC = [0.22, 1, 0.36, 1]

export function CinematicReveal({ children, scrollContainerRef, contentRef }) {
  const [introDone, setIntroDone] = useState(false)
  const [clipDone, setClipDone] = useState(false)
  const container = scrollContainerRef

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  }, [])

  const { scrollYProgress } = useScroll({
    container: container?.current ? container : undefined,
  })

  const spring = useSpring(scrollYProgress, { stiffness: 180, damping: 40, mass: 0.9 })
  const beamY = useTransform(spring, [0, 1], ['-30vh', '130vh'])

  useEffect(() => {
    if (reduceMotion) {
      setIntroDone(true)
      setClipDone(true)
    }
  }, [reduceMotion])

  return (
    <>
      <LoaderIntro onDone={() => setIntroDone(true)} />

      <motion.div
        className="c-reveal"
        initial={reduceMotion ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={
          introDone && !reduceMotion
            ? { clipPath: 'inset(0% 0% 0% 0%)' }
            : reduceMotion
              ? {}
              : undefined
        }
        transition={{ duration: 1.35, ease: EASE_CINEMATIC }}
        onAnimationComplete={() => setClipDone(true)}
        style={clipDone ? { clipPath: 'none' } : undefined}
      >
        <div ref={scrollContainerRef} className="c-reveal__inner">
          <div ref={contentRef} className="c-reveal__content">
            {children}
          </div>
        </div>
      </motion.div>

      <ScrollProgress containerRef={scrollContainerRef} />

      <motion.div
        className="c-beam"
        aria-hidden="true"
        style={{
          opacity: introDone ? 1 : 0,
          y: introDone ? beamY : '-30vh',
        }}
        transition={{ duration: 0.9, ease: EASE_CINEMATIC }}
      />

      <div className="c-noise" aria-hidden="true" />
    </>
  )
}

