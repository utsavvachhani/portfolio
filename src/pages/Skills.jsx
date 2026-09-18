import React from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES, CORE_METRICS, PERSONAL_INFO } from "../constants";
import SkillsComponents from "../components/skills/SkillsComponents";
import { SectionHeader, AmbientBackground } from "../components/common";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TerminalIcon from "@mui/icons-material/Terminal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function Skills() {
  return (
    <section className="relative bg-primary text-primary min-h-screen pt-28 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-8 overflow-hidden">
      {/* Background Orbs */}
      <AmbientBackground />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <SectionHeader
          as="h1"
          icon={<AutoAwesomeIcon sx={{ fontSize: 34 }} />}
          badge="Engineering Matrix"
          title="Technical"
          highlight="Abilities"
          subtitle="A comprehensive overview of my software engineering capabilities, framework proficiencies, database management, and architecture practices."
        />

        {/* Quick Engineering Summary Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14 glass-card p-6 rounded-3xl border border-divider/10 bg-secondary/30 backdrop-blur-xl shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {CORE_METRICS.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-secondary/50 border border-divider/5">
                <div className="text-[11px] text-third uppercase font-mono tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm sm:text-base font-black text-highlight">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Skills Categories */}
        <SkillsComponents
          containerVariants={containerVariants}
          cardVariants={cardVariants}
          skillCategories={SKILL_CATEGORIES}
        />

        {/* Architecture & Engineering Practices Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass-card p-8 sm:p-12 rounded-3xl border border-divider/10 bg-secondary/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-highlight font-black text-sm">
                <TerminalIcon sx={{ fontSize: 20 }} />
                <span>Continuous Software Learning</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                Building Production-Ready Systems
              </h2>
              <p className="text-third text-xs sm:text-sm max-w-2xl leading-relaxed">
                Adhering to SOLID principles, modular component design, clean RESTful route structuring, and strict version control practices.
              </p>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 rounded-2xl font-bold text-xs shadow-lg flex-shrink-0"
            >
              Explore Repositories on GitHub
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;
