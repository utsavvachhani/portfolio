import { PROJECTS } from "./projects.js";

// Portfolio data only. Keep user-provided project details separate from presentation.
export const PORTFOLIO_PROJECTS = [
  ...PROJECTS,
  {
    id: 'uvmart',
    title: "uvMart",
    description:
      "Developed an e-commerce style platform with basic product management and email notification features.",
    techStack: ["MERN Stack", "Nodemailer"],
    repo: "https://github.com/utsavvachhani/uvMart",
    image: null,
  },
];
export const FEATURE_IDS = [
  "converse2k25",
  "cyberls",
  "memories",
  "cyberls",
];

// Only capabilities described by the supplied portfolio and PDF.
export const PROJECT_FEATURES = {
  converse2k25: [
    "Participant event registration",
    "Confirmation emails",
    "Admin registration management",
    "Registration exports",
  ],
  cybershield: [
    "Email security awareness training",
    "Threat simulations and analytics",
    "User reporting and PDF downloads",
    "Email certificates",
  ],
  cyberls: [
    "Google Workspace backup and restore",
    "AWS S3 cloud data management",
    "Google OAuth & reCAPTCHA secure login",
    "Multi-tenant access control for organizations",
    "Interactive analytics charts using Recharts",
  ],
  whatsappweb: [
    "Headless WhatsApp automation client (whatsapp-web.js & Puppeteer)",
    "Real-time QR code session pairing with Socket.io",
    "PDF and document parsing (pdf-parse / pdfjs-dist)",
    "PostgreSQL persistence with secure JWT & cookie auth",
    "Responsive Vite, Tailwind & Redux frontend dashboard",
  ],
  taskmanager: ["Daily workflow tracking", "Task priorities", "Status updates"],
  converse2k24: [
    "Event registrations",
    "Firebase integration",
    "Google Sheets synchronization",
  ],
  'finance-dashboard': [
    "Responsive financial charts",
    "KPI widgets",
    "Interface micro-animations",
  ],
  cyberls: [
    "Responsive frontend development using Next.js",
    "Modern UI design with Tailwind CSS",
    "Backend API integration",
    "AWS S3 bucket data fetching",
    "Interactive charts and data visualization using Recharts",
    "Reusable React components",
    "Mobile-friendly and responsive layouts",
  ],
  memories: [
    "Create and share memories with rich images & tags",
    "Secure JWT & Google OAuth authentication",
    "Interactive like system and tag-based filtering",
    "Full CRUD management for personal journal entries",
  ],
  'react-js-study': [
    "Custom React hooks",
    "Context API examples",
    "State-management patterns",
    "Optimization examples",
  ],
  'software-engineering': [
    "Gym membership records",
    "Workout management",
    "Schedule management",
  ],
  'js-study': [
    "JavaScript algorithms",
    "ES6+ examples",
    "DOM manipulation exercises",
  ],
  'wt-lab': [
    "Client-server examples",
    "XML schema validation",
    "Responsive frontend exercises",
  ],
  'linked-list': [
    "Singly linked lists in C",
    "Doubly linked lists in C",
    "Dynamic memory management",
  ],
  'codsoft-portfolio': [
    "Personal portfolio",
    "HTML and CSS implementation",
    "CSS transitions",
  ],
  'codsoft-landing': [
    "Product landing page",
    "Flexbox and CSS Grid layouts",
    "Interactive elements",
  ],
  uvmart: ["Basic product management", "Email notifications"],
};

// Galleries accept additional *real, project-matched* images when the owner supplies them.
// No second screenshot or challenge is synthesized from the first one.
export function getProjectDetails(project) {
  const images =
    Array.isArray(project.images) && project.images.length
      ? project.images.filter((image) => image && image.src)
      : project.image
        ? [
          {
            src: project.image,
            alt: `${project.title} — supplied portfolio visual`,
            caption: "Project visual",
          },
        ]
        : [];
  const challenges = (project.challenges || []).filter(
    (item) => item.challenge?.trim() && item.solution?.trim(),
  );
  return {
    ...project,
    category: project.category || categoryOf(project),
    overview: project.overview || project.description,
    images,
    features: project.features || PROJECT_FEATURES[project.id] || [],
    challenges,
  };
}

export function getProjectById(id) {
  if (!id) return null;
  const project = PORTFOLIO_PROJECTS.find((item) => item.id === id);
  return project ? getProjectDetails(project) : null;
}

export function categoryOf(project) {
  if (!project) return "Full stack";
  const stack = Array.isArray(project.techStack)
    ? project.techStack.join(" ").toLowerCase()
    : "";
  if (
    /study|lab|data structures|algorithms/i.test(project.title || "") ||
    ["react-js-study", "js-study", "wt-lab", "linked-list"].includes(project.id)
  )
    return "Learning";
  const hasBackend =
    /node|express|php|mongodb|postgresql|mysql|mern|websocket/.test(stack);
  const hasFrontend =
    /react|next|html|css|vite|tailwind|javascript|framer|mern/.test(stack);
  if (hasBackend && hasFrontend) return "Full stack";
  if (hasBackend) return "Backend";
  return "Frontend";
}

export function getProjectNeighbors(id, projects = PORTFOLIO_PROJECTS) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1)
    return {
      prev: projects[0],
      next: projects[0],
      index: 0,
      total: projects.length,
    };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next, index, total: projects.length };
}

export function groupTechStack(techStack = []) {
  if (!Array.isArray(techStack)) return { frontend: [], backend: [] };

  const FRONTEND_REGEX =
    /\b(?:react(?:\.js)?|next(?:\.js)?|vite(?:\.js)?|vue|svelte|html5?|css3?|tailwind(?:\s*css)?|bootstrap|redux(?:\s*toolkit)?|react\s*router(?:\s*dom)?|framer-motion|recharts|lucide-react|javascript|dom(?:\s*api)?|responsive\s*design|custom\s*hooks|context\s*api|es6\+?|ui)\b/i;

  const BACKEND_REGEX =
    /\b(?:node(?:\.js)?|express(?:\.js)?|mongodb|postgresql|postgres|mysql|sql|firebase(?:\s*auth)?|google\s*sheets\s*api|socket\.io|jwt|bcryptjs|restful\s*api|rest\s*api|whatsapp-web\.js|puppeteer|qrcode|pdf\s*parse|pdfjs-dist|aws\s*s3|google\s*oauth|recaptcha|stripe|nodemailer|axios|php|c\b|pointers|dynamic\s*memory\s*management|cookie-parser|cors|dotenv)\b/i;

  const frontend = [];
  const backend = [];

  techStack.forEach((tech) => {
    const trimmed = String(tech).trim();
    if (FRONTEND_REGEX.test(trimmed) && !BACKEND_REGEX.test(trimmed)) {
      frontend.push(trimmed);
    } else if (BACKEND_REGEX.test(trimmed) && !FRONTEND_REGEX.test(trimmed)) {
      backend.push(trimmed);
    } else if (/mern/i.test(trimmed)) {
      frontend.push("React (MERN)");
      backend.push("Node / MongoDB (MERN)");
    } else if (FRONTEND_REGEX.test(trimmed)) {
      frontend.push(trimmed);
    } else {
      backend.push(trimmed);
    }
  });

  return { frontend, backend };
}
