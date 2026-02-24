import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const EASE_CINEMATIC = [0.22, 1, 0.36, 1]

export function MagneticButton({
  as,
  className,
  children,
  strength = 0.28,
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (reduce) return

    const handleMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      el.style.setProperty('--mx', `${dx * strength}px`)
      el.style.setProperty('--my', `${dy * strength}px`)
    }

    const handleLeave = () => {
      el.style.setProperty('--mx', `0px`)
      el.style.setProperty('--my', `0px`)
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
    }
  }, [strength])

  const Component = as ?? (props.href ? motion.a : motion.button)

  return (
    <Component
      ref={ref}
      className={className}
      transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
      {...props}
    >
      {children}
    </Component>
  )
}

