@import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    sans-serif;
  --font-display: 'Clash Display', system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', sans-serif;

  --bg: #0b0f19;
  --bg2: #070a12;
  --panel: rgba(11, 15, 25, 0.7);
  --stroke: rgba(255, 255, 255, 0.09);
  --text: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.68);
  --muted2: rgba(255, 255, 255, 0.52);

  --blue: #58d7ff;
  --purple: #8b5bff;
  --hot: #9a7bff;

  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

html,
body {
  height: 100%;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
}

body {
  margin: 0;
  overflow: hidden;
  background:
    radial-gradient(1200px 800px at 12% -10%, rgba(88, 215, 255, 0.22), transparent 55%),
    radial-gradient(900px 700px at 90% 10%, rgba(139, 91, 255, 0.22), transparent 60%),
    radial-gradient(700px 600px at 0% 70%, rgba(88, 215, 255, 0.16), transparent 60%),
    linear-gradient(180deg, var(--bg2), var(--bg));
}

.display-font {
  font-family: var(--font-display);
  letter-spacing: -0.04em;
}

.app-shell {
  position: relative;
  min-height: 100%;
  isolation: isolate;
}

.app-shell::before {
  content: '';
  position: fixed;
  inset: -20%;
  z-index: -1;
  background-image:
    radial-gradient(circle at 0 0, rgba(88, 215, 255, 0.14), transparent 55%),
    radial-gradient(circle at 100% 0, rgba(139, 91, 255, 0.12), transparent 55%),
    radial-gradient(circle at 10% 80%, rgba(88, 215, 255, 0.12), transparent 55%);
  opacity: 0.9;
  filter: blur(55px);
  transform: translate3d(0, 0, 0);
  pointer-events: none;
}

* {
  box-sizing: border-box;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

/* Cinematic reveal + scrolling */
.c-reveal {
  position: relative;
  height: 100vh;
}

.c-reveal__inner {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 84px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.c-reveal__content {
  min-height: 100%;
}

.c-main {
  position: relative;
  z-index: 3;
}

.c-section {
  position: relative;
  min-height: 100vh;
  padding: 110px 0;
  scroll-snap-align: start;
}

.c-about {
  background:
    radial-gradient(700px 420px at 20% 10%, rgba(88, 215, 255, 0.10), transparent 62%),
    radial-gradient(650px 420px at 80% 40%, rgba(139, 91, 255, 0.08), transparent 64%);
}

.c-skills {
  background:
    radial-gradient(760px 460px at 70% 10%, rgba(139, 91, 255, 0.10), transparent 62%),
    radial-gradient(620px 420px at 10% 70%, rgba(88, 215, 255, 0.08), transparent 64%);
}

.c-projects {
  background:
    radial-gradient(820px 520px at 20% 20%, rgba(88, 215, 255, 0.10), transparent 65%),
    radial-gradient(760px 520px at 90% 65%, rgba(139, 91, 255, 0.10), transparent 64%);
}

.c-contact {
  background:
    radial-gradient(760px 520px at 80% 30%, rgba(88, 215, 255, 0.10), transparent 66%),
    radial-gradient(760px 520px at 10% 70%, rgba(139, 91, 255, 0.10), transparent 66%);
}

.c-container {
  width: min(1160px, calc(100% - 48px));
  margin: 0 auto;
}

.c-grid {
  display: grid;
  gap: 32px;
}

.c-grid--about {
  grid-template-columns: 1.2fr 0.9fr;
}

.c-grid--contact {
  grid-template-columns: 1.1fr 0.95fr;
}

@media (max-width: 900px) {
  .c-section {
    padding: 96px 0;
  }
  .c-grid--about,
  .c-grid--contact {
    grid-template-columns: 1fr;
  }
}

.c-stack {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.c-sectionHeader {
  max-width: 56ch;
}

.c-eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: var(--muted2);
}

.c-h1 {
  margin: 0;
  font-size: clamp(52px, 6.5vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.c-h2 {
  margin: 0;
  font-size: clamp(30px, 3.3vw, 46px);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.c-h3 {
  margin: 0;
  font-size: 20px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.c-lead {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 15px;
}

.c-prose {
  color: var(--muted);
  line-height: 1.7;
  font-size: 15px;
}

.c-prose p {
  margin: 0 0 12px;
}

.c-muted {
  color: var(--muted2);
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}

/* Navbar */
.c-nav {
  position: sticky;
  top: 0;
  z-index: 60;
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
}

.c-nav--glass {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.c-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  gap: 16px;
}

.c-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  color: inherit;
}

.c-brand__mark {
  height: 36px;
  width: 36px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 30% 30%, rgba(88, 215, 255, 0.35), transparent 65%),
    rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 18px 48px rgba(88, 215, 255, 0.08);
  font-weight: 700;
}

.c-brand__name {
  font-size: 12px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.76);
}

.c-nav__links {
  display: none;
  gap: 26px;
  align-items: center;
}

.c-nav__link {
  background: transparent;
  border: 0;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  letter-spacing: 0.02em;
  transition: color 280ms var(--ease);
}

.c-nav__link:hover {
  color: rgba(255, 255, 255, 0.95);
}

.c-nav__cta {
  display: none;
}

.c-nav__burger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  width: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
}

.c-nav__burgerLines {
  display: grid;
  gap: 6px;
}

.c-nav__burgerLines span {
  display: block;
  height: 2px;
  width: 16px;
  border-radius: 999px;
  background: currentColor;
}

.c-nav__burgerLines span:last-child {
  width: 12px;
  opacity: 0.85;
}

.c-nav__mobile {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(7, 10, 18, 0.88);
  backdrop-filter: blur(16px);
}

.c-nav__mobileInner {
  display: flex;
  flex-direction: column;
  padding: 12px 0 18px;
  gap: 10px;
}

.c-nav__mobileLink {
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.84);
  border-radius: 14px;
  padding: 12px 14px;
  cursor: pointer;
  transition: transform 280ms var(--ease), background 280ms var(--ease);
}

.c-nav__mobileLink:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
}

