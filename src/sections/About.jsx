import { Container, Section, SectionHeader } from '../components/layout/LayoutPrimitives.jsx'

export function AboutSection() {
  return (
    <Section
      id="about"
      className="c-about"
    >
      <Container className="c-grid c-grid--about">
        <div className="c-stack c-revealUp">
          <SectionHeader
            eyebrow="About"
            title="Clean, scalable MERN architectures."
            description="I work across the stack to design and build web applications that are cleanly structured, secure, and production‑ready."
          />

          <div className="c-prose">
            <p>
              As a MERN Stack Developer and Full Stack Engineer, I focus on
              building applications with clear separation of concerns: modular
              frontends in React.js and well‑designed backend layers with
              Node.js, Express.js, and modern databases.
            </p>
            <p>
              My work includes implementing authentication systems (JWT and
              Firebase Google Auth), integrating payment gateways like Razorpay,
              handling file and media uploads with Cloudinary, and deploying
              applications with CI/CD pipelines and Docker.
            </p>
            <p>
              I enjoy translating product requirements into maintainable
              architectures, where REST APIs, database schemas, and frontend
              components align cleanly.
            </p>
          </div>

          <dl className="c-facts">
            <div className="c-fact">
              <dt className="c-fact__k">
                Role
              </dt>
              <dd className="c-fact__v">
                MERN Stack Developer
              </dd>
            </div>
            <div className="c-fact">
              <dt className="c-fact__k">
                Backend & Auth
              </dt>
              <dd className="c-fact__v">
                Node.js · Express.js · JWT · Firebase Auth
              </dd>
            </div>
            <div className="c-fact">
              <dt className="c-fact__k">
                Payments & Deployments
              </dt>
              <dd className="c-fact__v">
                Razorpay · Docker · GitHub Actions
              </dd>
            </div>
          </dl>
        </div>

        <div className="c-stack c-revealUp">
          <div className="c-card c-card--deep">
            <p className="c-card__k">
              Architecture focus
            </p>
            <ul className="c-list">
              <li>Design REST APIs and data models for scalability.</li>
              <li>Use MongoDB, MySQL, and PostgreSQL where they fit best.</li>
              <li>Implement secure authentication and authorization flows.</li>
              <li>Integrate third‑party services like Razorpay and Cloudinary.</li>
            </ul>
          </div>

          <div className="c-card c-card--deep">
            <p className="c-card__k">
              End‑to‑end capabilities
            </p>
            <p className="c-card__p">
              From frontend React.js interfaces and responsive layouts with
              Tailwind CSS to backend APIs, database design, testing with
              Selenium and Playwright, and automated deployments using GitHub
              Actions and Docker.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

