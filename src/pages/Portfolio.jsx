import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, Download, Mail, Menu, Search, Send, Sparkles, X } from 'lucide-react';
import { Github, Instagram, Linkedin } from '../components/BrandIcons.jsx';
import { useSearchParams } from 'react-router-dom';
import { PERSONAL_INFO, MILESTONES, SKILL_CATEGORIES, SOCIAL_LINKS, FOCUS_AREAS, CORE_METRICS } from '../constants';
import uvPhoto from '../assets/optimized/uvPhoto.webp';
import Hero3DCanvas from '../components/Home/Hero3DCanvas.jsx';
import PortfolioAssistant from '../components/PortfolioAssistant.jsx';
import ProjectDetailDialog from '../components/ProjectDetailDialog.jsx';
import { PORTFOLIO_PROJECTS, FEATURE_IDS } from '../constants/projectDetails.js';

const NAV = [
  ['home', 'Home'], ['about', 'About'], ['projects', 'Work'], ['skills', 'Expertise'], ['journey', 'Journey'], ['contact', 'Contact'],
];
const SOCIAL_ICONS = { GitHub: Github, Instagram, LinkedIn: Linkedin, 'X (Twitter)': null, Facebook: null };
const SOCIALS = SOCIAL_LINKS.filter((item) => item.label !== 'View CV');
const ALL_PROJECTS = PORTFOLIO_PROJECTS;
const FILTERS = ['All', 'Full stack', 'Frontend', 'Tools'];

function SocialIcon({ name, size = 16 }) {
  const Icon = SOCIAL_ICONS[name];
  return Icon ? <Icon size={size} strokeWidth={1.85} aria-hidden="true" /> : <span className="social-letter" aria-hidden="true">{name === 'Facebook' ? 'f' : '𝕏'}</span>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} initial={reduceMotion ? false : { opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.13 }} transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}>{children}</motion.div>;
}

function MagneticLink({ href, children, className = '', ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const handleMove = (event) => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.085}px, ${(event.clientY - rect.top - rect.height / 2) * 0.085}px)`;
  };
  return <a ref={ref} href={href} className={className} onPointerMove={handleMove} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ''; }} {...props}>{children}</a>;
}

function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!enabled) return;
    const onMove = (event) => {
      if (!ref.current) return;
      ref.current.style.opacity = '1';
      ref.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      const interactive = event.target.closest('a, button, input, textarea, select');
      ref.current.classList.toggle('cursor-active', Boolean(interactive));
    };
    const hide = () => { if (ref.current) ref.current.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', hide);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerout', hide); };
  }, [enabled]);
  if (!enabled) return null;
  return <span ref={ref} className="custom-cursor" aria-hidden="true" />;
}

function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  return <header className="site-header">
    <div className="header-inner shell">
      <a className="brand" href="#home" aria-label="Utsav Vachhani — back to home" onClick={() => setMenuOpen(false)}><span className="brand-icon">u<span>.</span></span><span className="brand-name">utsav<span className="accent-dot">.</span></span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{NAV.map(([id, title]) => <a key={id} href={`#${id}`} className={active === id ? 'nav-active' : ''} aria-current={active === id ? 'location' : undefined}>{title}</a>)}</nav>
      <div className="header-right">
        <div className="header-socials" aria-label="Social links">{SOCIALS.map((s) => <a key={s.label} className={`social-icon ${s.label === 'GitHub' || s.label === 'LinkedIn' ? 'social-priority' : ''}`} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}><SocialIcon name={s.label} /></a>)}</div>
        <a className="header-resume" href="/resume">Résumé <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((old) => !old)}>{menuOpen ? <X size={23}/> : <Menu size={23}/>}</button>
      </div>
    </div>
    {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{NAV.map(([id, title]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{title}<ArrowUpRight size={18}/></a>)}<a href="/resume" onClick={() => setMenuOpen(false)}>View résumé <ArrowUpRight size={18}/></a><div className="mobile-socials">{SOCIALS.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}><SocialIcon name={s.label} size={19}/></a>)}</div></nav>}
  </header>;
}