@media (min-width: 900px) {
  .c-nav__links,
  .c-nav__cta {
    display: flex;
  }
  .c-nav__burger,
  .c-nav__mobile {
    display: none;
  }
}

/* Buttons */
.c-btn {
  --mx: 0px;
  --my: 0px;
  transform: translate3d(var(--mx), var(--my), 0);
  border-radius: 999px;
  padding: 12px 18px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.9);
  transition:
    transform 420ms var(--ease),
    background 420ms var(--ease),
    border-color 420ms var(--ease),
    box-shadow 420ms var(--ease);
  position: relative;
}

.c-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.18);
}

.c-btn--primary {
  background:
    radial-gradient(110px 60px at 10% 20%, rgba(88, 215, 255, 0.45), transparent 60%),
    linear-gradient(90deg, rgba(88, 215, 255, 0.22), rgba(139, 91, 255, 0.22));
  border-color: rgba(88, 215, 255, 0.26);
  box-shadow:
    0 18px 48px rgba(88, 215, 255, 0.12),
    0 20px 70px rgba(139, 91, 255, 0.08);
}

.c-btn--primary:hover {
  box-shadow:
    0 18px 54px rgba(88, 215, 255, 0.18),
    0 22px 80px rgba(139, 91, 255, 0.12);
}

.c-btn--glass {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.14);
}

.c-btn--full {
  width: 100%;
  justify-content: center;
}

.c-btn--sm {
  padding: 10px 14px;
  font-size: 13px;
}

/* Hero */
.c-hero {
  padding-top: 120px;
}

.c-hero__container {
  position: relative;
}

.c-hero__grid {
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 24px;
  align-items: center;
}

.c-hero__copy {
  position: relative;
  z-index: 2;
}

.c-kicker {
  margin: 0 0 14px;
  font-size: 12px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
}

.c-maskLine {
  display: block;
  overflow: hidden;
}

.c-maskLine__inner {
  display: inline-block;
  will-change: transform;
}

