import React from "react";
import HeroComp from "../components/Home/HeroComp.jsx";
import ProjectCard from "../components/ReactBits/ProjectCard.jsx";
import Conver2k24 from "../assets/Converse2k24.png";
import Memories from "../assets/memories.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function Home() {
return (
<>
<HeroComp />
<section className="bg-primary text-primary py-20 px-0">
<h2 className="text-4xl font-bold text-center mb-12 text-hover">
Projects
</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
<ProjectCard
            title="Converse2K24"
            description="Full-stack college fest site using React & Firebase."
            image={Conver2k24}
            repo="https://github.com/utsavvachhani/converse2k24"
            live="https://utsavvachhani.github.io/converse2k24/"
          />
<ProjectCard
            title="Memories"
            description="Full-stack MERN app for sharing memories with image upload."
            image={Memories}
            repo="https://github.com/utsavvachhani/memories"
            live="https://memories-app-omega.vercel.app/"
          />

          <div className="group border mx-6 md:mx-0 border-white bg-transparent backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:rotate-[0.5deg] flex items-center justify-center h-100 w-110 md:w-full hover:border-[#679ae7] cursor-pointer">
            <Link to="/projects">
              <div className="flex justify-center items-center w-14 h-14 rounded-full bg-white text-black transition-all duration-300 group-hover:bg-[#679ae7] group-hover:text-white">
                <ArrowForwardIosIcon />
              </div>
                <p className="mt-6 flex items-center">View More</p>
            </Link>
          </div>
        </div>
      </section>
    </>

);
}

export default Home; here have any important things please let's him in your mind to make a good portfolie

there i sbowled have my basic things you needs to focuses on thuis

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PortraitIcon from "@mui/icons-material/Portrait";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContactsIcon from "@mui/icons-material/Contacts";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import LanguageIcon from "@mui/icons-material/Language";

import Converse2k24 from "../assets/Converse2k24.png";
import Memories from "../assets/memories.png";
import ReactJSStudt from "../assets/React-JS-Study.png"
import SoftwareEngineering from "../assets/SoftwareEngineering.png";
import JSLOGO from "../assets/JSLOGO.png"
import WT_LAB from "../assets/WT_LAB.png";
import linkedlist from "../assets/linkedlist.png";
import codesoftportfolie from "../assets/codesoftportfolie.jpg"
import landingC from "../assets/landingC.jpg"

export const socialLinks = [
{
href: "https://github.com/utsavvachhani",
icon: <GitHubIcon />,
label: "GitHub",
textColor: "group-hover:text-blue-500",
borderColor: "hover:border-blue-500",
},
{
href: "https://www.instagram.com/vachhani_utsav",
icon: <InstagramIcon />,
label: "Instagram",
textColor: "group-hover:text-pink-500",
borderColor: "hover:border-pink-500",
},
{
href: "https://x.com/ut_vachhani2115?t=EItJcQaI9oTviQcRAWBdzQ&s=09",
icon: <TwitterIcon />,
label: "X (Twitter)",
textColor: "group-hover:text-blue-500",
borderColor: "hover:border-blue-500",
},
{
href: "https://www.facebook.com/share/XuhgoNWwae9jKxkj/?mibextid=qi2Omg",
icon: <FacebookIcon />,
label: "Facebook",
textColor: "group-hover:text-blue-600",
borderColor: "hover:border-blue-600",
},
{
href: "https://drive.google.com/file/d/1zGjqP97eWmsi4EpYrL9FZXMl4KveP65P/view?usp=drive_link",
icon: <PictureAsPdfIcon />,
label: "View CV",
textColor: "group-hover:text-red-700",
borderColor: "hover:border-red-700",
},
{
href: "https://www.linkedin.com/in/vachhani-utsav-21ut75/",
icon: <LinkedInIcon />,
label: "LinkedIn",
textColor: "group-hover:text-blue-700",
borderColor: "hover:border-blue-700",
},
];

