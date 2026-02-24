import { motion } from 'framer-motion'

const EASE_CINEMATIC = [0.22, 1, 0.36, 1]

export function SectionSeparator() {
  return (
    <div className="c-sep" aria-hidden="true">
      <motion.div
        className="c-sep__line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
        transition={{ duration: 1.1, ease: EASE_CINEMATIC }}
      />
    </div>
  )
}

