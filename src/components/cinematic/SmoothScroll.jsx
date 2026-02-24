import { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'

const SmoothScrollContext = createContext(null)

export function SmoothScrollProvider({ wrapperRef, contentRef, children }) {
  const lenisRef = useRef(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  }, [])

  useEffect(() => {
    const wrapper = wrapperRef?.current
    const content = contentRef?.current
    if (!wrapper || !content) return
    if (reduceMotion) return

    const lenis = new Lenis({
      wrapper,
      content,
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      smoothTouch: false,
    })

    lenisRef.current = lenis

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [contentRef, reduceMotion, wrapperRef])

  const value = useMemo(
    () => ({
      scrollTo: (target, opts) => {
        const lenis = lenisRef.current
        if (lenis) lenis.scrollTo(target, { ...opts })
        else {
          const el = typeof target === 'string' ? document.querySelector(target) : target
          if (el?.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      },
      getLenis: () => lenisRef.current,
    }),
    [],
  )

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

