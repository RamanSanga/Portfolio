import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } })
};
const fadeLeft = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  visible: (i = 0) => ({ opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};
const fadeRight = {
  hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
  visible: (i = 0) => ({ opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] } })
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: (i = 0) => ({ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] } })
};

// ─── CUSTOM CURSOR (clean dot only, no trailing ring) ─────────────────────────
function CustomCursor() {
  const cursorX = useSpring(-100, { stiffness: 900, damping: 40 });
  const cursorY = useSpring(-100, { stiffness: 900, damping: 40 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX - 8); cursorY.set(e.clientY - 8); };
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHovering(true); else setHovering(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <motion.div style={{ x: cursorX, y: cursorY, position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999 }}>
      <motion.div
        animate={{ scale: hovering ? 2.2 : 1, background: hovering ? "#fff" : "#00FFC8" }}
        transition={{ duration: 0.18 }}
        style={{ width: 16, height: 16, borderRadius: "50%", background: "#00FFC8" }}
      />
    </motion.div>
  );
}

// ─── SCROLL PROGRESS ──────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00FFC8, #7B61FF)", zIndex: 9998 }} />;
}

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.2rem 3rem", background: scrolled ? "rgba(8,8,12,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.4s" }}>
      <motion.span whileHover={{ scale: 1.05 }} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em", color: "#fff", cursor: "pointer" }}>
        RAMAN<span style={{ color: "#00FFC8" }}>.</span>
      </motion.span>
      <div style={{ display: "flex", gap: "2.5rem" }}>
        {["About","Skills","Projects","Experience","Contact"].map((l) => (
          <motion.a key={l} href={`#${l.toLowerCase()}`} data-hover whileHover={{ color: "#00FFC8", y: -1 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)", textDecoration: "none", textTransform: "uppercase", transition: "color 0.2s" }}>
            {l}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── BACKGROUND ORBS (fixed position — don't scroll with page) ────────────────
function BgOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <motion.div animate={{ x: [0,60,0], y: [0,-40,0], scale: [1,1.1,1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "5%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,200,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <motion.div animate={{ x: [0,-80,0], y: [0,60,0], scale: [1,1.15,1] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ position: "absolute", top: "40%", right: "5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <motion.div animate={{ x: [0,50,0], y: [0,80,0] }} transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{ position: "absolute", bottom: "10%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,80,120,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  // "RAMAN" watermark parallax — scrolls up slower so it stays visible
  const bgTextY = useTransform(scrollY, [0, 1200], [0, -300]);
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const words = ["Full-Stack", "Developer", "& QA Engineer"];

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "0 3rem", overflow: "hidden" }}>

      {/* Big RAMAN watermark — parallax scrolls with the page */}
      <motion.div
        style={{ y: bgTextY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div style={{
          position: "absolute", fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: "clamp(8rem, 30vw, 26rem)", color: "rgba(255,255,255,0.04)",
          letterSpacing: "-0.06em", userSelect: "none", zIndex: 1,
          bottom: "-10%", left: "50%", transform: "translateX(-50%)",
          whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1
        }}>
          RAMAN
        </div>
      </motion.div>

      <motion.div style={{ y: heroY, opacity: heroOpacity, textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.3em", color: "#00FFC8", textTransform: "uppercase", padding: "0.4rem 1.2rem", border: "1px solid rgba(0,255,200,0.3)", borderRadius: "2rem", background: "rgba(0,255,200,0.05)" }}>
            B.Tech CSE · Bennett University · 2027
          </span>
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
          <motion.h1 initial={{ y: 120, opacity: 0, filter: "blur(12px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(4rem, 13vw, 11rem)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
            RAMAN
          </motion.h1>
        </div>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
          {words.map((word, i) => (
            <div key={word} style={{ overflow: "hidden" }}>
              <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1.1rem, 2.8vw, 2rem)", letterSpacing: "-0.02em", color: i === 0 ? "#00FFC8" : i === 2 ? "#7B61FF" : "rgba(255,255,255,0.55)" }}>
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.88rem", lineHeight: 1.8, color: "rgba(255,255,255,0.38)", maxWidth: 500, margin: "2rem auto 3rem", letterSpacing: "0.02em" }}>
          Building full-stack apps, automation pipelines, and AI-powered experiences. CGPA 8.0 · Greater Noida.
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 1, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a href="#projects" data-hover whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,200,0.3)" }} whileTap={{ scale: 0.97 }}
            style={{ padding: "0.9rem 2.4rem", background: "#00FFC8", color: "#08080C", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4rem" }}>
            View Work
          </motion.a>
          <motion.a href="https://drive.google.com/file/d/1c3quCr54igmehRUhm0eZpU51JWKRk9sW/view?usp=sharing" target="_blank" rel="noreferrer" data-hover
            whileHover={{ scale: 1.05, borderColor: "rgba(0,255,200,0.5)", color: "#00FFC8" }} whileTap={{ scale: 0.97 }}
            style={{ padding: "0.9rem 2.4rem", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4rem", border: "1px solid rgba(255,255,255,0.15)", transition: "color 0.3s, border-color 0.3s" }}>
            Resume ↗
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
          style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(0,255,200,0.6), transparent)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── SKILL CARD (more visible, proper SVG icons) ───────────────────────────────
function SkillCard({ category, items, icon, accent, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} custom={delay} variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} data-hover
      style={{
        padding: "1.8rem", borderRadius: "18px", position: "relative", overflow: "hidden",
        background: hovered ? `rgba(255,255,255,0.06)` : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? accent : "rgba(255,255,255,0.1)"}`,
        boxShadow: hovered ? `0 0 0 1px ${accent}22, 0 8px 40px ${accent}18, 0 20px 60px rgba(0,0,0,0.3)` : "0 4px 20px rgba(0,0,0,0.2)",
        transition: "border-color 0.3s, box-shadow 0.4s, background 0.3s",
        backdropFilter: "blur(12px)"
      }}>
      {/* Glow layer */}
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% -10%, ${accent}14 0%, transparent 60%)`, pointerEvents: "none" }} />

      {/* Icon — large, colored, readable */}
      <div style={{
        width: 44, height: 44, borderRadius: "12px", background: accent + "18", border: `1px solid ${accent}30`,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.1rem", fontSize: "1.25rem", lineHeight: 1
      }}>
        {icon}
      </div>

      {/* Category title */}
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.01em", color: "#fff", margin: 0 }}>{category}</h3>
        <div style={{ width: 28, height: 2, background: accent, borderRadius: 2, marginTop: "0.4rem" }} />
      </div>

      {/* Skill pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {items.map((item) => (
          <motion.span key={item} whileHover={{ scale: 1.06, borderColor: accent }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.73rem", padding: "0.32rem 0.8rem", borderRadius: "4px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.12)", transition: "border-color 0.2s" }}>
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const skills = [
    { category: "Languages", icon: "{ }", accent: "#00FFC8", items: ["Python", "Java", "C++", "JavaScript"] },
    { category: "Web Dev", icon: "◈", accent: "#7B61FF", items: ["React.js", "Node.js", "Express.js", "HTML", "CSS"] },
    { category: "QA & Testing", icon: "✓", accent: "#FF6B6B", items: ["Selenium", "Playwright"] },
    { category: "Databases", icon: "▣", accent: "#FFB347", items: ["MySQL", "MongoDB", "PostgreSQL"] },
    { category: "DevOps & CI/CD", icon: "↺", accent: "#00FFC8", items: ["GitHub Actions", "Docker", "CI/CD Pipelines", "Git", "GitHub"] },
    { category: "AI / GenAI", icon: "◆", accent: "#7B61FF", items: ["OpenAI API"] },
  ];
  return (
    <section id="skills" style={{ padding: "10rem 3rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref}>
          <motion.div custom={0} variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00FFC8", textTransform: "uppercase" }}>02 — Skills</span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", color: "#fff", margin: "1rem 0 4rem", lineHeight: 1 }}>
            TECH<br /><span style={{ color: "rgba(255,255,255,0.2)" }}>ARSENAL</span>
          </motion.h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.2rem" }}>
          {skills.map((s, i) => <SkillCard key={s.category} {...s} delay={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECT CARD (expandable + live demo link) ────────────────────────────────
function ProjectCard({ title, tech, points, accent, index, description, liveUrl }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (expanded) return;
    const r = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - r.top) / r.height - 0.5) * 8);
    rotateY.set(-((e.clientX - r.left) / r.width - 0.5) * 8);
  };
  const handleLeave = () => { rotateX.set(0); rotateY.set(0); setHovered(false); };

  const entryVariant = index % 3 === 0 ? fadeLeft : index % 3 === 1 ? fadeUp : fadeRight;

  return (
    <motion.div ref={ref} custom={index * 0.15} variants={entryVariant} initial="hidden" animate={inView ? "visible" : "hidden"}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
        onMouseMove={handleMove} onMouseEnter={() => setHovered(true)} onMouseLeave={handleLeave} data-hover>
        <motion.div
          animate={{ borderColor: hovered || expanded ? accent + "50" : "rgba(255,255,255,0.08)", boxShadow: hovered || expanded ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}12` : "0 4px 20px rgba(0,0,0,0.15)" }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", overflow: "hidden", position: "relative" }}
        >
          <motion.div animate={{ opacity: hovered || expanded ? 1 : 0 }} transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 40% 0%, ${accent}07 0%, transparent 60%)`, pointerEvents: "none" }} />

          {/* ── Header row (always visible, clickable to expand) ── */}
          <div onClick={() => setExpanded(!expanded)} style={{ padding: "1.3rem 1.5rem", display: "flex", alignItems: "center", gap: "0.85rem", cursor: "pointer" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", color: accent, background: accent + "14", border: `1px solid ${accent}28`, borderRadius: "4px", padding: "0.16rem 0.48rem", flexShrink: 0 }}>
              0{index + 1}
            </span>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.01em", color: "#fff", flex: 1, margin: 0 }}>{title}</h3>
            <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
              {tech.slice(0, 2).map((t) => (
                <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", padding: "0.15rem 0.5rem", borderRadius: "3rem", background: accent + "10", color: accent, border: `1px solid ${accent}22` }}>{t}</span>
              ))}
            </div>
            <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ width: 26, height: 26, borderRadius: "50%", border: `1px solid ${expanded ? accent + "60" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.25s" }}>
              <span style={{ fontSize: "0.9rem", color: expanded ? accent : "rgba(255,255,255,0.4)", lineHeight: 1, fontWeight: 300 }}>+</span>
            </motion.div>
          </div>

          {/* ── Expanded panel ── */}
          <motion.div initial={false} animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 1.5rem 1.4rem", borderTop: `1px solid ${accent}18` }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.78, margin: "1rem 0 1rem" }}>{description}</p>

              {/* All tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.32rem", marginBottom: "1rem" }}>
                {tech.map((t) => (
                  <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", padding: "0.2rem 0.6rem", borderRadius: "3px", background: accent + "12", color: accent, border: `1px solid ${accent}25` }}>{t}</span>
                ))}
              </div>

              {/* Bullet points */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.2rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                {points.map((pt, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
                    <span style={{ color: accent, fontSize: "0.6rem", marginTop: "0.36rem", flexShrink: 0 }}>▸</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.74rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Live demo button */}
              {liveUrl ? (
                <motion.a href={liveUrl} target="_blank" rel="noreferrer" data-hover
                  whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${accent}25` }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.2rem", background: accent, color: "#08080C", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4px" }}>
                  Live Demo <span style={{ fontSize: "0.85rem" }}>↗</span>
                </motion.a>
              ) : (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1.2rem", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  Coming Soon
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const projects = [
    {
      title: "OneCart — E-commerce Platform",
      description: "A production-grade full-stack e-commerce platform with a comprehensive admin dashboard, real-time inventory management, and an integrated AI voice assistant for hands-free shopping.",
      tech: ["MERN", "Razorpay", "Cloudinary", "Firebase", "TailwindCSS"],
      points: ["Full-stack e-commerce with admin panel", "Firebase Google Authentication", "Razorpay payment integration", "Cloudinary media storage", "AI voice assistant"],
      accent: "#00FFC8",
      liveUrl: "https://onecart-1-frontend32.onrender.com"
    },
    {
      title: "Zobzee — Job Portal",
      description: "A role-based job portal connecting recruiters and candidates with a clean workflow, JWT-secured APIs, and resume storage handled via Cloudinary.",
      tech: ["MERN", "MongoDB", "Express.js", "Cloudinary", "JWT", "Vercel"],
      points: ["Role-based recruiter/candidate workflow", "Cloudinary resume storage", "JWT authentication", "REST API architecture"],
      accent: "#7B61FF",
      liveUrl: null
    },
    {
      title: "MegaBlog — Blogging App",
      description: "A full-featured blogging application with rich text editing via TinyMCE, Redux global state, and role-based access control for authors and readers.",
      tech: ["React", "Redux Toolkit", "Appwrite", "TinyMCE", "Vite"],
      points: ["Full CRUD blog system", "Role-based authentication", "Global state with Redux Toolkit"],
      accent: "#FF6B6B",
      liveUrl: "https://mega-blog-plum.vercel.app/"
    },
    {
      title: "FullStack Mastery",
      description: "An interactive platform with 50+ curated full-stack interview questions, smooth GSAP animations, and a polished UI to help developers prepare effectively.",
      tech: ["React", "Vite", "Tailwind CSS", "GSAP", "Framer Motion"],
      points: ["50+ full-stack interview questions", "Animated interactive UI", "GSAP + Framer Motion animations"],
      accent: "#FFB347",
      liveUrl: "https://full-stack-questions-bay.vercel.app/"
    },
    {
      title: "Random Meme Generator",
      description: "A lightweight meme generator that fetches from an external API with Local Storage support to save favorites across sessions.",
      tech: ["HTML", "CSS", "JavaScript", "Meme API", "Local Storage"],
      points: ["External Meme API integration", "Local Storage for saved memes", "Zero-dependency vanilla JS"],
      accent: "#00FFC8",
      liveUrl: "https://random-meme-generator-ivory.vercel.app/"
    },
  ];

  return (
    <section id="projects" style={{ padding: "10rem 3rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div ref={ref}>
          <motion.div custom={0} variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#7B61FF", textTransform: "uppercase" }}>03 — Projects</span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", color: "#fff", margin: "1rem 0 0.6rem", lineHeight: 1 }}>
            SELECTED<br /><span style={{ color: "rgba(255,255,255,0.2)" }}>WORK</span>
          </motion.h2>
          <motion.p custom={2} variants={fadeRight} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.74rem", color: "rgba(255,255,255,0.28)", marginBottom: "3rem", letterSpacing: "0.04em" }}>
            Click any project to expand details & view live demo ↓
          </motion.p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {projects.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const experiences = [
    {
      role: "Freelance Web Developer",
      company: "Clothing E-commerce Website",
      period: "Dec 2024 – Feb 2025",
      desc: "Developed and deployed a clothing e-commerce website for a local retailer.",
      accent: "#00FFC8"
    },
    {
      role: "SIH Hackathon — 24th Position",
      company: "Smart India Hackathon · 640+ Teams",
      period: "2024",
      desc: "Secured 24th position out of 640+ teams nationally. Collaborated under pressure to build and present an innovative solution.",
      accent: "#FFB347"
    },
  ];
  return (
    <section id="experience" style={{ padding: "8rem 3rem", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#FF6B6B", textTransform: "uppercase" }}>04 — Experience</span>
          </motion.div>
          <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", color: "#fff", margin: "1rem 0 4rem", lineHeight: 1 }}>
            WORK &<br /><span style={{ color: "rgba(255,255,255,0.2)" }}>CERTS</span>
          </motion.h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "3.5rem" }}>
          {experiences.map((exp, i) => (
            <motion.div key={exp.role} custom={i + 2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              style={{ padding: "1.8rem 2.2rem", borderRadius: "16px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "1.8rem", alignItems: "flex-start" }}>
              <div style={{ width: 3, borderRadius: 4, background: `linear-gradient(180deg, ${exp.accent}, transparent)`, flexShrink: 0, alignSelf: "stretch", minHeight: 60 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.35rem" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: exp.accent, letterSpacing: "0.1em" }}>{exp.period}</span>
                </div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.7rem" }}>{exp.company}</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h3 custom={5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1.2rem" }}>
          Certifications
        </motion.h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {[
            { text: "NVIDIA: Getting Started with Accelerated Computing in CUDA C++", accent: "#00FFC8" },
            { text: "UC San Diego: Data Structures Specialization", accent: "#7B61FF" },
          ].map((cert, i) => (
            <motion.div key={cert.text} custom={6 + i} variants={fadeLeft} initial="hidden" animate={inView ? "visible" : "hidden"}
              style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.9rem 1.4rem", borderRadius: "10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: cert.accent, flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.76rem", color: "rgba(255,255,255,0.5)" }}>{cert.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const contacts = [
    { label: "Gmail", value: "ramansanga63@gmail.com", href: "mailto:ramansanga63@gmail.com", accent: "#FF6B6B" },
    { label: "University Gmail", value: "e23cseu2005@bennett.edu.in", href: "mailto:e23cseu2005@bennett.edu.in", accent: "#7B61FF" },
    { label: "Phone", value: "+91 93065 32302", href: "tel:+919306532302", accent: "#00FFC8" },
  ];

  return (
    <section id="contact" style={{ padding: "10rem 3rem 6rem", position: "relative", zIndex: 2, textAlign: "center" }}>
      <div ref={ref} style={{ maxWidth: 720, margin: "0 auto" }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#00FFC8", textTransform: "uppercase" }}>05 — Contact</span>
        </motion.div>
        <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", color: "#fff", margin: "1rem 0 0.5rem", lineHeight: 0.92 }}>
          LET'S<br /><span style={{ color: "#00FFC8" }}>BUILD</span>
        </motion.h2>
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.84rem", color: "rgba(255,255,255,0.35)", marginBottom: "3rem", lineHeight: 1.85 }}>
          Open to freelance, internships, and full-time opportunities.<br />B.Tech CSE · Bennett University · Greater Noida
        </motion.p>

        {/* Contact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.8rem", marginBottom: "2.5rem", textAlign: "left" }}>
          {contacts.map((c, i) => (
            <motion.a key={c.label} href={c.href} custom={i + 3} variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"}
              data-hover whileHover={{ borderColor: c.accent, boxShadow: `0 0 20px ${c.accent}18` }}
              style={{ display: "block", padding: "1.1rem 1.4rem", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", transition: "border-color 0.3s, box-shadow 0.3s" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: c.accent, marginBottom: "0.4rem" }}>{c.label}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", wordBreak: "break-all" }}>{c.value}</div>
            </motion.a>
          ))}
        </div>

        <motion.div custom={6} variants={scaleIn} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a href="mailto:ramansanga63@gmail.com" data-hover whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,255,200,0.22)" }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-block", padding: "1rem 2.8rem", background: "linear-gradient(135deg, #00FFC8, #7B61FF)", color: "#08080C", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4rem" }}>
            Send Email
          </motion.a>
          <motion.a href="https://drive.google.com/file/d/1c3quCr54igmehRUhm0eZpU51JWKRk9sW/view?usp=sharing" target="_blank" rel="noreferrer" data-hover
            whileHover={{ scale: 1.05, borderColor: "rgba(0,255,200,0.4)", color: "#00FFC8" }} whileTap={{ scale: 0.97 }}
            style={{ display: "inline-block", padding: "1rem 2.8rem", background: "transparent", color: "rgba(255,255,255,0.6)", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "4rem", border: "1px solid rgba(255,255,255,0.15)", transition: "color 0.3s, border-color 0.3s" }}>
            View Resume ↗
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#08080C;cursor:none;overflow-x:hidden;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#08080C;}
        ::-webkit-scrollbar-thumb{background:#00FFC8;border-radius:4px;}
        ::selection{background:rgba(0,255,200,0.22);color:#fff;}
      `}</style>
      <CustomCursor />
      <ScrollProgress />
      <BgOrbs />
      <Nav />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer style={{ padding: "2rem 3rem", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 2 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>© 2025 RAMAN · BENNETT UNIVERSITY</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>B.TECH CSE · GREATER NOIDA</span>
      </footer>
    </>
  );
}