function Hero() {
  const reduced = useReducedMotion();
  const parentVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } } };
  const lineVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
  return <section id="home" className="hero section-anchor">
    <div className="hero-noise" aria-hidden="true" />
    <div className="shell hero-grid">
      <Reveal className="hero-copy">
        <div className="availability"><span className="status-light"/> {PERSONAL_INFO.status}</div>
        <p className="eyebrow hero-eyebrow"><span className="accent-line" /> HELLO, WORLD. I'M UTSAV.</p>
        <motion.h1 className="hero-headline" variants={parentVariants} initial={reduced ? false : "hidden"} animate="visible"><motion.span className="headline-line" variants={lineVariants} transition={{ duration: .66 }}>Design-minded.</motion.span><motion.span className="headline-line headline-outline" variants={lineVariants} transition={{ duration: .66 }}>Full-stack.</motion.span><motion.span className="headline-line headline-highlight" variants={lineVariants} transition={{ duration: .66 }}>Built with purpose<span className="accent-dot">.</span></motion.span></motion.h1>
        <p className="hero-summary">I'm <strong>{PERSONAL_INFO.name}</strong>, a full-stack developer turning complex ideas into thoughtful, fast and usable digital experiences.</p>
        <div className="hero-actions"><MagneticLink href="#projects" className="button button-lime">Explore my work <ArrowUpRight size={18}/></MagneticLink><MagneticLink href="#contact" className="button button-ghost">Let's connect <ArrowUpRight size={18}/></MagneticLink><a href="/resume/utsav-vachhani-resume.pdf" download="Utsav_Vachhani_Resume.pdf" className="button button-resume"><Download size={16}/> Download résumé</a></div>
        <div className="hero-bottom"><a href="#about" className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={18}/></a><span className="hero-bottom-rule"/><a href="/resume">VIEW RÉSUMÉ <ArrowUpRight size={14}/></a></div>
      </Reveal>
      <Reveal className="hero-art" delay={0.15}>
        <div className="art-grid" aria-hidden="true" />
        <div className="art-circle circle-outer" aria-hidden="true" />
        <div className="art-circle circle-inner" aria-hidden="true" />
        <Hero3DCanvas />
        <div className="portrait-frame"><img src={uvPhoto} alt="Portrait of Utsav Vachhani" fetchPriority="high" /></div>
        <div className="art-number" aria-hidden="true">01 / UV</div>
        <div className="floating-chip chip-top"><span className="chip-sparkle">✳</span> FRONTEND + BACKEND</div>
        <div className="floating-chip chip-bottom"><Code2 size={15}/> CRAFTED WITH CODE</div>
        <div className="art-caption"><span>THE PERSON BEHIND<br/>THE PIXELS</span><Sparkles size={20}/></div>
      </Reveal>
    </div>
    <div className="hero-ticker" aria-label="Specialties"><div className="ticker-inner"><span>FULL-STACK DEVELOPMENT <b>✳</b> REACT & NEXT.JS <b>✳</b> CREATIVE INTERFACES <b>✳</b> SCALABLE BACKENDS <b>✳</b> FULL-STACK DEVELOPMENT <b>✳</b> REACT & NEXT.JS <b>✳</b> CREATIVE INTERFACES <b>✳</b> SCALABLE BACKENDS <b>✳</b></span></div></div>
  </section>;
}

function SectionIntro({ index, eyebrow, title, accent, description, dark = false }) {
  return <Reveal className={`section-intro ${dark ? 'section-intro-light' : ''}`}><div className="section-meta"><span>{index} / 05</span><span className="meta-line"/><span>{eyebrow}</span></div><div className="section-intro-main"><h2>{title} <em>{accent}</em></h2>{description && <p>{description}</p>}</div></Reveal>;
}

