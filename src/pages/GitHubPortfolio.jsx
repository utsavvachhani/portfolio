import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileCode2,
  FolderGit2,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Moon,
  Monitor,
  Search,
  Sun,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  X,
} from "lucide-react";
import { Github, Instagram, Linkedin } from "../components/BrandIcons.jsx";
import { PERSONAL_INFO, MILESTONES, SOCIAL_LINKS } from "../constants/index.js";
import {
  FEATURE_IDS,
  PORTFOLIO_PROJECTS,
  getProjectDetails,
  getProjectById,
  categoryOf,
} from "../constants/projectDetails.js";
import PortfolioAssistant from "../components/PortfolioAssistant.jsx";
import RepositoryViewer from "../components/github/RepositoryViewer.jsx";
import portrait from "../assets/optimized/uvPhoto.webp";
import profileLogo from "../assets/ProfileSection.svg";
import "./github-portfolio.css";
import "./github-appearance.css";

const PROJECTS = PORTFOLIO_PROJECTS;
const PINNED = FEATURE_IDS.map((id) =>
  PROJECTS.find((project) => project.id === id),
).filter(Boolean);
const REPO_COUNT = PROJECTS.filter((project) => Boolean(project.repo)).length;
const DEMO_COUNT = PROJECTS.filter((project) => Boolean(project.live)).length;
const RESUME = "/resume/utsav-vachhani-resume.pdf";
const NAVIGATION = [
  { id: "overview", label: "Overview", icon: BookOpen },
  {
    id: "repositories",
    label: "Repositories",
    icon: FolderGit2,
    count: PROJECTS.length,
  },
  { id: "projects", label: "Projects", icon: Layers3, count: PINNED.length },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "about", label: "About", icon: GraduationCap },
];
const SKILLS = [
  { name: "React", short: "⚛", color: "cyan" },
  { name: "Next.js", short: "N", color: "slate" },
  { name: "Node.js", short: "⬡", color: "green" },
  { name: "Express.js", short: "ex", color: "slate" },
  { name: "JavaScript", short: "JS", color: "yellow" },
  { name: "Tailwind CSS", short: "≈", color: "cyan" },
  { name: "MongoDB", short: "◈", color: "green" },
  { name: "PostgreSQL", short: "▤", color: "blue" },
  { name: "Firebase", short: "▲", color: "orange" },
  { name: "Git", short: "◆", color: "orange" },
  { name: "HTML5", short: "5", color: "orange" },
  { name: "CSS3", short: "3", color: "blue" },
  { name: "Python", short: "Py", color: "blue" },
  { name: "Java", short: "J", color: "orange" },
  { name: "C", short: "C", color: "slate" },
];
const REPO_FILTER_OPTIONS = [
  { id: "all", label: "All", category: "All" },
  { id: "fullstack", label: "Full stack", category: "Full stack" },
  { id: "frontend", label: "Frontend", category: "Frontend" },
  { id: "backend", label: "Backend", category: "Backend" },
  { id: "learning", label: "Learning", category: "Learning" },
];
const DEFAULT_REPO_FILTER_ID = "all";
const FILTERS = REPO_FILTER_OPTIONS.map((item) => item.category);
const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
};
const SOCIALS = SOCIAL_LINKS.filter(({ label }) =>
  ["GitHub", "LinkedIn", "Instagram", "X (Twitter)"].includes(label),
);

const LANGUAGE_GROUPS = [
  {
    name: "JavaScript / React",
    match: /javascript|react|next\.js|vite|redux|mern/i,
    color: "var(--gh-yellow)",
  },
  {
    name: "Node.js / APIs",
    match: /node|express|socket|rest|webhook/i,
    color: "var(--gh-green)",
  },
  {
    name: "Databases",
    match: /mongodb|postgres|mysql|firebase/i,
    color: "var(--gh-blue)",
  },
  {
    name: "HTML / CSS",
    match: /html|css|tailwind|bootstrap/i,
    color: "var(--gh-violet)",
  },
];
const COVERAGE = LANGUAGE_GROUPS.map(({ name, match, color }) => ({
  name,
  color,
  count: PROJECTS.filter((p) => p.techStack.some((tech) => match.test(tech)))
    .length,
}));

function useGitHubProfile() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${encodeURIComponent("utsavvachhani")}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub unavailable");
        return response.json();
      })
      .then((data) => {
        if (
          typeof data.public_repos === "number" &&
          typeof data.followers === "number"
        ) {
          setStats({ repos: data.public_repos, followers: data.followers });
        }
      })
      .catch(() => {
        /* Public API may be offline or rate-limited. Never show invented values. */
      });
    return () => controller.abort();
  }, []);
  return stats;
}

