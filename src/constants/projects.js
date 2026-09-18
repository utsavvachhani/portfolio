import Converse2k24 from "../assets/optimized/Converse2k24.webp";
import Converse2k25 from "../assets/optimized/Converse2k25.webp";
import cyberShield from "../assets/optimized/cyberShield.webp";
import whatsappweb from "../assets/optimized/whatsapp-web-js.webp";
import financialDakbord from "../assets/optimized/financialDakbord.webp";
import taskmanger from "../assets/optimized/taskmanger.webp";
import Memories from "../assets/optimized/memories.webp";
import ReactJSStudt from "../assets/optimized/React-JS-Study.webp";
import SoftwareEngineering from "../assets/optimized/SoftwareEngineering.webp";
import JSLOGO from "../assets/optimized/JSLOGO.webp";
import WT_LAB from "../assets/optimized/WT_LAB.webp";
import linkedlist from "../assets/optimized/linkedlist.webp";
import codesoftportfolie from "../assets/optimized/codesoftportfolie.webp";
import landingC from "../assets/optimized/landingC.webp";

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All Projects", tag: null },
  { id: "mern", label: "MERN Stack", tag: "mern" },
  { id: "react", label: "React & Next.js", tag: "react" },
  { id: "node", label: "Node & APIs", tag: "node" },
  { id: "web", label: "Web & Tools", tag: "web" },
];

export const PROJECTS = [
  {
    id: "converse2k25",
    title: "Converse2K25",
    repo: "https://github.com/utsavvachhani/converse2k25",
    live: "https://converse2k25.vercel.app/",
    description: "Full-stack annual college fest registration and event management platform built with the MERN stack.",
    image: Converse2k25,
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Redux Toolkit",
      "JWT",
    ],
  },
  {
    id: "cybershield",
    title: "Cyber Shield - Threat Analytics",
    repo: "https://github.com/utsavvachhani/emailAwareness",
    description: "Email security awareness platform with automated threat simulations, analytics reports, and user audits.",
    image: cyberShield,
    techStack: [
      "Next.js",
      "Express.js",
      "Tailwind CSS",
      "Node.js",
      "JWT",
      "Stripe",
      "PostgreSQL",
      "Nodemailer",
      "bcryptjs",
      "axios",
      "framer-motion",
      "recharts",
    ],
  },
  {
    id: "whatsappweb",
    title: "WhatsApp Web Service",
    description: "Headless WhatsApp automation client and webhook server using whatsapp-web.js and WebSockets.",
    image: whatsappweb,
    techStack: [
      "Vite.js",
      "Express.js",
      "Tailwind CSS",
      "Node.js",
      "JWT",
      "bcryptjs",
      "whatsapp-web.js",
      "Socket.io",
    ],
  },
  {
    id: "taskmanager",
    title: "Task Manager App",
    description: "Intuitive productivity application for organized daily workflow tracking, priorities, and status updates.",
    image: taskmanger,
    techStack: [
      "React.js",
      "Express.js",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "JWT",
      "RESTful API",
    ],
  },
  {
    id: "converse2k24",
    title: "Converse2K24",
    repo: "https://github.com/utsavvachhani/converse2k24",
    live: "https://utsavvachhani.github.io/converse2k24/",
    description: "Full-stack fest registration portal featuring real-time synchronization with Google Sheets API and Firebase.",
    image: Converse2k24,
    techStack: [
      "React.js",
      "Firebase Auth",
      "Tailwind CSS",
      "Google Sheets API",
    ],
  },
  {
    id: "finance-dashboard",
    title: "Finance Dashboard UI",
    repo: "https://github.com/utsavvachhani/finance-dashboard-ui",
    live: "https://finance-dashboard-ui-psi-ten.vercel.app/",
    description: "Modern financial analytics telemetry dashboard featuring responsive charts, KPI widgets, and fluid micro-animations.",
    image: financialDakbord,
    techStack: [
      "React.js",
      "framer-motion",
      "lucide-react",
      "Tailwind CSS",
      "Recharts",
    ],
  },
  {
    id: "memories",
    title: "Memories Social App",
    repo: "https://github.com/utsavvachhani/memories",
    live: "https://memories-app-omega.vercel.app/",
    description: "Full-stack MERN social journal for sharing personal milestones, images, and user interactions with JWT auth.",
    image: Memories,
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Redux Toolkit",
      "JWT",
    ],
  },
  {
    id: "react-js-study",
    title: "React JS Architecture Lab",
    repo: "https://github.com/utsavvachhani/react-js-study",
    live: "",
    description: "Comprehensive React.js deep-dive repository showcasing custom hooks, Context API, state patterns, and optimizations.",
    image: ReactJSStudt,
    techStack: ["React.js", "Context API", "React Hooks", "CSS Modules"],
  },
  {
    id: "software-engineering",
    title: "URKJ Fitness House (Gym Management)",
    repo: "https://github.com/utsavvachhani/Software-Engineering",
    live: "https://utsavvachhani.github.io/Software-Engineering/Home.html",
    description: "Software engineering course project: Gym management system simplifying membership records, workouts, and schedules.",
    image: SoftwareEngineering,
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: "js-study",
    title: "Modern JavaScript Algorithms",
    repo: "https://github.com/utsavvachhani/js-studey",
    live: "",
    description: "In-depth collection of JavaScript practice routines, ES6+ features, algorithmic solutions, and DOM manipulations.",
    image: JSLOGO,
    techStack: [
      "JavaScript (ES6+)",
      "Algorithms",
      "DOM Operations",
      "Interactive UI",
    ],
  },
  {
    id: "wt-lab",
    title: "Web Technologies Lab Suite",
    repo: "https://github.com/utsavvachhani/WT_Lab",
    live: "https://utsavvachhani.github.io/WT_Lab/",
    description: "Academic lab suite covering client-server architectures, XML schema validation, and responsive frontends.",
    image: WT_LAB,
    techStack: ["HTML5", "CSS3", "JavaScript", "XML Schemas", "Java Servlets"],
  },
  {
    id: "linked-list",
    title: "Data Structures - Linked List in C",
    repo: "https://github.com/utsavvachhani/LinkedList_uv",
    live: "",
    description: "Comprehensive implementation of singly and doubly linked lists in C with dynamic memory management algorithms.",
    image: linkedlist,
    techStack: [
      "C Programming",
      "Pointers",
      "Data Structures",
      "Memory Management",
    ],
  },
  {
    id: "codsoft-portfolio",
    title: "CodSoft Portfolio Showcase",
    repo: "https://github.com/utsavvachhani/CODSOFT_PROTFOLIO",
    live: "https://utsavvachhani.github.io/CODSOFT_PROTFOLIO/",
    description: "Personal web developer portfolio crafted with vanilla HTML5, CSS3, and modern CSS transitions.",
    image: codesoftportfolie,
    techStack: [
      "HTML5",
      "CSS3",
      "Vanilla JS",
      "Responsive Design",
      "Micro-Animations",
    ],
  },
  {
    id: "codsoft-landing",
    title: "CodSoft Landing Page",
    repo: "https://github.com/utsavvachhani/CODSOFT_LANDING-PAGE",
    live: "https://utsavvachhani.github.io/CODSOFT_LANDING-PAGE/",
    description: "High-converting modern product landing page built with semantic HTML5, Flexbox, and CSS Grid layouts.",
    image: landingC,
    techStack: [
      "HTML5",
      "CSS3",
      "Flexbox Grid",
      "Transitions",
      "Interactive Elements",
    ],
  },
];