export const pages = [
{ name: "About", href: "/about", icon: <PortraitIcon /> },
{ name: "Projects", href: "/projects", icon: <FolderOpenIcon /> },
{ name: "Contact", href: "/contact", icon: <ContactsIcon /> },
{ name: "Skills", href: "/skills", icon: <AddToDriveIcon /> },
];

export const skillCategories = [
{
title: "Front-End Development",
icon: <CodeIcon className="text-blue-600 group-hover:text-blue-400 transition" />,
textColor: "group-hover:text-blue-400",
borderColor: "hover:border-blue-400",
ringColor: "group-hover:ring-blue-400",
skills: ["HTML5", "CSS3", "Sass", "JavaScript (ES6+)", "React.js", "Bootstrap", "Tailwind CSS", "Material UI"],
},
{
title: "Back-End Development",
icon: <StorageIcon className="text-green-600 group-hover:text-green-400 transition" />,
textColor: "group-hover:text-green-400",
borderColor: "hover:border-green-400",
ringColor: "group-hover:ring-green-400",
skills: ["Node.js", "Express.js", "JWT", "bcrypt"],
},
{
title: "Full Stack & Architecture",
icon: <IntegrationInstructionsIcon className="text-indigo-600 group-hover:text-indigo-400 transition" />,
textColor: "group-hover:text-indigo-400",
borderColor: "hover:border-indigo-400",
ringColor: "group-hover:ring-indigo-400",
skills: ["MERN Stack", "MVC Pattern", "Component-Based Design"],
},
{
title: "Data Handling & APIs",
icon: <SettingsIcon className="text-yellow-600 group-hover:text-yellow-400 transition" />,
textColor: "group-hover:text-yellow-400",
borderColor: "hover:border-yellow-400",
ringColor: "group-hover:ring-yellow-400",
skills: ["RESTful APIs", "CRUD Operations", "JSON"],
},
{
title: "Tools & Platforms",
icon: <BuildIcon className="text-pink-600 group-hover:text-pink-400 transition" />,
textColor: "group-hover:text-pink-400",
borderColor: "hover:border-pink-400",
ringColor: "group-hover:ring-pink-400",
skills: ["Git & GitHub", "Firebase", "Mongoose", "Appwrite", "Google Sheets"],
},
{
title: "Languages",
icon: <LanguageIcon className="text-white/60 group-hover:text-white transition" />,
textColor: "group-hover:text-white",
borderColor: "hover:border-white/40",
ringColor: "group-hover:ring-white/40",
skills: ["English", "Gujarati", "Hindi"],
},
];

export const milestones = [
{
title: "10th Grade",
year: "March 2020",
description: "Scored 79% (96.48 %title) in SSC Board. First milestone in my academic journey.",
side: "left",
link: "https://example.com/10th-grade",
},
{
title: "12th Grade",
year: "March 2022",
description: "Completed HSC with 77% (95.31 %title).Discovered my interest in programming.",
side: "right",
link: "https://example.com/12th-grade",
},
{
title: "GUJECT",
year: "April 2022",
description: "I scored 95.90 %title(92.50/120) in GUJECT, securing admission to SCET.",
side: "left",
link: "https://example.com/guject",
},
{
title: "Zee Mains",
year: "May 2022",
description: "I scored 87.05%title in Zee Mains, witch a great percentile.",
side: "right",
link: "https://example.com/zee-mains",
},
{
title: "Bachelor’s Degree",
year: "2022-2026",
description: "Pursuing B.Tech in IT. Learned frontend, backend & built multiple projects.",
side: "left",
link: "https://scet.ac.in/",
},
{
title: "Internship at Prodigy Infotech",
year: "15th July, 2024 - 15th August, 2024",
description: "Worked as a Software Development Intern. Built real-world apps and improved my Python skills.",
side: "right",
link: "https://www.linkedin.com/posts/vachhani-utsav-21ut75_lor-from-prodigy-infotech-activity-7230001521596235776-9U_R?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaZtIoBvpn8y8qc5DZ888BlaC-9deFfycw",
},
{
title: "Internship at CodSoft",
year: "20th August, 2024 - 20th September, 2024",
description: "Created landing pages, portfolios, calculators and contributed to open-source.",
side: "left",
link: "https://www.linkedin.com/posts/vachhani-utsav-21ut75_vachhani-utsavcodsoft-activity-7244194368302051328-RKHo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEaZtIoBvpn8y8qc5DZ888BlaC-9deFfycw",
},
{
title: "Converse2K24 Project",
year: "September 2024",
description: "Built a full-stack event registration site for a college fest using React + Firebase + Google Sheets.",
side: "right",
link: "https://github.com/utsavvachhani/converse2k24",
},
{
title: "Converse2K25 Project",
year: "August 2025",
description: "Built a full-stack event registration site for a college fest using MERN.",
side: "left",
link: "https://github.com/utsavvachhani/converse2k25",
},
];

