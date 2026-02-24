import { motion } from 'framer-motion'
import { Container, Section } from '../components/layout/LayoutPrimitives.jsx'
import { MagneticButton } from '../components/cinematic/MagneticButton.jsx'
import { MouseGlow } from '../components/cinematic/MouseGlow.jsx'
import { useSmoothScroll } from '../components/cinematic/SmoothScroll.jsx'

const EASE = [0.22, 1, 0.36, 1]

function MaskLine({ children, delay = 0 }) {
  return (
    <span className="c-maskLine">
      <motion.span
        className="c-maskLine__inner"
        initial={{ y: '120%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function HeroSection() {
  const smooth = useSmoothScroll()

  return (
    <Section id="hero" className="c-hero" reveal={false}>
      <div className="c-hero__bg" aria-hidden="true">
        <div className="c-waves" />
        <div className="c-hero__glows" />
        <div className="c-ghostText display-font">RAMAN</div>
      </div>

      <MouseGlow />

      <Container className="c-hero__container">
        <div className="c-hero__grid">
          <div className="c-hero__copy">
            <motion.p
              className="c-kicker"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
            >
              MERN · Full‑Stack · Systems mindset
            </motion.p>

            <h1 className="c-h1 display-font">
              <MaskLine delay={0.18}>Build.</MaskLine>
              <MaskLine delay={0.28}>Scale.</MaskLine>
              <MaskLine delay={0.38}>
                Ship with <span className="c-accent">electric</span> precision.
              </MaskLine>
            </h1>

            <motion.p
              className="c-hero__sub"
              initial={{ y: 26, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.55 }}
            >
              I design and build premium web products across React, Node, Express,
              and databases—clean architectures, secure auth, payments, and
              production deployments.
            </motion.p>

            <motion.div
              className="c-hero__cta"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.0, ease: EASE, delay: 0.72 }}
            >
              <MagneticButton
                className="c-btn c-btn--primary"
                type="button"
                onClick={() => smooth?.scrollTo?.('#projects', { offset: -10 })}
              >
                View Projects
              </MagneticButton>
              <MagneticButton
                className="c-btn c-btn--glass"
                type="button"
                onClick={() => smooth?.scrollTo?.('#contact', { offset: -10 })}
              >
                Let&apos;s talk
              </MagneticButton>
            </motion.div>

            <motion.div
              className="c-hero__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}
            >
              <span className="c-pill">Auth · JWT · Firebase</span>
              <span className="c-pill">Payments · Razorpay</span>
              <span className="c-pill">Deploy · Docker · CI/CD</span>
            </motion.div>
          </div>

          <div className="c-hero__depth" aria-hidden="true">
            <div className="c-depthCard c-depthCard--a" />
            <div className="c-depthCard c-depthCard--b" />
            <div className="c-depthCard c-depthCard--c" />
          </div>
        </div>
      </Container>
    </Section>
  )
}

