import React from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectCard = ({
  title,
  description,
  image,
  repo,
  live,
  techStack = [],
  index = 0,
}) => {
  const hasRepo = Boolean(repo && repo.trim() !== "" && repo !== "#");
  const hasLive = Boolean(live && live.trim() !== "" && live !== "#");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass-card rounded-3xl overflow-hidden hover-lift flex flex-col justify-between border border-white/5 hover:border-highlight/30 transition-all duration-300 shadow-xl"
    >
      {/* Project Image Banner */}
      <div className="relative overflow-hidden h-52 bg-black/40">
        <img
          src={
            image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
          }
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-highlight border border-white/10">
            Project #{index + 1}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-black text-primary mb-2 tracking-tight group-hover:text-highlight transition-colors duration-300">
            {title}
          </h3>
          <p className="text-third text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Badges */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-secondary/60 text-highlight"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 5 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary/40 text-third">
                  +{techStack.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* GitHub Repository & Live Demo Buttons - Dynamic 4-state validation */}
        {(hasRepo || hasLive) && (
          <div className="flex items-center gap-3 pt-3 border-t border-divider/10 mt-auto">
            {hasRepo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-secondary flex items-center justify-center gap-2 font-bold text-xs py-2.5 rounded-xl shadow-sm ${
                  hasLive ? "flex-1" : "w-full"
                }`}
                title={`View ${title} source code on GitHub`}
              >
                <GitHubIcon sx={{ fontSize: 16 }} />
                <span>GitHub Repository</span>
              </a>
            )}

            {hasLive && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-primary flex items-center justify-center gap-1.5 font-bold text-xs py-2.5 rounded-xl shadow-md ${
                  hasRepo ? "flex-1" : "w-full"
                }`}
                title={`Open live site for ${title}`}
              >
                <span>Live Demo</span>
                <LaunchIcon sx={{ fontSize: 14 }} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
