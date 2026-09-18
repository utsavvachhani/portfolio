import React from "react";
import { motion } from "framer-motion";

export const SectionHeader = ({
  badge,
  title,
  highlight,
  subtitle,
  icon,
  as = "h2",
  align = "center",
  className = "",
}) => {
  const HeadingTag = as;
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } mb-12 sm:mb-14 ${className}`}
    >
      {icon && (
        <div className="p-3 rounded-2xl bg-highlight/10 border border-highlight/20 mb-3.5 shadow-md text-highlight">
          {icon}
        </div>
      )}

      {badge && (
        <span className="text-xs uppercase tracking-widest text-highlight font-black px-3.5 py-1 bg-highlight/10 rounded-full border border-highlight/20 select-none mb-3 inline-block">
          {badge}
        </span>
      )}

      <HeadingTag className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight">
        {title}{" "}
        {highlight && (
          <span className="text-highlight font-extrabold">{highlight}</span>
        )}
      </HeadingTag>

      <div
        className={`h-1 w-16 bg-highlight rounded-full mt-3.5 shadow-md shadow-highlight/45 ${
          isCenter ? "mx-auto" : ""
        }`}
      />

      {subtitle && (
        <p className="text-third text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
