import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PortraitIcon from "@mui/icons-material/Portrait";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContactsIcon from "@mui/icons-material/Contacts";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";

export const NAV_PAGES = [
  { name: "About", href: "/about", icon: <PortraitIcon /> },
  { name: "Projects", href: "/projects", icon: <FolderOpenIcon /> },
  { name: "Contact", href: "/contact", icon: <ContactsIcon /> },
  { name: "Skills", href: "/skills", icon: <AddToDriveIcon /> },
];

export const SOCIAL_LINKS = [
  {
    href: "https://github.com/utsavvachhani",
    icon: <GitHubIcon />,
    label: "GitHub",
    textColor: "group-hover:text-white hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]",
    borderColor: "hover:border-white",
  },
  {
    href: "https://www.instagram.com/vachhani_utsav",
    icon: <InstagramIcon />,
    label: "Instagram",
    textColor: "group-hover:text-[#e4405f] hover:text-[#e4405f] hover:drop-shadow-[0_0_10px_rgba(228,64,95,0.7)]",
    borderColor: "hover:border-[#e4405f]",
  },
  {
    href: "https://x.com/ut_vachhani2115?t=EItJcQaI9oTviQcRAWBdzQ&s=09",
    icon: <TwitterIcon />,
    label: "X (Twitter)",
    textColor: "group-hover:text-[#1da1f2] hover:text-[#1da1f2] hover:drop-shadow-[0_0_10px_rgba(29,161,242,0.7)]",
    borderColor: "hover:border-[#1da1f2]",
  },
  {
    href: "https://www.facebook.com/share/XuhgoNWwae9jKxkj/?mibextid=qi2Omg",
    icon: <FacebookIcon />,
    label: "Facebook",
    textColor: "group-hover:text-[#1877f2] hover:text-[#1877f2] hover:drop-shadow-[0_0_10px_rgba(24,119,242,0.7)]",
    borderColor: "hover:border-[#1877f2]",
  },
  {
    href: "https://drive.google.com/file/d/1zGjqP97eWmsi4EpYrL9FZXMl4KveP65P/view?usp=drive_link",
    icon: <PictureAsPdfIcon />,
    label: "View CV",
    textColor: "group-hover:text-[#ef4444] hover:text-[#ef4444] hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]",
    borderColor: "hover:border-[#ef4444]",
  },
  {
    href: "https://www.linkedin.com/in/vachhani-utsav-21ut75/",
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    textColor: "group-hover:text-[#0a66c2] hover:text-[#0a66c2] hover:drop-shadow-[0_0_10px_rgba(10,102,194,0.7)]",
    borderColor: "hover:border-[#0a66c2]",
  },
];
