import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Download, Mail, MapPin, Phone, Printer } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons.jsx';

// Transcribed from the supplied one-page PDF; links were read from its existing annotations.
const projects = [
  { name: 'Converse-2K25', tech: 'React.js, Node.js, Express.js, MongoDB, Firebase, Nodemailer', description: 'Built a tech fest platform where participants register for events and receive confirmation emails. Admin panel manages user data and exports registrations for event handling.', github: 'https://github.com/utsavvachhani/converse2k25', live: 'https://converse2k25.vercel.app/' },
  { name: 'Memories App', tech: 'React.js, Node.js, Express.js, MongoDB', description: 'Developed a CRUD-based application where users can add memories with image, title, description, and tags. Users can view all posts, update or delete their own entries.', github: 'https://github.com/utsavvachhani/memories-app', live: 'https://memories-app-omega.vercel.app/' },
  { name: 'Email Awareness Platform', tech: 'Next.js, Node.js, Express.js, PostgreSQL, Nodemailer', description: 'Built a training platform where companies register and create courses for employees. Employees complete quizze and receive certificates via email. Admin dashboard includes user reports and PDF download functionality.', github: 'https://github.com/utsavvachhani/emailAwareness' },
  { name: 'uvMart', tech: 'MERN Stack, Nodemailer', description: 'Developed an e-commerce style platform with basic product management and email notification features.', github: 'https://github.com/utsavvachhani/uvMart' },
  { name: 'Converse-2K24', tech: 'React.js, Firebase', description: 'Created an event registration website with Firebase integration for handling user data and event participation.', github: 'https://github.com/utsavvachhani/converse2k24' },
];
const skills = [
  ['Frontend', 'React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS'],
  ['Backend', 'Node.js, Express.js'],
  ['Database', 'MongoDB, Firebase, PostgreSQL'],
  ['Tools', 'Git, GitHub, Vercel'],
  ['Languages', 'JavaScript, Python, Java, C'],
];
const PDF = '/resume/utsav-vachhani-resume.pdf';

export default function Resume() {
  useEffect(() => { document.title = 'Résumé — Utsav Vachhani'; window.scrollTo(0, 0); }, []);
  return <div className="resume-page">
    <div className="resume-nav"><div className="resume-nav-inner shell"><a href="/#home" className="resume-back"><ArrowLeft size={17}/> BACK TO PORTFOLIO</a><div><button type="button" className="resume-print" onClick={() => window.print()}><Printer size={16}/> Print</button><a href={PDF} download="Utsav_Vachhani_Resume.pdf" className="button button-lime resume-download"><Download size={16}/> Download PDF</a></div></div></div>
    <main className="resume-paper" id="resume-content">
      <div className="resume-kicker"><span>CURRICULUM VITAE</span><span>UTSAV / 2026</span></div>
      <header className="resume-head"><div><p className="mini-label">FULL-STACK DEVELOPER</p><h1>Utsav<br/><em>Vachhani.</em></h1></div><div className="resume-contact"><a href="tel:+919512655868"><Phone size={14}/> +91 9512655868</a><a href="mailto:vachhaniutsav2@gmail.com"><Mail size={14}/> vachhaniutsav2@gmail.com</a><a href="https://github.com/utsavvachhani" target="_blank" rel="noopener noreferrer"><Github size={14}/> GitHub/utsavvachhani</a><a href="https://www.linkedin.com/in/vachhaniutsav/" target="_blank" rel="noopener noreferrer"><Linkedin size={14}/> LinkedIn/vachhaniutsav</a></div></header>
      <section className="resume-section"><h2><span>01</span> Summary</h2><p>Full-Stack Developer with practical experience in building web applications using the MERN stack and Next.js. Developed responsive user interfaces and implemented backend features for scalable and efficient solutions. Worked on multiple projects involving API integration, authentication, and modern UI design. Skilled in developing responsive user interfaces, integrating backend functionality, and delivering scalable project solutions.</p></section>
      <section className="resume-section"><h2><span>02</span> Education</h2><div className="resume-entry"><div className="resume-entry-heading"><strong>Sarvajanik College of Engineering &amp; Technology (SCET)</strong><span><MapPin size={12}/> Surat, India</span></div><div className="resume-entry-heading resume-subline"><span>B.Tech. Information Technology — CGPA: 9.34</span><span>2022 – 2026</span></div></div></section>
      <section className="resume-section"><h2><span>03</span> Experience</h2><div className="resume-entry"><div className="resume-entry-heading"><strong>Web Development Intern</strong><span>Jan 2026 – Apr 2026</span></div><div className="resume-entry-heading resume-subline"><span>Cybersecurity Umbrella</span><span>On Site</span></div><ul><li>Worked on building dashboards and internal tools using Next.js. Built backend services using Node.js and Express.js.</li><li>Integrated APIs and handled frontend-backend communication.</li><li>Worked with PostgreSQL for database design and data management. h</li></ul></div></section>
      <section className="resume-section"><h2><span>04</span> Leadership</h2><div className="resume-entry"><div className="resume-entry-heading"><strong>Head of Event Management — Converse 2K25</strong><span>2025</span></div><div className="resume-entry-heading resume-subline"><span>SCET</span><span>Surat, India</span></div><a className="resume-event-link" href="https://www.instagram.com/converse2k25/" target="_blank" rel="noopener noreferrer">Event Page: instagram.com/converse2k25 <ArrowUpRight size={12}/></a><ul><li>Led a two-day national tech fest with 2000+ participants and managed 180+ coordinators and volunteers.</li><li>Handled communication through WhatsApp groups for smooth coordination. Proposed 30+ event ideas; one concept was selected and executed.</li><li>Developed the official event platform to streamline registrations and operations.</li></ul></div></section>
      <section className="resume-section"><h2><span>05</span> Projects</h2><div className="resume-projects">{projects.map((project) => <div className="resume-project" key={project.name}><div className="resume-project-heading"><div><strong>{project.name}</strong><span className="resume-tech"> — {project.tech}</span></div><div className="resume-project-links"><a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={11}/></a>{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight size={11}/></a>}</div></div><p>{project.description}</p></div>)}</div></section>
      <section className="resume-section resume-last-section"><h2><span>06</span> Technical Skills</h2><div className="resume-skills">{skills.map(([label, value]) => <p key={label}><strong>{label}:</strong> {value}</p>)}</div></section>
      <div className="resume-paper-bottom" aria-hidden="true"><span>UTSAV VACHHANI</span><span>END OF RÉSUMÉ · <ArrowUpRight size={12}/></span></div>
    </main>
    <div className="resume-bottom-actions"><a href="/#projects">Explore my projects <ArrowUpRight size={16}/></a><a href={PDF} download="Utsav_Vachhani_Resume.pdf"><Download size={16}/> Download original PDF</a></div>
  </div>;
}