function External({ href, children, className = "", title }) {
  return (
    <a
      className={className}
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function Header({
  search,
  setSearch,
  onSearch,
  onResult,
  activeTab,
  setActiveTab,
  theme,
  setTheme,
}) {
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];
    const projects = PROJECTS.filter((project) =>
      `${project.title} ${project.description} ${project.techStack.join(" ")} ${project.repo || ""}`
        .toLowerCase()
        .includes(query),
    ).map((project) => ({
      type: "Project",
      name: project.title,
      description: project.techStack.slice(0, 3).join(" · "),
      id: project.id,
    }));
    const skills = SKILLS.filter(({ name }) =>
      name.toLowerCase().includes(query),
    ).map(({ name }) => ({
      type: "Skill",
      name,
      description: "Browse the technology stack",
      id: "skills",
    }));
    const sections = NAVIGATION.filter(({ label }) =>
      label.toLowerCase().includes(query),
    ).map(({ id, label }) => ({
      type: "Section",
      name: label,
      description: "Jump to portfolio section",
      id,
    }));
    return [...projects, ...skills, ...sections].slice(0, 8);
  }, [search]);
  const choose = (result) => {
    setSearchOpen(false);
    setHighlight(0);
    setMenu(false);
    onResult(result);
    inputRef.current?.blur();
  };
  useEffect(() => {
    const onKey = (event) => {
      const node = event.target;
      if (
        event.key === "/" &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(node?.tagName) &&
        !document.querySelector("dialog[open]") &&
        !node?.isContentEditable
      ) {
        event.preventDefault();
        inputRef.current?.focus();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        if (document.activeElement === inputRef.current)
          inputRef.current?.blur();
        setMenu(false);
        setProfileOpen(false);
      }
    };
    const outside = (event) => {
      if (!searchRef.current?.contains(event.target)) setSearchOpen(false);
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  const submit = (event) => {
    event.preventDefault();
    if (results.length)
      choose(results[Math.min(highlight, results.length - 1)]);
    else {
      setSearchOpen(false);
      onSearch();
    }
  };
  return (
    <>
      <header className="gh-header" id="home">
        <div className="gh-header-inner">
          <a
            className="gh-brand"
            href="#overview"
            aria-label="Utsav portfolio, go to overview"
          >
            <span className="gh-brand-mark">
              <img
                src={profileLogo}
                alt="Utsav Vachhani"
                className="gh-brand-logo-img"
              />
            </span>
            <span>
              utsav<span className="gh-brand-accent">.</span>dev
            </span>
          </a>
          <span className="gh-header-divider" aria-hidden="true" />
          <div className="gh-header-label">
            Developer portfolio{" "}
            <span className="gh-hidden-sm">/ GitHub-inspired edition</span>
          </div>
          <div className="gh-header-right">
            <div className="gh-search-wrapper" ref={searchRef}>
              <form
                className="gh-global-search"
                role="search"
                onSubmit={submit}
              >
                <Search size={16} aria-hidden="true" />
                <label className="gh-sr-only" htmlFor="site-project-search">
                  Search projects, skills and sections
                </label>
                <input
                  id="site-project-search"
                  ref={inputRef}
                  type="search"
                  value={search}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setHighlight(0);
                    setSearchOpen(true);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" && results.length) {
                      event.preventDefault();
                      setHighlight((value) => (value + 1) % results.length);
                    }
                    if (event.key === "ArrowUp" && results.length) {
                      event.preventDefault();
                      setHighlight(
                        (value) =>
                          (value - 1 + results.length) % results.length,
                      );
                    }
                  }}
                  placeholder="Search projects..."
                  autoComplete="off"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={Boolean(searchOpen && search.trim())}
                  aria-controls="gh-search-results"
                  aria-activedescendant={
                    searchOpen && results.length
                      ? `gh-search-result-${highlight}`
                      : undefined
                  }
                />
                {search ? (
                  <button
                    type="button"
                    className="gh-search-clear"
                    onClick={() => {
                      setSearch("");
                      setHighlight(0);
                      inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                ) : (
                  <kbd aria-hidden="true">/</kbd>
                )}
              </form>
              {searchOpen && search.trim() && (
                <div
                  className="gh-search-results"
                  id="gh-search-results"
                  role="listbox"
                  aria-label="Search results"
                >
                  {results.length ? (
                    results.map((result, index) => (
                      <button
                        type="button"
                        id={`gh-search-result-${index}`}
                        role="option"
                        aria-selected={highlight === index}
                        className={`gh-search-result ${highlight === index ? "gh-search-result-active" : ""}`}
                        key={`${result.type}-${result.id}-${result.name}`}
                        onMouseEnter={() => setHighlight(index)}
                        onClick={() => choose(result)}
                      >
                        <Search size={15} />
                        <span>
                          <strong>{result.name}</strong>
                          <small>
                            {result.type} · {result.description}
                          </small>
                        </span>
                        <ArrowUpRight size={15} />
                      </button>
                    ))
                  ) : (
                    <div className="gh-search-empty">
                      No matching projects, skills or sections. Try a different
                      keyword.
                    </div>
                  )}
                  <div className="gh-search-hint">
                    ↑ ↓ Navigate · Enter Open · Esc Close
                  </div>
                </div>
              )}
            </div>
            <a
              className="gh-header-link"
              href="/creative"
              title="View the original creative portfolio"
            >
              <Sparkles size={16} />
              <span>Creative view</span>
            </a>
            <a className="gh-header-link gh-resume-top" href="/resume">
              <Download size={16} />
              <span>Resume</span>
            </a>
            <div className="gh-profile-menu-wrap" ref={profileRef}>
              <button
                type="button"
                className="gh-header-avatar"
                aria-label="Open profile and appearance settings"
                aria-haspopup="dialog"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((current) => !current)}
              >
                <img src={portrait} alt="" />
              </button>
              {profileOpen && (
                <div
                  className="gh-profile-menu"
                  role="dialog"
                  aria-label="Profile and appearance settings"
                >
                  <div className="gh-profile-menu-user">
                    <img src={portrait} alt="" />
                    <span>
                      <strong>{PERSONAL_INFO.name}</strong>
                      <small>@utsavvachhani</small>
                    </span>
                  </div>
                  <div className="gh-profile-menu-divider" />
                  <p className="gh-profile-menu-title">Appearance</p>
                  <div
                    className="gh-theme-switch"
                    role="group"
                    aria-label="Select portfolio theme"
                  >
                    <button
                      type="button"
                      className={theme === "light" ? "gh-theme-active" : ""}
                      aria-pressed={theme === "light"}
                      onClick={() => setTheme("light")}
                    >
                      <Sun size={16} /> Light{" "}
                      {theme === "light" && <Check size={14} />}
                    </button>
                    <button
                      type="button"
                      className={theme === "dark" ? "gh-theme-active" : ""}
                      aria-pressed={theme === "dark"}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon size={16} /> Dark{" "}
                      {theme === "dark" && <Check size={14} />}
                    </button>
                  </div>
                  <div className="gh-profile-menu-divider" />
                  <a href="/resume">
                    <Download size={16} /> View Resume{" "}
                    <ArrowUpRight size={13} />
                  </a>
                  <a href="/creative">
                    <Sparkles size={16} /> Creative portfolio{" "}
                    <ArrowUpRight size={13} />
                  </a>
                  <External
                    href={PERSONAL_INFO.github}
                    className="gh-profile-menu-link"
                  >
                    <Github size={16} /> GitHub profile{" "}
                    <ArrowUpRight size={13} />
                  </External>
                </div>
              )}
            </div>
            <button
              type="button"
              className="gh-menu-toggle"
              onClick={() => setMenu((previous) => !previous)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
        {menu && (
          <div className="gh-mobile-menu">
            <div className="gh-mobile-theme">
              <span>Appearance</span>
              <button
                type="button"
                aria-pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                <Sun size={16} /> Light
              </button>
              <button
                type="button"
                aria-pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                <Moon size={16} /> Dark
              </button>
            </div>
            <a href="/creative" onClick={() => setMenu(false)}>
              Creative portfolio <ArrowUpRight size={15} />
            </a>
            <a href="/resume" onClick={() => setMenu(false)}>
              View Resume <ArrowUpRight size={15} />
            </a>
            <External href={PERSONAL_INFO.github}>
              GitHub profile <ArrowUpRight size={15} />
            </External>
          </div>
        )}
      </header>
      <nav className="gh-tabs" aria-label="Portfolio sections">
        <div className="gh-tabs-inner">
          {NAVIGATION.map(({ id, icon: Icon, label, count }) => (
            <a
              key={id}
              href={`#${id}`}
              className={id === activeTab ? "gh-tab gh-tab-active" : "gh-tab"}
              aria-current={id === activeTab ? "location" : undefined}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
              {count !== undefined && <span className="gh-count">{count}</span>}
            </a>
          ))}
          <a className="gh-tab gh-tab-resume" href="/resume">
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </nav>
    </>
  );
}

function ProfileSidebar({ ghStats }) {
  return (
    <aside className="gh-sidebar" aria-label="Profile information">
      <div className="gh-profile-photo">
        <img src={portrait} alt="Utsav Vachhani" fetchPriority="high" />
        <span className="gh-profile-status" title="Open to opportunities">
          <span className="gh-status-dot" />
        </span>
      </div>
      <div className="gh-profile-name">
        <h1>{PERSONAL_INFO.name}</h1>
        <p>utsavvachhani</p>
      </div>
      <p className="gh-profile-role">{PERSONAL_INFO.title}</p>
      <p className="gh-profile-bio">
        Building thoughtful web products, from intuitive interfaces to reliable
        APIs and databases.
      </p>
      <External href={PERSONAL_INFO.github} className="gh-follow-button">
        <Github size={16} /> Follow on GitHub <ArrowUpRight size={15} />
      </External>
      {ghStats ? (
        <p className="gh-followers">
          <Github size={15} />
          <strong>{ghStats.followers.toLocaleString()}</strong> followers{" "}
          <span className="gh-small-dot">·</span>{" "}
          <strong>{ghStats.repos.toLocaleString()}</strong> public repos{" "}
        </p>
      ) : (
        <div className="gh-followers-skeleton" aria-hidden="true">
          <span className="gh-skeleton gh-skeleton-pill" />
        </div>
      )}
      <div className="gh-profile-details">
        <div>
          <MapPin size={17} />
          <span>{PERSONAL_INFO.location}</span>
        </div>
        <div>
          <GraduationCap size={17} />
          <span>SCET · Information Technology</span>
        </div>
        <div>
          <Mail size={17} />
          <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
        </div>
        <div>
          <Github size={17} />
          <External href={PERSONAL_INFO.github}>
            github.com/utsavvachhani
          </External>
        </div>
        <div>
          <Linkedin size={17} />
          <External href={PERSONAL_INFO.linkedin}>LinkedIn profile</External>
        </div>
      </div>
      <div className="gh-sidebar-divider" />
      <div className="gh-side-head">
        <h2>Highlights</h2>
        <a href="#about">
          View timeline <ArrowRight size={14} />
        </a>
      </div>
      <div
        className="gh-achievements"
        aria-label="Portfolio highlights (not official GitHub badges)"
      >
        <span
          title="Full-stack development"
          className="gh-achievement gh-achievement-blue"
        >
          <Code2 size={23} />
        </span>
        <span
          title="Security projects"
          className="gh-achievement gh-achievement-purple"
        >
          <ShieldCheck size={23} />
        </span>
        <span
          title="Web projects"
          className="gh-achievement gh-achievement-gold"
        >
          <Star size={23} />
        </span>
      </div>
      <p className="gh-side-caption">Full stack · Security · Web engineering</p>
      <div className="gh-sidebar-divider" />
      <div className="gh-side-head">
        <h2>Explore more</h2>
      </div>
      <a href="/creative" className="gh-side-link">
        <Sparkles size={17} /> Original creative portfolio{" "}
        <ArrowUpRight size={14} />
      </a>
      <a href="/resume" className="gh-side-link">
        <FileCode2 size={17} /> Interactive Resume <ArrowUpRight size={14} />
      </a>
      <a
        href={RESUME}
        download="Utsav_Vachhani_Resume.pdf"
        className="gh-side-link"
      >
        <Download size={17} /> Download PDF Resume <ArrowUpRight size={14} />
      </a>
    </aside>
  );
}

function SectionHeading({ icon: Icon, title, action, href, id }) {
  return (
    <div className="gh-section-heading" id={id}>
      <h2>
        <Icon size={19} strokeWidth={1.9} />
        {title}
      </h2>
      {action && (
        <a href={href}>
          {action}
          <ArrowRight size={15} />
        </a>
      )}
    </div>
  );
}

function OverviewReadme() {
  return (
    <section
      id="overview"
      className="gh-readme gh-panel"
      aria-labelledby="gh-greeting"
    >
      <div className="gh-readme-file">
        <BookOpen size={15} />
        <strong>utsavvachhani</strong> <span>/ README.md</span>
        <span className="gh-readme-label">PROFILE README</span>
      </div>
      <div className="gh-readme-content">
        <div className="gh-intro">
          <div className="gh-kicker">
            <span className="gh-status-indicator" /> OPEN TO OPPORTUNITIES
          </div>
          <h2 id="gh-greeting">
            Hi, I’m Utsav{" "}
            <span role="img" aria-label="Waving hand">
              👋
            </span>
          </h2>
          <p>
            Full-stack developer passionate about creating modern web
            applications. I build with React, Next.js, Node.js and the MERN
            stack — turning complex ideas into clean interfaces, robust APIs and
            products people enjoy using.
          </p>
          <div className="gh-hero-actions">
            <a className="gh-button gh-button-blue" href="#contact">
              <Mail size={16} /> Let’s connect <ArrowRight size={15} />
            </a>
            <a className="gh-button gh-button-muted" href="#projects">
              <FolderGit2 size={16} /> Explore my work
            </a>
          </div>
        </div>
        <div className="gh-intro-aside">
          <span className="gh-aside-quote">“</span>
          <p>
            Write code.
            <br />
            Solve problems.
            <br />
            <em>Keep learning.</em>
          </p>
          <div className="gh-aside-divider" />
          <span>
            <Terminal size={17} /> Full-stack mindset
          </span>
          <span>
            <Globe2 size={17} /> Based in Surat, India
          </span>
        </div>
      </div>
    </section>
  );
}

function Socials() {
  return (
    <section className="gh-block" aria-labelledby="gh-socials-title">
      <SectionHeading
        id="gh-socials-title"
        icon={Globe2}
        title="Connect with me"
      />
      <div className="gh-social-links">
        {SOCIALS.map(({ label, href }) => {
          const Icon = SOCIAL_ICONS[label];
          return (
            <External key={label} href={href} className="gh-social-pill">
              {Icon ? <Icon size={16} /> : <span className="gh-x-icon">𝕏</span>}
              {label}
              <ArrowUpRight size={13} className="gh-social-arrow" />
            </External>
          );
        })}
        <a href={`mailto:${PERSONAL_INFO.email}`} className="gh-social-pill">
          <Mail size={16} />
          Email <ArrowUpRight size={13} className="gh-social-arrow" />
        </a>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="gh-block" id="skills">
      <SectionHeading
        icon={Layers3}
        title="Tech stack"
        action="See experience"
        href="#about"
      />
      <div className="gh-stack-list">
        {SKILLS.map(({ name, short, color }) => (
          <span className={`gh-skill gh-skill-${color}`} key={name}>
            <span className="gh-skill-symbol" aria-hidden="true">
              {short}
            </span>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

function PinnedProjects({ onOpen }) {
  return (
    <section className="gh-block" id="projects">
      <SectionHeading
        icon={FolderGit2}
        title="Pinned projects"
        action="View all repositories"
        href="#repositories"
      />
      <div className="gh-pinned-grid">
        {PINNED.map((project) => (
          <article className="gh-pinned-card" key={project.id}>
            <div className="gh-pin-header">
              <span className="gh-pin-project-icon">
                <FolderGit2 size={19} />
              </span>
              <div className="gh-pin-title">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => onOpen(project.id)}
                >
                  {project.title}
                </button>
                <span>Featured project</span>
              </div>
              <span className="gh-pin-public">Portfolio</span>
            </div>
            <p>{project.description}</p>
            <div className="gh-pin-footer">
              <span
                className="gh-tech-dot"
                style={{
                  background: project.techStack.some((tech) =>
                    /node|express/i.test(tech),
                  )
                    ? "#3fb950"
                    : "#58a6ff",
                }}
                aria-hidden="true"
              />
              <span className="gh-pin-language">{project.techStack[0]}</span>
              <span className="gh-pin-spacer" />
              {project.repo && (
                <External
                  href={project.repo}
                  className="gh-icon-link"
                  title={`Source code: ${project.title}`}
                >
                  <Github size={16} />
                  <span className="gh-sr-only">Source code</span>
                </External>
              )}
              {project.live && (
                <External
                  href={project.live}
                  className="gh-icon-link"
                  title={`Live demo: ${project.title}`}
                >
                  <ExternalLink size={16} />
                  <span className="gh-sr-only">Live demo</span>
                </External>
              )}
              <button
                className="gh-icon-link"
                onClick={() => onOpen(project.id)}
                type="button"
                aria-haspopup="dialog"
                aria-label={`Details for ${project.title}`}
              >
                <ArrowUpRight size={17} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stats({ ghStats }) {
  return (
    <section className="gh-block gh-stats-block">
      <SectionHeading
        icon={Code2}
        title="GitHub & project stats"
        action="View activity on GitHub"
        href={PERSONAL_INFO.github}
      />
      <div className="gh-stats-grid">
        <div className="gh-stat gh-stat-projects">
          <FolderGit2 size={21} />
          <strong>{PROJECTS.length}</strong>
          <span>Showcased projects</span>
          <small>Included in this portfolio</small>
        </div>
        <div className="gh-stat gh-stat-sources">
          <Github size={21} />
          <strong>{REPO_COUNT}</strong>
          <span>Source links</span>
          <small>Provided in original project</small>
        </div>
        <div className="gh-stat gh-stat-demos">
          <Monitor size={21} />
          <strong>{DEMO_COUNT}</strong>
          <span>Live demos</span>
          <small>Linked in original project</small>
        </div>
        <div className="gh-contribution-panel">
          <div className="gh-contribution-title">
            <strong>Technology coverage</strong>
            <span>Across {PROJECTS.length} portfolio projects</span>
          </div>
          <div className="gh-coverage-chart">
            {COVERAGE.map(({ name, count, color }) => (
              <div className="gh-coverage-row" key={name}>
                <span>{name}</span>
                <div className="gh-coverage-track">
                  <div
                    style={{
                      width: `${Math.max(3, (count / PROJECTS.length) * 100)}%`,
                      background: color,
                    }}
                  />
                </div>
                <b>{count}</b>
              </div>
            ))}
          </div>
          <div className="gh-contribution-footer">
            <span>
              Counts reflect the supplied project tech stacks, not GitHub
              contributions.
            </span>
            <External href={`${PERSONAL_INFO.github}`} className="gh-text-link">
              Live GitHub activity <ArrowUpRight size={14} />
            </External>
          </div>
        </div>
      </div>
      {ghStats && (
        <p className="gh-live-stats">
          <span className="gh-live-dot" />
          Live public GitHub API:{" "}
          <strong>{ghStats.repos.toLocaleString()}</strong> public repositories
          · <strong>{ghStats.followers.toLocaleString()}</strong> followers.
          GitHub contribution counts are not estimated.
        </p>
      )}
    </section>
  );
}

function Repositories({ query, setQuery, onOpen }) {
  const [filterId, setFilterId] = useState(DEFAULT_REPO_FILTER_ID);
  const activeFilter =
    REPO_FILTER_OPTIONS.find((f) => f.id === filterId) || REPO_FILTER_OPTIONS[0];
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const results = PROJECTS.filter(
      (project) =>
        (activeFilter.category === "All" ||
          categoryOf(project) === activeFilter.category) &&
        (!normalized ||
          `${project.title} ${project.description} ${project.techStack.join(" ")}`
            .toLowerCase()
            .includes(normalized)),
    );
    return results.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return (
        Number(!FEATURE_IDS.includes(a.id)) -
        Number(!FEATURE_IDS.includes(b.id))
      );
    });
  }, [query, activeFilter, sort]);
  return (
    <section className="gh-block gh-repositories" id="repositories">
      <SectionHeading
        icon={FolderGit2}
        title="Repositories"
        action="GitHub profile"
        href={PERSONAL_INFO.github}
      />
      <div className="gh-repo-toolbar">
        <label className="gh-repo-search">
          <Search size={18} />
          <span className="gh-sr-only">Find a repository</span>
          <input
            type="search"
            placeholder="Find a repository..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </label>
        <label className="gh-select-wrap">
          <span className="gh-sr-only">Sort repositories</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured first</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
          </select>
          <ChevronDown size={15} />
        </label>
      </div>
      <div className="gh-repo-filters" aria-label="Filter repositories">
        {REPO_FILTER_OPTIONS.map((item) => (
          <button
            type="button"
            key={item.id}
            id={`gh-repo-filter-${item.id}`}
            className={
              item.id === filterId ? "gh-filter gh-filter-active" : "gh-filter"
            }
            onClick={() => setFilterId(item.id)}
            aria-pressed={item.id === filterId}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="gh-repo-count" role="status">
        Showing {filtered.length} of {PROJECTS.length} showcased projects
      </p>
      <div className="gh-repo-list">
        {filtered.length ? (
          filtered.map((project) => (
            <article className="gh-repo" key={project.id}>
              <div className="gh-repo-main">
                <div className="gh-repo-name-row">
                  <FolderGit2 size={18} />
                  <button
                    type="button"
                    className="gh-repo-name"
                    aria-haspopup="dialog"
                    onClick={() => onOpen(project.id)}
                  >
                    {project.title}
                  </button>
                  <span className="gh-repo-public">Project</span>
                </div>
                <p>{project.description}</p>
                <div className="gh-repo-meta">
                  <span className="gh-repo-category">
                    <span className="gh-tech-dot" aria-hidden="true" />
                    {categoryOf(project)}
                  </span>
                  <span>{project.techStack.slice(0, 3).join(" · ")}</span>
                </div>
              </div>
              <div className="gh-repo-right">
                <div className="gh-repo-actions">
                  <button
                    type="button"
                    onClick={() => onOpen(project.id)}
                    className="gh-repo-detail"
                    aria-haspopup="dialog"
                  >
                    Details <ArrowUpRight size={14} />
                  </button>
                  {project.repo && (
                    <External
                      href={project.repo}
                      className="gh-repo-external"
                      title={`GitHub source for ${project.title}`}
                    >
                      <Github size={15} />
                      <span className="gh-sr-only">GitHub source</span>
                    </External>
                  )}
                  {project.live && (
                    <External
                      href={project.live}
                      className="gh-repo-external"
                      title={`Live demo for ${project.title}`}
                    >
                      <ExternalLink size={15} />
                      <span className="gh-sr-only">Live demo</span>
                    </External>
                  )}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="gh-no-results">
            <Search size={26} />
            <strong>No projects found</strong>
            <p>Try another keyword or change the category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function About() {
  const items = MILESTONES.filter((item) =>
    /internship|Converse2K25|Converse2K24|Bachelor/i.test(item.title),
  ).slice(0, 6);
  return (
    <section className="gh-block gh-about" id="about">
      <SectionHeading
        icon={GraduationCap}
        title="Experience & background"
        action="Full Resume"
        href="/resume"
      />
      <div className="gh-about-grid">
        <div className="gh-about-copy">
          <span className="gh-small-overline">ABOUT ME</span>
          <h3>
            Curious by nature.
            <br />
            <span>Developer by choice.</span>
          </h3>
          <p>{PERSONAL_INFO.bioParagraphs[0]}</p>
          <p>
            My work spans responsive user interfaces, API development, databases
            and practical security-minded web applications.
          </p>
          <a className="gh-button gh-button-muted" href="/resume">
            <FileCode2 size={16} /> Explore my Resume <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="gh-timeline">
          {items.map((milestone) => (
            <div className="gh-timeline-item" key={milestone.title}>
              <span className="gh-timeline-mark" />
              <span className="gh-timeline-date">{milestone.year}</span>
              <h4>{milestone.title}</h4>
              <p>{milestone.description}</p>
              {milestone.link && !milestone.link.includes("example.com") && (
                <External href={milestone.link}>
                  Explore milestone <ArrowUpRight size={13} />
                </External>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`;
    }
  };
  return (
    <section className="gh-contact gh-panel" id="contact">
      <div className="gh-contact-icon">
        <Mail size={23} />
      </div>
      <div>
        <span className="gh-small-overline">HAVE SOMETHING IN MIND?</span>
        <h2>Let’s build something together.</h2>
        <p>
          Open to engineering opportunities and full-stack collaborations. Start
          a conversation, or explore the original contact form in the creative
          portfolio.
        </p>
        <div className="gh-contact-actions">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="gh-button gh-button-blue"
          >
            <Mail size={16} /> Email me <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="gh-button gh-button-muted"
            onClick={copyEmail}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
            {copied ? "Email copied" : "Copy email"}
          </button>
          <a className="gh-contact-original" href="/creative#contact">
            Contact form <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, onClose }) {
  const ref = useRef(null);
  const closeButton = useRef(null);
  const details = getProjectDetails(project);
  const [tab, setTab] = useState('overview');
  const index = PROJECTS.findIndex((item) => item.id === project.id);
  const move = (direction) =>
    PROJECTS[(index + direction + PROJECTS.length) % PROJECTS.length];
  useEffect(() => {
    const modal = ref.current;
    if (!modal) return undefined;
    const previous = document.activeElement;
    modal.showModal();
    document.body.classList.add("modal-open");
    closeButton.current?.focus();
    return () => {
      if (modal.open) modal.close();
      document.body.classList.remove("modal-open");
      if (previous?.isConnected && typeof previous.focus === "function")
        previous.focus();
    };
  }, []);
  return (
    <dialog
      className="gh-modal gh-fullscreen-modal"
      ref={ref}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      aria-labelledby="gh-modal-title"
    >
      <div className="gh-modal-inner">
        <header className="gh-modal-top">
          <div>
            <FolderGit2 size={19} />
            <span className="gh-modal-breadcrumb">
              <Link
                to="/"
                onClick={() => onClose()}
                className="gh-modal-breadcrumb-owner"
                title="Back to home page"
              >
                utsavvachhani
              </Link>
              <span className="gh-modal-breadcrumb-separator">/</span>
              <span className="gh-modal-breadcrumb-repo">
                {project.repo?.split("/").pop() || project.id}
              </span>
            </span>
            <span className="gh-modal-public">
              {project.repo ? "Public repository" : "Portfolio project"}
            </span>
          </div>
          <button
            type="button"
            ref={closeButton}
            onClick={() => onClose()}
            aria-label="Close full-screen project viewer"
          >
            <X size={21} />
          </button>
        </header>
        <div className="gh-modal-scrollable-body">
          <div className="gh-modal-heading">
            <div className="gh-modal-heading-content">
              <div className="gh-modal-heading-main">
                <div className="gh-modal-meta-row">
                  <span className="gh-modal-category-badge">
                    {categoryOf(project)}
                  </span>
                  <span className="gh-modal-project-counter">
                    PROJECT {index + 1}{" "}
                    <span className="gh-modal-counter-slash">/</span>{" "}
                    {PROJECTS.length}
                  </span>
                </div>
                <h2 id="gh-modal-title">{project.title}</h2>
                <p className="gh-modal-description">{details.overview}</p>
              </div>
              {(project.repo || project.live) && (
                <div className="gh-modal-heading-links">
                  {project.repo && (
                    <External
                      href={project.repo}
                      className="gh-button gh-button-blue"
                    >
                      <Github size={15} /> Open GitHub{" "}
                      <ArrowUpRight size={14} className="gh-button-arrow" />
                    </External>
                  )}
                  {project.live && (
                    <External
                      href={project.live}
                      className="gh-button gh-button-muted"
                    >
                      <ExternalLink size={15} /> Live demo{" "}
                      <ArrowUpRight size={14} className="gh-button-arrow" />
                    </External>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="gh-modal-tablist-wrap">
            <div
              className="gh-modal-tablist"
              role="tablist"
              aria-label="Project content"
            >
              {[
                ["overview", "Overview"],
                ["code", "Source code"],
                ["readme", "README"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`gh-project-tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls="gh-project-content"
                  className={tab === id ? "gh-modal-tab-active" : ""}
                  onClick={() => setTab(id)}
                >
                  {id === "code" ? (
                    <Code2 size={15} />
                  ) : id === "readme" ? (
                    <BookOpen size={15} />
                  ) : (
                    <Layers3 size={15} />
                  )}{" "}
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div
            className="gh-modal-content"
            id="gh-project-content"
            role="tabpanel"
            aria-labelledby={`gh-project-tab-${tab}`}
          >
            {tab === "code" ? (
              <RepositoryViewer project={project}/>
            ) : tab === "readme" ? (
              <RepositoryViewer project={project} readmeOnly />
            ) : (
            <div className="gh-modal-overview">
              {details.images.length > 0 && (
                <div className="gh-modal-image">
                  <img
                    src={details.images[0].src}
                    alt={details.images[0].alt}
                  />
                </div>
              )}
              <div className="gh-modal-body">
                <div>
                  <h3>Overview</h3>
                  <p>{details.description}</p>
                  {details.features.length > 0 && (
                    <>
                      <h3>Key features</h3>
                      <ul>
                        {details.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <aside>
                  <h3>Tech stack</h3>
                  <div className="gh-modal-tags">
                    {project.techStack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <h3>Explore</h3>
                  <div className="gh-modal-links">
                    {project.repo && (
                      <button
                        type="button"
                        className="gh-button gh-button-blue"
                        onClick={() => setTab("code")}
                      >
                        <Code2 size={15} /> View source code{" "}
                        <ArrowRight size={14} />
                      </button>
                    )}
                    {project.repo && (
                      <External
                        href={project.repo}
                        className="gh-button gh-button-blue"
                      >
                        <Github size={15} /> Source code{" "}
                        <ArrowUpRight size={14} />
                      </External>
                    )}
                    {project.live && (
                      <External
                        href={project.live}
                        className="gh-button gh-button-muted"
                      >
                        <ExternalLink size={15} /> Live demo{" "}
                        <ArrowUpRight size={14} />
                      </External>
                    )}
                    {!project.repo && !project.live && (
                      <p>No public source or demo link was supplied.</p>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="gh-modal-bottom">
          <button type="button" onClick={() => onClose(move(-1).id)}>
            <ArrowLeft size={16} /> Previous project
          </button>
          <span>
            {index + 1} / {PROJECTS.length} · Esc to close
          </span>
          <button type="button" onClick={() => onClose(move(1).id)}>
            Next project <ArrowRight size={16} />
          </button>
        </footer>
      </div>
    </dialog>
  );
}

export default function GitHubPortfolio() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("utsav-portfolio-theme") === "light"
        ? "light"
        : "dark";
    } catch {
      return "dark";
    }
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [params, setParams] = useSearchParams();
  const selected =
    getProjectById(params.get("project")) ||
    PROJECTS.find(({ id }) => id === params.get("project"));
  const ghStats = useGitHubProfile();
  useEffect(() => {
    try {
      localStorage.setItem("utsav-portfolio-theme", theme);
    } catch {
      /* Storage can be disabled. */
    }
  }, [theme]);
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} · GitHub-style developer portfolio`;
  }, []);
  useEffect(() => {
    if (!location.hash) return undefined;
    const timer = window.setTimeout(
      () =>
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ block: "start", behavior: "auto" }),
      70,
    );
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const sections = NAVIGATION.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length)
          setActiveTab(
            visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
              .target.id,
          );
      },
      { rootMargin: "-12% 0px -69% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const open = (id) =>
    setParams((current) => {
      const updated = new URLSearchParams(current);
      updated.set("project", id);
      return updated;
    });
  const close = (nextId) =>
    setParams(
      (current) => {
        const updated = new URLSearchParams(current);
        if (nextId) updated.set("project", nextId);
        else updated.delete("project");
        return updated;
      },
      { replace: Boolean(nextId) },
    );
  const jumpToResults = () =>
    document
      .getElementById("repositories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const selectSearchResult = (result) => {
    if (result.type === "Project") {
      setSearch("");
      open(result.id);
    } else {
      setSearch("");
      setActiveTab(result.id);
      document
        .getElementById(result.id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="gh-page" data-theme={theme}>
      <a className="gh-skip-link" href="#main">
        Skip to main content
      </a>
      <Header
        search={search}
        setSearch={setSearch}
        onSearch={jumpToResults}
        onResult={selectSearchResult}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
      />
      <div className="gh-layout">
        <ProfileSidebar ghStats={ghStats} />
        <main className="gh-main" id="main">
          <OverviewReadme />
          <Socials />
          <Skills />
          <PinnedProjects onOpen={open} />
          <Stats ghStats={ghStats} />
          <Repositories query={search} setQuery={setSearch} onOpen={open} />
          <About />
          <Contact />
          <footer className="gh-footer">
            <span>
              © {new Date().getFullYear()} {PERSONAL_INFO.name} · Crafted with
              React & care.
            </span>
            <span>
              <a href="#home">Back to top ↑</a>
              <span aria-hidden="true"> · </span>
              <a href="/creative">Creative view</a>
              <span aria-hidden="true"> · </span>
              <External href={PERSONAL_INFO.github}>
                GitHub <ArrowUpRight size={12} />
              </External>
            </span>
          </footer>
        </main>
      </div>
      <PortfolioAssistant />
      {selected && (
        <ProjectModal key={selected.id} project={selected} onClose={close} />
      )}
    </div>
  );
}