export const projects = [
{
title: "Converse2K24",
repo: "https://github.com/utsavvachhani/converse2k24",
live: "https://utsavvachhani.github.io/converse2k24/",
description: "Full-stack college fest site using React & Firebase.",
image: Converse2k24,
},
{
title: "Memories",
repo: "https://github.com/utsavvachhani/memories",
live: "https://memories-app-omega.vercel.app/",
description: "Full-stack MERN app for sharing memories with image upload.",
image: Memories,
},
{
title: "React JS Study",
repo: "https://github.com/utsavvachhani/react-js-study",
live: "",
description: "A comprehensive React.js study project with various components and hooks.",
image: ReactJSStudt,
},
{
title: "Software Engineering",
repo: "https://github.com/utsavvachhani/Software-Engineering",
live: "https://utsavvachhani.github.io/Software-Engineering/Home.html",
description: "This repository contains the mini project developed for the Software Engineering course at Sarvajanik College of Engineering & Technology, Surat, titled URKJ - Fitness House – a Gym Management System designed to simplify gym operations and enhance the user experience.",
image: SoftwareEngineering,
},
{
title: "js-studey",
repo: "https://github.com/utsavvachhani/js-studey",
live: "",
description: "This repository contains all the files and projects I am working on while learning JavaScript. The content is organized into folders based on topics and includes practice files, projects, and exercises.",
image: JSLOGO,
},
{
title: "WT_Lab",
repo: "https://github.com/utsavvachhani/WT_Lab",
live: "https://utsavvachhani.github.io/WT_Lab/",
description: "Lab file of the Web Technologies Lab.",
image: WT_LAB,
},
{
title: "LinkedList",
repo: "https://github.com/utsavvachhani/LinkedList_uv",
live: "",
description: "Singly Linked List Operations in C",
image: linkedlist,
},
{
title: "CODSOFT_PROTFOLIO",
repo: "https://github.com/utsavvachhani/CODSOFT_PROTFOLIO",
live: "https://utsavvachhani.github.io/CODSOFT_PROTFOLIO/",
description: "Creating a personal portfolio using CSS and HTML is a popular beginner web development project. ",
image: codesoftportfolie,
},
{
title: "CODSOFT_LANDING-PAGE",
repo: "https://github.com/utsavvachhani/CODSOFT_LANDING-PAGE",
live: "https://utsavvachhani.github.io/CODSOFT_LANDING-PAGE/",
description: "A landing page is an ideal web development project for beginners. It requires basic knowledge of HTML and CSS.",
image: landingC,
},
];


and this appp have this much pages 


<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>

      and this is my portfolie and what you needs to focuses on where creates the proffectionlly used the portfolide for the mern stack developer and also neds to working with the basic thngs such as the focuses on me and also needs to focuses on the my basic changes where every you neeeds to create basic things just create for you alsi make sure it have dark theme and also needs to used the basic anumation where every needs and also used the perfect working of thigs and also needs to used the perfect working of the things