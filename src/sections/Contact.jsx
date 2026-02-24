import { useState } from 'react'
import { Container, Section, SectionHeader } from '../components/layout/LayoutPrimitives.jsx'
import { sendContactMessage } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'

export function ContactSection() {
  const { isAuthenticated } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    try {
      // Backend API call – contact data is sent to the
      // POST /api/contact endpoint in lib/api.js.
      await sendContactMessage(form)
      setStatus('success')
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Failed to send message')
    }
  }

  return (
    <Section
      id="contact"
      className="c-contact"
    >
      <Container className="c-grid c-grid--contact">
        <div className="c-stack c-revealUp">
          <SectionHeader
            eyebrow="Contact"
            title="Let&apos;s build something robust."
            description="Share a bit about your project, and how you&apos;d like to use the MERN stack, authentication, payments, or deployments in your product."
          />
          <div className="c-prose">
            <p>
              Whether it&apos;s a full MERN product, a job portal, a blogging
              platform, or something experimental with GenAI, I&apos;m
              comfortable working across the stack.
            </p>
            <p className="c-muted">
              The form on the right posts directly to your backend contact API
              so messages are handled server‑side.
            </p>
          </div>
        </div>

        <div className="c-card c-card--form c-revealUp">
          <form
            className="c-form"
            onSubmit={handleSubmit}
          >
            <div className="c-form__row">
              <div className="c-field">
                <label
                  htmlFor="name"
                  className="c-label"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="c-input"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="c-field">
                <label
                  htmlFor="email"
                  className="c-label"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="c-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="c-field">
              <label
                htmlFor="subject"
                className="c-label"
              >
                Project / subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="c-input"
                placeholder="E‑commerce platform, job portal, blogging app, etc."
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="c-field">
              <label
                htmlFor="message"
                className="c-label"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="c-input c-input--area"
                placeholder="Share details, timelines, and any specific integrations (auth, payments, deployments)..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {status === 'success' && (
              <p className="c-note c-note--ok">
                Message sent successfully. I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && error && (
              <p className="c-note c-note--bad">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="c-btn c-btn--primary c-btn--full"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </button>

            {isAuthenticated && (
              <p className="c-muted">
                You are authenticated in the app context. This is where
                authenticated actions (like viewing admin‑only messages) would
                hook into your backend authentication system.
              </p>
            )}
          </form>
        </div>
      </Container>
    </Section>
  )
}