.c-accent {
  background: linear-gradient(90deg, var(--blue), var(--purple));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.c-hero__sub {
  margin: 18px 0 0;
  max-width: 56ch;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  font-size: 15px;
}

.c-hero__cta {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.c-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.c-pill {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
}

.c-hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.c-ghostText {
  position: absolute;
  inset: auto auto 8% -6%;
  font-size: clamp(110px, 22vw, 320px);
  letter-spacing: -0.06em;
  line-height: 0.85;
  color: rgba(255, 255, 255, 0.05);
  filter: blur(0.2px);
  transform: translateZ(0);
}

.c-waves {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(60% 60% at 20% 20%, rgba(88, 215, 255, 0.16), transparent 55%),
    radial-gradient(55% 55% at 80% 30%, rgba(139, 91, 255, 0.16), transparent 60%),
    conic-gradient(from 220deg at 50% 50%, rgba(88, 215, 255, 0.09), rgba(139, 91, 255, 0.07), rgba(88, 215, 255, 0.09));
  filter: blur(40px);
  opacity: 0.9;
  animation: wavesDrift 16s var(--ease) infinite alternate;
}

.c-hero__glows {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(600px 380px at 30% 30%, rgba(88, 215, 255, 0.18), transparent 60%),
    radial-gradient(520px 340px at 70% 30%, rgba(139, 91, 255, 0.16), transparent 62%);
  opacity: 0.9;
}

.c-hero__depth {
  position: relative;
  height: 420px;
  z-index: 1;
}

.c-depthCard {
  position: absolute;
  inset: 0;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(14px);
  transform: translateZ(0);
}

.c-depthCard--a {
  transform: translate3d(0, 0, 0) rotate(-2deg);
  background:
    radial-gradient(240px 140px at 18% 22%, rgba(88, 215, 255, 0.18), transparent 60%),
    rgba(255, 255, 255, 0.03);
}

.c-depthCard--b {
  inset: 18px 0 0 18px;
  transform: translate3d(0, 0, 0) rotate(2.5deg);
  opacity: 0.7;
}

.c-depthCard--c {
  inset: 46px 0 0 46px;
  transform: translate3d(0, 0, 0) rotate(-1deg);
  opacity: 0.5;
}

@keyframes wavesDrift {
  0% {
    transform: translate3d(-1.5%, -1%, 0) rotate(-2deg);
  }
  100% {
    transform: translate3d(2.5%, 2%, 0) rotate(2deg);
  }
}

@media (max-width: 900px) {
  .c-hero__grid {
    grid-template-columns: 1fr;
  }
  .c-hero__depth {
    height: 320px;
  }
  .c-ghostText {
    inset: auto auto 2% -10%;
  }
}

/* Cards / tags */
.c-card {
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 28px 88px rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(14px);
  padding: 18px;
}

.c-card--deep {
  background:
    radial-gradient(260px 140px at 12% 10%, rgba(88, 215, 255, 0.12), transparent 60%),
    rgba(255, 255, 255, 0.03);
}

.c-card__k {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.68);
}

.c-card__p {
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  font-size: 14px;
}

.c-list {
  margin: 12px 0 0;
  padding: 0 0 0 18px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  font-size: 14px;
}

.c-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
}

.c-fact {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  background: rgba(255, 255, 255, 0.03);
  padding: 14px;
}

.c-fact__k {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.58);
}

.c-fact__v {
  margin: 8px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}

@media (max-width: 900px) {
  .c-facts {
    grid-template-columns: 1fr;
  }
}

.c-tags {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.c-tag {
  padding: 7px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.76);
  font-size: 12px;
}

/* Skills */
.c-skillGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 900px) {
  .c-skillGrid {
    grid-template-columns: 1fr;
  }
}

/* Projects */
.c-projectGrid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

@media (max-width: 900px) {
  .c-projectGrid {
    grid-template-columns: 1fr;
  }
}

.c-skeletonCard {
  height: 200px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
  background-size: 220% 100%;
  animation: skeleton 1.1s linear infinite;
}

@keyframes skeleton {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.c-tilt {
  perspective: 1100px;
  will-change: transform;
}

.c-tilt__inner {
  transform: translateZ(0);
}

.c-projectCard {
  position: relative;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

.c-projectCard::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 20px;
  background: conic-gradient(
    from 180deg at var(--px, 50%) var(--py, 50%),
    rgba(88, 215, 255, 0.0),
    rgba(88, 215, 255, 0.55),
    rgba(139, 91, 255, 0.6),
    rgba(88, 215, 255, 0.0)
  );
  opacity: 0;
  filter: blur(10px);
  transition: opacity 320ms var(--ease);
  pointer-events: none;
}

.c-projectCard:hover::before {
  opacity: 1;
}

.c-projectCard__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.c-projectCard__desc {
  margin: 12px 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
  font-size: 14px;
}

.c-projectCard__links {
  display: flex;
  gap: 10px;
}

.c-link {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.70);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  padding-bottom: 2px;
  transition: color 260ms var(--ease), border-color 260ms var(--ease);
}

.c-link:hover {
  color: rgba(255, 255, 255, 0.94);
  border-color: rgba(88, 215, 255, 0.55);
}

.c-link--hot {
  color: rgba(88, 215, 255, 0.84);
  border-color: rgba(88, 215, 255, 0.35);
}

.c-link--hot:hover {
  color: rgba(88, 215, 255, 0.98);
  border-color: rgba(139, 91, 255, 0.55);
}

.c-inlineError {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 120, 120, 0.22);
  background: rgba(255, 120, 120, 0.07);
  color: rgba(255, 255, 255, 0.86);
  font-size: 13px;
}

/* Contact form */
.c-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.c-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 560px) {
  .c-form__row {
    grid-template-columns: 1fr;
  }
}

.c-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.c-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.76);
  letter-spacing: 0.06em;
}

.c-input {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.92);
  padding: 10px 12px;
  outline: none;
  transition:
    border-color 280ms var(--ease),
    box-shadow 280ms var(--ease);
}

.c-input::placeholder {
  color: rgba(255, 255, 255, 0.42);
}

.c-input:focus {
  border-color: rgba(88, 215, 255, 0.45);
  box-shadow: 0 0 0 3px rgba(88, 215, 255, 0.12);
}

.c-input--area {
  resize: none;
  min-height: 110px;
}

