import { Container, Section, SectionHeader } from '../components/layout/LayoutPrimitives.jsx'

const SKILL_GROUPS = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'Java', 'C++'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Backend & Databases',
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Authentication',
      'Payments',
    ],
  },
  {
    title: 'Testing & Automation',
    skills: ['Selenium', 'Playwright'],
  },
  {
    title: 'DevOps & Deployment',
    skills: ['GitHub Actions', 'Docker', 'CI/CD'],
  },
  {
    title: 'AI / GenAI & Tools',
    skills: ['OpenAI API', 'Git', 'GitHub'],
  },
]

export function SkillsSection() {
  return (
    <Section
      id="skills"
      className="c-skills"
    >
      <Container className="c-stack">
        <SectionHeader
          eyebrow="Skills"
          title="Clear full‑stack capabilities."
          description="A tech stack centered around the MERN ecosystem with strong backend skills, testing, and deployment experience."
        />

        <div className="c-skillGrid">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="c-card c-card--skill c-revealUp"
            >
              <div>
                <p className="c-card__k">
                  {group.title}
                </p>
                <ul className="c-tags" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="c-tag"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

