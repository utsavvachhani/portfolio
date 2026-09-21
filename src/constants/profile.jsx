import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";

export const PERSONAL_INFO = {
  name: "Utsav Vachhani",
  title: "Full-Stack Developer (MERN)",
  role: "Full-Stack Developer",
  status: "Open for Engineering Internships & Full-Stack Projects",
  college: "Sarvajanik College of Engineering & Technology (SCET), Surat",
  degree: "B.Tech in Information Technology (2022 - 2026)",
  email: "vachhaniutsav2@gmail.com",
  phone: "9512655868",
  location: "Surat, Gujarat, India",
  cvLink: "/resume/utsav-vachhani-resume.pdf",
  github: "https://github.com/utsavvachhani",
  linkedin: "https://www.linkedin.com/in/vachhani-utsav-21ut75/",
  bioGreeting: "Hi, I'm Utsav Vachhani 👋",
  bioHeadline: "Full-Stack Developer (MERN) & IT Undergraduate",
  bioParagraphs: [
    "I am an ambitious Full-Stack Developer (MERN) and an IT undergraduate student at Sarvajanik College of Engineering & Technology (SCET), Surat.",
    "My engineering expertise spans the entire development lifecycle, with a heavy emphasis on building scalable, real-time web products utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js). I thrive on creating clean, intuitive user interfaces and highly performant backend microservices.",
    "What started as simple web experiments has grown into a dedicated software engineering career. I'm continuously expanding my technical knowledge, optimizing production bottlenecks, and building high-impact web products.",
  ],
};

export const STATS = [
  { value: "9+", label: "Finished Projects" },
  { value: "2+", label: "Completed Internships" },
  { value: "MERN", label: "Core Stack Specialization" },
  { value: "SCET", label: "IT Undergraduate @ Surat" },
];

export const CORE_METRICS = [
  { label: "Core Stack", val: "MERN Stack" },
  { label: "Frontend", val: "React & Next.js" },
  { label: "Database", val: "MongoDB & Postgres" },
  { label: "Architecture", val: "REST APIs & MVC" },
];

export const FOCUS_AREAS = [
  {
    icon: <CodeIcon className="text-blue-400" />,
    title: "Full-Stack Development",
    desc: "Architecting responsive, high-performance web applications using React.js, Next.js, and modern CSS systems.",
  },
  {
    icon: <StorageIcon className="text-emerald-400" />,
    title: "Database Modeling",
    desc: "Designing scalable MongoDB collections, PostgreSQL schemas, indexing strategies, and aggregation pipelines.",
  },
  {
    icon: <SpeedIcon className="text-amber-400" />,
    title: "REST API Microservices",
    desc: "Engineering Node.js and Express servers with JWT authentication, role-based access, and rate limiting.",
  },
  {
    icon: <SecurityIcon className="text-purple-400" />,
    title: "Web Security & Auditing",
    desc: "Implementing Helmet security headers, Nodemailer webhooks, input sanitization, and automated threat tests.",
  },
];
