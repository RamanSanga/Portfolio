import { motion } from 'framer-motion'

const cx = (...values) => values.filter(Boolean).join(' ')

export function Container({ as: As = 'div', className, children }) {
  return (
    <As className={cx('c-container', className)}>
      {children}
    </As>
  )
}

export function Section({ as, id, className, children, reveal = true }) {
  const As = as ?? motion.section

  return (
    <As
      id={id}
      className={cx('c-section', className)}
      data-section
      {...(reveal
        ? {
            initial: { y: 120, rotateX: 10, opacity: 0 },
            whileInView: { y: 0, rotateX: 0, opacity: 1 },
            viewport: { once: true, margin: '-15% 0px -15% 0px' },
            transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          }
        : null)}
    >
      {children}
    </As>
  )
}

export function SectionHeader({ eyebrow, title, description, className }) {
  return (
    <div className={cx('c-sectionHeader', className)}>
      {eyebrow ? <p className="c-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="c-h2">{title}</h2> : null}
      {description ? <p className="c-lead">{description}</p> : null}
    </div>
  )
}

