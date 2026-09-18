import React from "react";
import { motion } from "framer-motion";

export const StatCard = ({ value, label, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-secondary/30 backdrop-blur-xl border border-divider/10 hover:border-highlight/30 transition-all duration-300 text-center shadow-lg hover:shadow-highlight/10 ${className}`}
    >
      <span className="text-3xl sm:text-4xl md:text-5xl font-black text-highlight mb-2 block tracking-tight group-hover:scale-105 transition-transform duration-300 drop-shadow-sm">
        {value}
      </span>
      <span className="text-xs sm:text-sm text-third font-medium tracking-wider uppercase block">
        {label}
      </span>
    </motion.div>
  );
};

export default StatCard;
