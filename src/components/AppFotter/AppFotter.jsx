import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { NAV_PAGES, SOCIAL_LINKS, PERSONAL_INFO } from "../../constants";
import uvPhoto from "../../assets/uvPhoto.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";

function AppFooter() {
  return (
    <footer className="relative bg-primary text-primary py-16 px-4 sm:px-6 border-t border-divider/10 overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-md h-px bg-gradient-to-r from-transparent via-highlight/40 to-transparent"></div>

      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Profile Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-highlight via-cyan-500 to-indigo-500 rounded-full blur opacity-35 group-hover:opacity-65 transition duration-500"></div>
                <img
                  src={uvPhoto}
                  alt={PERSONAL_INFO.name}
                  className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full border-2 border-divider/10 shadow-xl object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <Typography variant="h6" className="font-black text-primary text-lg sm:text-xl tracking-tight mb-1">
                  {PERSONAL_INFO.name}
                </Typography>
                <div className="flex flex-col space-y-1.5 mt-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/60 text-highlight shadow-sm inline-block w-max mx-auto sm:mx-0 border border-highlight/15">
                    🚀 {PERSONAL_INFO.role}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/60 text-highlight shadow-sm inline-block w-max mx-auto sm:mx-0 border border-highlight/15">
                    🎓 {PERSONAL_INFO.degree}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <Typography variant="h6" className="font-extrabold text-primary text-base tracking-wider uppercase mb-5">
              Quick Links
            </Typography>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 w-full max-w-[280px] md:max-w-none justify-items-center md:justify-items-start">
              {NAV_PAGES.map(({ name, href, icon }) => (
                <Link
                  key={name}
                  to={href}
                  className="flex items-center space-x-2 text-third hover:text-highlight transition-all duration-300 transform hover:translate-x-1 group"
                >
                  <span className="text-highlight group-hover:scale-110 transition-transform duration-300 flex items-center">
                    {icon}
                  </span>
                  <span className="text-sm font-semibold">{name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start">
            <Typography variant="h6" className="font-extrabold text-primary text-base tracking-wider uppercase mb-5">
              Get in Touch
            </Typography>

            {/* Contact Info */}
            <div className="space-y-3.5 mb-5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2.5 group">
                <LocalPhoneIcon className="text-highlight group-hover:scale-110 transition-transform" sx={{ fontSize: 18 }} />
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm text-third hover:text-highlight transition-colors duration-300 font-semibold"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2.5 group">
                <EmailIcon className="text-highlight group-hover:scale-110 transition-transform" sx={{ fontSize: 18 }} />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm text-third hover:text-highlight transition-colors duration-300 font-semibold break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 justify-center md:justify-start flex-wrap gap-y-2 max-w-[280px] md:max-w-none">
              {SOCIAL_LINKS.map(({ href, icon, label, textColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="group p-2.5 rounded-xl text-third bg-secondary/50 hover:bg-secondary/80 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-transparent hover:border-divider/20"
                >
                  <span className={`transition-all duration-300 ${textColor} flex items-center justify-center`}>
                    {icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section Divider */}
        <div className="border-t border-divider/10 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-sm text-third">
          {/* Copyright */}
          <div className="text-center sm:text-left font-medium">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          {/* Made with Love */}
          <div className="flex items-center space-x-1.5 justify-center group cursor-default">
            <span>Made with</span>
            <FavoriteIcon
              className="text-red-500 animate-pulse group-hover:scale-125 transition-transform"
              sx={{ fontSize: 16 }}
            />
            <span>in</span>
            <span className="font-bold text-primary">
              India
            </span>
          </div>

          {/* Tech Stack */}
          <div className="text-center sm:text-right font-medium">
            Built with <span className="text-highlight">React</span> & <span className="text-highlight">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
