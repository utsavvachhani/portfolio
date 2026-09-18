import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import LanguageIcon from "@mui/icons-material/Language";

export const HERO_TECH_STACK = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Next.js",
  "Firebase",
  "GitHub",
  "Git",
  "Tailwind CSS",
];

export const SKILL_CATEGORIES = [
  {
    title: "Front-End Development",
    icon: (
      <CodeIcon className="text-blue-600 group-hover:text-blue-400 transition" />
    ),
    textColor: "group-hover:text-blue-400",
    borderColor: "hover:border-blue-400",
    ringColor: "group-hover:ring-blue-400",
    skills: [
      "HTML5",
      "CSS3",
      "Sass",
      "JavaScript (ES6+)",
      "React.js",
      "Bootstrap",
      "Tailwind CSS",
      "Material UI",
    ],
  },
  {
    title: "Back-End Development",
    icon: (
      <StorageIcon className="text-green-600 group-hover:text-green-400 transition" />
    ),
    textColor: "group-hover:text-green-400",
    borderColor: "hover:border-green-400",
    ringColor: "group-hover:ring-green-400",
    skills: ["Node.js", "Express.js", "JWT", "bcrypt", "RESTful APIs"],
  },
  {
    title: "Full Stack & Architecture",
    icon: (
      <IntegrationInstructionsIcon className="text-indigo-600 group-hover:text-indigo-400 transition" />
    ),
    textColor: "group-hover:text-indigo-400",
    borderColor: "hover:border-indigo-400",
    ringColor: "group-hover:ring-indigo-400",
    skills: [
      "MERN Stack",
      "MVC Pattern",
      "Component-Based Design",
      "Microservices",
    ],
  },
  {
    title: "Data Handling & APIs",
    icon: (
      <SettingsIcon className="text-yellow-600 group-hover:text-yellow-400 transition" />
    ),
    textColor: "group-hover:text-yellow-400",
    borderColor: "hover:border-yellow-400",
    ringColor: "group-hover:ring-yellow-400",
    skills: [
      "RESTful APIs",
      "CRUD Operations",
      "JSON",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: (
      <BuildIcon className="text-pink-600 group-hover:text-pink-400 transition" />
    ),
    textColor: "group-hover:text-pink-400",
    borderColor: "hover:border-pink-400",
    ringColor: "group-hover:ring-pink-400",
    skills: [
      "Git & GitHub",
      "Firebase",
      "Mongoose",
      "Appwrite",
      "Vercel",
      "Google Sheets API",
    ],
  },
  {
    title: "Languages",
    icon: (
      <LanguageIcon className="text-white/60 group-hover:text-white transition" />
    ),
    textColor: "group-hover:text-white",
    borderColor: "hover:border-white/40",
    ringColor: "group-hover:ring-white/40",
    skills: ["English", "Gujarati", "Hindi"],
  },
];
