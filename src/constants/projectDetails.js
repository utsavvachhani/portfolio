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
  "finance-dashboard",
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
    category: project.category || null,
    overview: project.overview || project.description,
    images,
    features: project.features || PROJECT_FEATURES[project.id] || [],
    challenges,
  };
}
