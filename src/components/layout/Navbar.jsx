import { useMemo, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Container } from './LayoutPrimitives.jsx'
import { useSmoothScroll } from '../cinematic/SmoothScroll.jsx'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar({ scrollContainerRef }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const smooth = useSmoothScroll()

  const handleNavClick = (id) => {
    smooth?.scrollTo?.(`#${id}`, { offset: -10 })
    setOpen(false)
  }

  const { scrollY } = useScroll(
    scrollContainerRef?.current ? { container: scrollContainerRef } : undefined,
  )

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 18)
  })

  const navClass = useMemo(
    () => `c-nav ${scrolled ? 'c-nav--glass' : 'c-nav--top'}`,
    [scrolled],
  )

  return (
    <motion.header
      className={navClass}
      initial={false}
      animate={{ backgroundColor: scrolled ? 'rgba(10, 14, 28, 0.65)' : 'rgba(10, 14, 28, 0)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="c-nav__inner">
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="c-brand"
        >
          <span className="c-brand__mark">
            R
          </span>
          <span className="c-brand__name">
            Raman
          </span>
        </button>

        <nav className="c-nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className="c-nav__link"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="c-nav__cta">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="c-btn c-btn--glass c-btn--sm"
          >
            Let&apos;s talk
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="c-nav__burger"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="c-nav__burgerLines" aria-hidden="true">
            <span />
            <span />
          </div>
        </button>
      </Container>

      {open && (
        <div className="c-nav__mobile">
          <Container className="c-nav__mobileInner">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="c-nav__mobileLink"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="c-btn c-btn--primary c-btn--full"
            >
              Let&apos;s talk
            </button>
          </Container>
        </div>
      )}
    </motion.header>
  )
}

