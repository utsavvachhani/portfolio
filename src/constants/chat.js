export const QUICK_OPTIONS = [
  { id: "projects", label: "💻 Featured Projects" },
  { id: "about", label: "👤 About Utsav" },
  { id: "skills", label: "🛠️ Technical Skills" },
  { id: "contact", label: "📬 Contact & Resume" },
];

export const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "👋 Hi there! Welcome to Utsav Vachhani's Portfolio Assistant.\nHow can I help you today? Select an option below or type a message!",
    time: "Just now",
    options: QUICK_OPTIONS,
  },
];

export const getBotResponse = (userText) => {
  const lower = userText.toLowerCase();
  let botText = "";
  let followUpOptions = QUICK_OPTIONS;

  if (/\b(hi|hello|hey)\b/.test(lower)) {
    botText =
      "Hello! 👋 Great to meet you! I can help you learn more about Utsav's engineering projects, MERN stack skills, or contact info. What would you like to explore?";
  } else if (
    lower.includes("project") ||
    lower.includes("work") ||
    lower.includes("repo") ||
    lower.includes("converse") ||
    lower.includes("cybershield")
  ) {
    botText =
      "🚀 Utsav has built flagship full-stack products:\n• Converse2K25: MERN college fest registration platform\n• Cyber Shield: Email awareness & threat analytics system\n• WhatsApp Automation Tool: Node.js & WebSockets service\n• Finance Dashboard: React & Framer Motion telemetry UI";
    followUpOptions = [
      { id: "skills", label: "🛠️ View Tech Stack" },
      { id: "contact", label: "📬 Contact Utsav" },
    ];
  } else if (
    lower.includes("about") ||
    lower.includes("who") ||
    lower.includes("background") ||
    lower.includes("education") ||
    lower.includes("experience") ||
    lower.includes("intern")
  ) {
    botText =
      "👤 Utsav Vachhani is a Full-Stack Developer and B.Tech Information Technology student at SCET, Surat (2022–2026). He worked as a Web Development Intern at Cybersecurity Umbrella from January to April 2026, building Next.js dashboards, Node.js/Express services, API integrations, and PostgreSQL functionality.";
    followUpOptions = [
      { id: "projects", label: "💻 View Projects" },
      { id: "skills", label: "🛠️ Technical Skills" },
    ];
  } else if (
    lower.includes("skill") ||
    lower.includes("technolog") ||
    lower.includes("tech") ||
    lower.includes("mern") ||
    lower.includes("stack") ||
    lower.includes("react") ||
    lower.includes("node")
  ) {
    botText =
      "🛠️ Utsav's Technical Core:\n• Frontend: React.js, Next.js, JavaScript (ES6+), Tailwind CSS, Material UI\n• Backend: Node.js, Express.js, JWT, bcrypt, RESTful APIs\n• Databases: MongoDB, Mongoose ORM, PostgreSQL\n• Tools & Cloud: Git, GitHub, Firebase, Vercel";
    followUpOptions = [
      { id: "projects", label: "💻 View Projects" },
      { id: "contact", label: "📬 Get in Touch" },
    ];
  } else if (
    lower.includes("contact") ||
    lower.includes("hire") ||
    lower.includes("email") ||
    lower.includes("linkedin") ||
    lower.includes("resume") ||
    lower.includes("cv")
  ) {
    botText =
      "📬 You can get in touch with Utsav directly:\n• Email: vachhaniutsav2@gmail.com\n• LinkedIn: linkedin.com/in/vachhani-utsav-21ut75\n• GitHub: github.com/utsavvachhani\n• Phone: +91 9512655868";
    followUpOptions = [
      { id: "about", label: "👤 About Utsav" },
      { id: "projects", label: "💻 View Projects" },
    ];
  } else {
    botText =
      "Thanks for your message! Utsav is open for software engineering internships and full-stack projects. Feel free to reach out via email (vachhaniutsav2@gmail.com) or choose an option below:";
  }

  return { botText, followUpOptions };
};
