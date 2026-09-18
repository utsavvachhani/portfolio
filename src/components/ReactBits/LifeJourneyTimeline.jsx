import React from "react";
import { motion } from "framer-motion";
import { MILESTONES } from "../../constants";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LaunchIcon from "@mui/icons-material/Launch";

// Icon selector helper
const getIcon = (title = "") => {
  const lower = title.toLowerCase();
  if (
    lower.includes("grade") ||
    lower.includes("bachelor") ||
    lower.includes("gujcet") ||
    lower.includes("mains") ||
    lower.includes("scet")
  ) {
    return <SchoolIcon sx={{ fontSize: 20 }} className="text-highlight" />;
  } else if (lower.includes("internship") || lower.includes("intern")) {
    return <WorkIcon sx={{ fontSize: 20 }} className="text-highlight" />;
  } else if (lower.includes("project") || lower.includes("converse") || lower.includes("app")) {
    return <CodeIcon sx={{ fontSize: 20 }} className="text-highlight" />;
  }
  return <EmojiEventsIcon sx={{ fontSize: 20 }} className="text-highlight" />;
};

const LifeJourneyTimeline = () => {
  return (
    <div className="relative w-full py-8 select-none">
      <div className="relative max-w-5xl mx-auto">
        {/* Central Vertical Timeline Line */}
        <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-highlight via-emerald-400 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(103,154,231,0.4)] z-0" />

        {/* Timeline Row Items */}
        <div className="space-y-12 md:space-y-16">
          {MILESTONES.map((item, index) => {
            const isLeft = item.side === "left" || index % 2 === 0;

            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center w-full group">
                
                {/* Central Node Badge - Positioned Exactly on Central Line */}
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-secondary border-2 border-highlight text-highlight items-center justify-center shadow-lg shadow-highlight/25 group-hover:scale-115 group-hover:rotate-12 transition-all duration-300"
                >
                  {getIcon(item.title)}
                </motion.div>

                {/* Left Side Content Container */}
                <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:opacity-0 md:pointer-events-none"}`}>
                  {isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                      className="p-6 rounded-2xl bg-secondary/30 backdrop-blur-xl border border-divider/20 hover:border-highlight/40 transition-all duration-300 shadow-xl group-hover:shadow-highlight/15 relative overflow-hidden text-left md:text-right"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-highlight/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex flex-wrap items-center gap-2 mb-2 justify-start md:justify-end">
                        <span className="px-3 py-0.5 text-xs font-mono font-bold rounded-full bg-highlight/15 text-highlight border border-highlight/20">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-primary mb-2 tracking-tight group-hover:text-highlight transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-third text-xs sm:text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {item.link && item.link !== "#" && !item.link.includes("example.com") && (
                        <div className="mt-4 pt-2 border-t border-divider/10 flex items-center justify-start md:justify-end">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-highlight hover:text-white transition-colors duration-300 group/link"
                          >
                            <span>Explore Details</span>
                            <LaunchIcon sx={{ fontSize: 13 }} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Right Side Content Container */}
                <div className={`w-full md:w-1/2 mt-4 md:mt-0 ${!isLeft ? "md:pl-12 md:text-left" : "md:opacity-0 md:pointer-events-none hidden md:block"}`}>
                  {!isLeft && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6 }}
                      className="p-6 rounded-2xl bg-secondary/30 backdrop-blur-xl border border-divider/20 hover:border-highlight/40 transition-all duration-300 shadow-xl group-hover:shadow-highlight/15 relative overflow-hidden text-left"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-highlight/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex flex-wrap items-center gap-2 mb-2 justify-start">
                        <span className="px-3 py-0.5 text-xs font-mono font-bold rounded-full bg-highlight/15 text-highlight border border-highlight/20">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-primary mb-2 tracking-tight group-hover:text-highlight transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-third text-xs sm:text-sm leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {item.link && item.link !== "#" && !item.link.includes("example.com") && (
                        <div className="mt-4 pt-2 border-t border-divider/10 flex items-center justify-start">
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-highlight hover:text-white transition-colors duration-300 group/link"
                          >
                            <span>Explore Details</span>
                            <LaunchIcon sx={{ fontSize: 13 }} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* End Node Dot */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 w-3.5 h-3.5 bg-highlight rounded-full z-20 shadow-lg shadow-highlight/60" />
      </div>
    </div>
  );
};

export default LifeJourneyTimeline;
