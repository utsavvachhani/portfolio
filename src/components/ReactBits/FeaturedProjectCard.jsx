import React from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";

const FeaturedProjectCard = ({
  title,
  description,
  image,
  repo,
  live,
  techStack = [],
}) => {
  const hasRepo = Boolean(repo && repo.trim() !== "" && repo !== "#");
  const hasLive = Boolean(live && live.trim() !== "" && live !== "#");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="group relative glass-card rounded-3xl overflow-hidden hover-lift border border-divider/10 hover:border-highlight/30 transition-all duration-500 shadow-2xl"
    >
      {/* Featured Badge */}
      <div className="absolute top-5 right-5 z-10 bg-highlight text-dark px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-md">
        <StarIcon sx={{ fontSize: 14 }} />
        Featured Flagship
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="relative overflow-hidden h-64 md:h-auto bg-black/40">
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
            }
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-black text-primary mb-3 group-hover:text-highlight transition-colors duration-300 tracking-tight">
            {title}
          </h3>

          <p className="text-sm md:text-base text-third mb-6 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Tags */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-highlight/15 text-highlight rounded-full text-xs font-mono font-bold border border-highlight/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons using dedicated button design tokens */}
          {(hasRepo || hasLive) && (
            <div className="flex flex-wrap gap-3">
              {hasRepo && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 px-6 py-3 rounded-xl border border-divider/10 font-bold text-xs shadow-md group/btn"
                >
                  <GitHubIcon sx={{ fontSize: 16 }} className="group-hover/btn:rotate-12 transition-transform" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {hasLive && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-lg group/btn"
                >
                  <LaunchIcon sx={{ fontSize: 15 }} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProjectCard;
