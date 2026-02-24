import './App.css'
import { useRef } from 'react'
import { CinematicReveal } from './components/cinematic/CinematicReveal.jsx'
import { SmoothScrollProvider } from './components/cinematic/SmoothScroll.jsx'
import { BackgroundParallax } from './components/cinematic/BackgroundParallax.jsx'
import { Navbar } from './components/layout/Navbar.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { SectionSeparator } from './components/cinematic/SectionSeparator.jsx'
import { HeroSection } from './sections/Hero.jsx'
import { AboutSection } from './sections/About.jsx'
import { SkillsSection } from './sections/Skills.jsx'
import { ProjectsSection } from './sections/Projects.jsx'
import { ContactSection } from './sections/Contact.jsx'

function App() {
  const scrollRef = useRef(null)
  const contentRef = useRef(null)

  return (
    <SmoothScrollProvider wrapperRef={scrollRef} contentRef={contentRef}>
      <CinematicReveal scrollContainerRef={scrollRef} contentRef={contentRef}>
        <div className="app-shell">
          <BackgroundParallax containerRef={scrollRef} />
          <Navbar scrollContainerRef={scrollRef} />
          <main className="c-main" role="main">
            <HeroSection />
            <SectionSeparator />
            <AboutSection />
            <SectionSeparator />
            <SkillsSection />
            <SectionSeparator />
            <ProjectsSection />
            <SectionSeparator />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </CinematicReveal>
    </SmoothScrollProvider>
  )
}

export default App
