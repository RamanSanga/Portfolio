import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoaderIntro({ onDone }) {
  const [phase, setPhase] = useState('loading') // loading | done
  const [progress, setProgress] = useState(0)

  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase('done')
      onDone?.()
      return
    }

    let raf = 0
    const start = performance.now()
    const durationMs = 1400

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setPhase('done')
          onDone?.()
        }, 180)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone, shouldReduceMotion])

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          className="c-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="c-loader__inner">
            <div className="c-loader__top">
              <span className="c-loader__mark">R</span>
              <span className="c-loader__label">Initializing</span>
            </div>

            <div className="c-loader__stack">
              <div className="c-loader__title display-font">CINEMATIC</div>
              <div className="c-loader__title display-font c-loader__title--outline">
                REVEAL
              </div>
            </div>

            <div className="c-loader__bar">
              <motion.div
                className="c-loader__fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ type: 'tween', duration: 0.1 }}
              />
            </div>

            <div className="c-loader__meta">
              <span className="c-loader__pct">{String(progress).padStart(2, '0')}%</span>
              <span className="c-loader__hint">Scroll to navigate</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

