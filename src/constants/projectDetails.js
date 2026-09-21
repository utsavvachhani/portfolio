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
  "cybershield",
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
  whatsappweb: [
    "Headless WhatsApp automation client",
    "Webhook server",
    "WebSocket connectivity",
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
    "Create memories with images and tags",
    "View shared posts",
    "Edit and delete own entries",
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