.c-note {
  margin: 0;
  font-size: 12px;
}

.c-note--ok {
  color: rgba(125, 255, 205, 0.9);
}

.c-note--bad {
  color: rgba(255, 145, 145, 0.9);
}

/* Separator */
.c-sep {
  height: 1px;
  position: relative;
}

.c-sep__line {
  transform-origin: 0% 50%;
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, rgba(88, 215, 255, 0), rgba(88, 215, 255, 0.55), rgba(139, 91, 255, 0.55), rgba(139, 91, 255, 0));
  opacity: 0.55;
}

/* Footer */
.c-footer {
  position: relative;
  z-index: 3;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(7, 10, 18, 0.65);
  backdrop-filter: blur(16px);
  padding: 18px 0;
}

.c-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: rgba(255, 255, 255, 0.56);
  font-size: 12px;
}

.c-footer__hint {
  margin: 0;
}

/* Loader */
.c-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background:
    radial-gradient(1200px 700px at 20% -10%, rgba(88, 215, 255, 0.16), transparent 60%),
    radial-gradient(900px 600px at 90% 10%, rgba(139, 91, 255, 0.14), transparent 60%),
    linear-gradient(180deg, #060812, #0b0f19);
  display: grid;
  place-items: center;
}

.c-loader__inner {
  width: min(760px, calc(100% - 56px));
}

.c-loader__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.c-loader__mark {
  height: 36px;
  width: 36px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  letter-spacing: 0;
  font-weight: 800;
}

.c-loader__stack {
  margin-top: 18px;
}

.c-loader__title {
  font-size: clamp(56px, 8vw, 92px);
  line-height: 0.92;
  letter-spacing: -0.06em;
}

.c-loader__title--outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.22);
  opacity: 0.95;
}

.c-loader__bar {
  margin-top: 18px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.10);
  overflow: hidden;
}

.c-loader__fill {
  height: 100%;
  width: 100%;
  transform-origin: 0% 50%;
  background: linear-gradient(90deg, rgba(88, 215, 255, 0.9), rgba(139, 91, 255, 0.9));
}

.c-loader__meta {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
}

.c-loader__pct {
  letter-spacing: 0.18em;
}

.c-loader__hint {
  color: rgba(255, 255, 255, 0.5);
}

/* Beam + noise + mouse glow */
.c-beam {
  position: fixed;
  left: 50%;
  top: -40vh;
  width: min(520px, 70vw);
  height: 160vh;
  transform: translateX(-50%) rotate(-8deg);
  z-index: 900;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(88, 215, 255, 0),
      rgba(88, 215, 255, 0.16),
      rgba(255, 255, 255, 0.18),
      rgba(139, 91, 255, 0.16),
      rgba(139, 91, 255, 0)
    );
  filter: blur(0px);
  mix-blend-mode: screen;
  opacity: 0.95;
}

.c-noise {
  position: fixed;
  inset: -30%;
  z-index: 950;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  animation: noiseMove 6s steps(6) infinite;
}

@keyframes noiseMove {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-6%, 5%, 0);
  }
}

.c-mouseGlow {
  position: fixed;
  left: 0;
  top: 0;
  width: 680px;
  height: 680px;
  margin-left: -340px;
  margin-top: -340px;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 50%, rgba(88, 215, 255, 0.22), transparent 62%);
  filter: blur(14px);
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.9;
}

/* Parallax background layers */
.c-parallax {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.c-parallax__orb {
  position: absolute;
  width: 680px;
  height: 680px;
  border-radius: 999px;
  filter: blur(60px);
  opacity: 0.6;
  mix-blend-mode: screen;
}

.c-parallax__orb--a {
  left: -240px;
  top: 18%;
  background: radial-gradient(circle at 50% 50%, rgba(88, 215, 255, 0.20), transparent 65%);
}

.c-parallax__orb--b {
  right: -260px;
  top: 52%;
  background: radial-gradient(circle at 50% 50%, rgba(139, 91, 255, 0.20), transparent 65%);
}

/* Scroll progress */
.c-progress {
  position: fixed;
  right: 18px;
  top: 94px;
  bottom: 24px;
  width: 3px;
  z-index: 920;
  pointer-events: none;
}

.c-progress__track {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.10);
  border-radius: 999px;
}

.c-progress__bar {
  position: absolute;
  inset: 0;
  transform-origin: 50% 0%;
  background: linear-gradient(180deg, rgba(88, 215, 255, 0.9), rgba(139, 91, 255, 0.9));
  border-radius: 999px;
}

@media (max-width: 900px) {
  .c-progress {
    display: none;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .c-waves,
  .c-noise,
  .c-mouseGlow {
    animation: none !important;
  /* } */
  .c-reveal__inner {
    scroll-behavior: auto;
  }
}