function About() {
  return <section id="about" className="section section-anchor section-light"><div className="shell"><SectionIntro index="01" eyebrow="A LITTLE ABOUT ME" title="More than just" accent="code." description="A builder at heart, constantly exploring the space between engineering and design."/>
    <div className="about-grid"><Reveal className="about-statement"><p className="mini-label">[ WHAT I DO ]</p><h3>I bring <span>ideas to life</span> through clean code & meaningful design.</h3><div className="about-stripe"><Sparkles size={18}/> KEEPING CURIOSITY AT THE CORE</div></Reveal><Reveal className="about-body" delay={0.09}>{PERSONAL_INFO.bioParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href="/resume" className="text-link">More about my experience <ArrowUpRight size={18}/></a></Reveal></div>
    <div className="stats-grid"><div><strong>{ALL_PROJECTS.length.toString().padStart(2, '0')}<span>+</span></strong><span>PORTFOLIO PROJECTS</span></div><div><strong>9.34</strong><span>B.TECH CGPA</span></div><div><strong>2026</strong><span>GRADUATION YEAR</span></div><div><strong>MERN</strong><span>CORE DEVELOPMENT STACK</span></div></div>
    <div className="focus-section"><p className="mini-label">[ CORE COMPETENCIES ]</p><div className="focus-grid">{FOCUS_AREAS.map((item, i) => <Reveal className="focus-card" key={item.title} delay={i * 0.045}><span className="focus-number">0{i + 1} /</span><h3>{item.title}</h3><p>{item.desc}</p></Reveal>)}</div></div>
  </div></section>;
}

function categoryOf(project) {
  const tech = project.techStack.join(' ').toLowerCase();
  if (/mongodb|postgres|express|mern|node/.test(tech)) return 'Full stack';
  if (/react|next|tailwind|css|html/.test(tech)) return 'Frontend';
  return 'Tools';
}
function ProjectCard({ project, index, onOpen, featured }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const move = (event) => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${((event.clientY - top) / height - 0.5) * -4}deg`);
    ref.current.style.setProperty('--ry', `${((event.clientX - left) / width - 0.5) * 4}deg`);
  };
  const reset = () => { if (ref.current) { ref.current.style.setProperty('--rx', '0deg'); ref.current.style.setProperty('--ry', '0deg'); } };
  return <Reveal className={featured ? 'project-reveal featured-reveal' : 'project-reveal'} delay={Math.min(index % 4, 3) * 0.05}>
    <button type="button" ref={ref} className={`project-card ${featured ? 'project-card-featured' : ''}`} onClick={() => onOpen(project.id)} onPointerMove={move} onPointerLeave={reset} aria-haspopup="dialog" aria-label={`View details for ${project.title}`}>
      <div className="project-image">{project.image ? <img src={project.image} alt={`${project.title} portfolio preview`} loading="lazy"/> : <div className="project-fallback">{project.title}<span>NO SCREENSHOT PROVIDED</span></div>}<span className="project-card-arrow"><ArrowUpRight size={23}/></span><span className="project-number">{String(index + 1).padStart(2, '0')} / {String(ALL_PROJECTS.length).padStart(2, '0')}</span></div>
      <div className="project-card-copy">
        <div className="project-card-meta"><span>{categoryOf(project)}</span><span>PROJECT / {String(index + 1).padStart(2, '0')}</span></div>
        <h3>{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tech" aria-label="Technologies">{project.techStack.map((tech, techIndex) => <span key={`${tech}-${techIndex}`}>{tech}</span>)}</div>
        <span className="project-card-cta">VIEW PROJECT DETAILS <ArrowUpRight size={16} aria-hidden="true"/></span>
      </div>
    </button>
  </Reveal>;
}
function Projects({ onOpen }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const sorted = useMemo(() => [...ALL_PROJECTS].sort((a, b) => (FEATURE_IDS.includes(b.id) ? 1 : 0) - (FEATURE_IDS.includes(a.id) ? 1 : 0)), []);
  const filtered = useMemo(() => sorted.filter((p) => (filter === 'All' || categoryOf(p) === filter) && `${p.title} ${p.description} ${p.techStack.join(' ')}`.toLowerCase().includes(search.toLowerCase().trim())), [sorted, filter, search]);
  const visible = showAll || filter !== 'All' || search.trim() ? filtered : filtered.slice(0, 6);
  return <section id="projects" className="section section-anchor section-projects"><div className="shell"><SectionIntro index="02" eyebrow="SELECTED WORK" title="Proof is in the" accent="projects." description="A collection of products, explorations and experiments. Select a card to go behind the build." dark />
    <div className="project-toolbar"><div className="project-filters" aria-label="Project filters">{FILTERS.map((name) => <button key={name} className={filter === name ? 'filter-active' : ''} type="button" aria-pressed={filter === name} onClick={() => { setFilter(name); setShowAll(false); }}>{name}</button>)}</div><label className="project-search"><Search size={18} aria-hidden="true"/><span className="sr-only">Search projects</span><input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search projects..."/></label></div>
    <div className="projects-grid">{visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i} featured={i < 2 && filter === 'All' && !search} onOpen={onOpen}/>)}</div>
    {!filtered.length && <div className="empty-results">No projects match your search. <button onClick={() => { setSearch(''); setFilter('All'); }}>Clear filters</button></div>}
    {filtered.length > 6 && filter === 'All' && !search.trim() && <div className="show-all"><button className="button button-outline" onClick={() => setShowAll((was) => !was)}>{showAll ? 'Show selected work' : `Explore all ${filtered.length} projects`} <ArrowRight size={18}/></button></div>}
  </div></section>;
}
function Skills() {
  return <section id="skills" className="section section-anchor section-light section-skills"><div className="shell"><SectionIntro index="03" eyebrow="THE TOOLKIT" title="Skills behind the" accent="screen." description="From the interface you see to the infrastructure underneath, here's what I work with."/>
    <div className="engineering-metrics">{CORE_METRICS.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.val}</strong></div>)}</div>
    <div className="skills-layout"><Reveal className="skills-callout"><div className="skills-symbol">&lt;/&gt;</div><h3>Full-stack thinking.<br/><em>Front-to-back execution.</em></h3><p>Crafting cohesive digital products with thoughtful interfaces, APIs and data.</p><a href="#contact" className="text-link">Let's build together <ArrowUpRight size={17}/></a></Reveal><div className="skills-columns">{SKILL_CATEGORIES.map((category, i) => <Reveal key={category.title} className="skill-group" delay={i % 3 * 0.06}><div className="skill-icon"><Code2 size={18}/></div><div><h3>{category.title}</h3><div className="skill-tags">{category.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></Reveal>)}</div></div>
  </div></section>;
}
function Journey() {
  return <section id="journey" className="section section-anchor section-journey"><div className="shell"><SectionIntro index="04" eyebrow="THE ROAD SO FAR" title="A journey of" accent="building." description="A few milestones that shaped the developer I am today." dark/>
    <div className="journey-grid">{MILESTONES.map((item, index) => <Reveal className="journey-item" key={`${item.title}-${item.year}`} delay={Math.min(index % 3, 2) * 0.05}><span className="journey-index">{String(index + 1).padStart(2, '0')}</span><div><p className="journey-date">{item.year}</p><h3>{item.title}</h3><p>{item.description}</p>{item.link && !item.link.includes('example.com') && <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`Learn more about ${item.title}`}>Explore milestone <ArrowUpRight size={15}/></a>}</div></Reveal>)}</div>
  </div></section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(PERSONAL_INFO.email); setCopied(true); } catch { window.location.href = `mailto:${PERSONAL_INFO.email}`; } };
  const send = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Portfolio enquiry from ${String(data.get('name')).trim()}`;
    const body = `Name: ${String(data.get('name')).trim()}\nEmail: ${String(data.get('email')).trim()}\n\n${String(data.get('message')).trim()}`;
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return <section id="contact" className="section section-anchor section-contact"><div className="shell"><SectionIntro index="05" eyebrow="LET'S CONNECT" title="Have an idea?" accent="Let's talk." description="Tell me what you're working on. I'm always interested in interesting problems and ambitious ideas."/>
    <div className="contact-grid"><Reveal className="contact-left"><span className="mini-label">DIRECT LINE</span><a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}<ArrowUpRight size={29}/></a><button type="button" className="copy-email" onClick={copy}>{copied ? <Check size={16}/> : <Mail size={16}/>} {copied ? 'Email copied' : 'Copy email address'}</button><div className="contact-social-row">{SOCIALS.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.label}><SocialIcon name={item.label} size={20}/></a>)}</div><p className="contact-location">BASED IN SURAT, INDIA <span>↗</span> WORKING WORLDWIDE</p></Reveal><Reveal className="contact-form-wrap" delay={0.1}><div className="form-header"><span>START A CONVERSATION</span><Send size={19}/></div><form onSubmit={send}><div className="form-row"><label>Your name <input type="text" name="name" required minLength={2} maxLength={120} placeholder="Your name" autoComplete="name" /></label><label>Your email <input type="email" name="email" required placeholder="you@example.com" autoComplete="email" /></label></div><label>Tell me about your project <textarea required name="message" minLength={10} maxLength={4000} rows={5} placeholder="A little about your idea..."/></label><button type="submit" className="button button-lime form-submit">Open email draft <ArrowUpRight size={18}/></button><p className="form-note">Opens your email app with your message pre-filled. No data is stored on this website.</p></form></Reveal></div>
  </div></section>;
}
const FOOTER_CAPABILITIES = ['Full-Stack Development', 'Database Modeling', 'REST API Development', 'Web Security & Auditing'];
function Footer() {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-lead"><div className="footer-lead-copy"><span className="mini-label">HAVE SOMETHING IN MIND?</span><p>Let's make something <em>matter.</em></p></div><a className="button button-lime" href="#contact">Start a conversation <ArrowUpRight size={18}/></a></div>
      <div className="footer-columns">
        <div className="footer-brand-column"><a className="footer-wordmark" href="#home">utsav<span>.</span></a><p>{PERSONAL_INFO.role} creating thoughtful web experiences, from the interface to the API.</p><div className="footer-social-icons">{SOCIALS.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" title={social.label} aria-label={social.label}><SocialIcon name={social.label} size={19}/></a>)}</div></div>
        <nav aria-label="Footer navigation"><h3>Navigate</h3>{NAV.map(([id, name]) => <a key={id} href={`#${id}`}>{name} <ArrowUpRight size={13}/></a>)}<a href="/resume">Résumé <ArrowUpRight size={13}/></a></nav>
        <div><h3>Areas of work</h3>{FOOTER_CAPABILITIES.map((area) => <span className="footer-capability" key={area}>{area}</span>)}</div>
        <div className="footer-contact-column"><h3>Get in touch</h3><a className="footer-email" href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email} <ArrowUpRight size={15}/></a><span>{PERSONAL_INFO.location}</span><a className="footer-contact-link" href="#contact">Open contact section <ArrowRight size={15}/></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {PERSONAL_INFO.name}. ALL RIGHTS RESERVED.</span><span>DESIGNED WITH INTENTION. BUILT WITH REACT.</span><a href="#home">BACK TO TOP ↑</a></div>
    </div>
  </footer>;
}

