import { Container } from './LayoutPrimitives.jsx'

export function Footer() {
  return (
    <footer className="c-footer">
      <Container className="c-footer__inner">
        <p>© {new Date().getFullYear()} Raman. All rights reserved.</p>
        <p className="c-footer__hint">
          Built with React, Tailwind CSS, and a MERN backend.
        </p>
      </Container>
    </footer>
  )
}