export default function Portfolio() {
  const [active, setActive] = useState('home');
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = ALL_PROJECTS.find((p) => p.id === searchParams.get('project'));
  useEffect(() => {
    document.title = 'Utsav Vachhani — Full-Stack Developer';
    const ids = NAV.map(([id]) => id);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const candidates = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (candidates.length) setActive(candidates[0].target.id);
    }, { rootMargin: '-25% 0px -56% 0px', threshold: [0, 0.2, 0.5, 1] });
    sections.forEach((section) => observer.observe(section));
    const jump = () => { if (window.location.hash) document.getElementById(window.location.hash.substring(1))?.scrollIntoView({ behavior: 'auto' }); };
    // Handles /projects => /#projects, and direct fragment links on hard reload.
    const timeout = window.setTimeout(jump, 0);
    return () => { observer.disconnect(); window.clearTimeout(timeout); };
  }, []);
  const openProject = (id) => setSearchParams((current) => { const next = new URLSearchParams(current); next.set('project', id); return next; });
  const closeProject = (nextId) => setSearchParams((current) => { const next = new URLSearchParams(current); if (nextId) next.set('project', nextId); else next.delete('project'); return next; }, { replace: Boolean(nextId) });
  return <><a href="#main" className="skip-link">Skip to content</a><Cursor/><Header active={active}/><main id="main"><Hero/><About/><Projects onOpen={openProject}/><Skills/><Journey/><Contact/></main><Footer/><PortfolioAssistant/>{selected && <ProjectDetailDialog key={selected.id} project={selected} projects={ALL_PROJECTS} onClose={closeProject} getCategory={categoryOf}/>}</>;
}
