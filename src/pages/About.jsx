import React from "react";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LifeJourneyTimeline from "../components/ReactBits/LifeJourneyTimeline";
import { STATS, FOCUS_AREAS, PERSONAL_INFO } from "../constants";
import {
  SectionHeader,
  AmbientBackground,
  StatCard,
} from "../components/common";

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

function About() {
  return (
    <section className="relative bg-primary text-primary min-h-screen pt-28 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-8 overflow-hidden">
      {/* Background Radial Orbs */}
      <AmbientBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          as="h1"
          icon={<PersonIcon sx={{ fontSize: 32 }} />}
          badge="Full-Stack Engineer Profile"
          title="About"
          highlight="Myself"
        />

        {/* Biography & Quick Metrics Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="glass-card rounded-3xl p-8 md:p-12 mb-16 border border-divider/10 shadow-2xl relative overflow-hidden group hover:border-highlight/30 transition-colors duration-300 bg-secondary/30 backdrop-blur-2xl"
        >
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            <div className="flex-1 space-y-6 text-third leading-relaxed text-base md:text-lg">
              <h2 className="text-3xl font-extrabold text-primary tracking-tight">
                {PERSONAL_INFO.bioGreeting}
              </h2>

              {PERSONAL_INFO.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              {/* Action Buttons using dedicated button design tokens */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href={PERSONAL_INFO.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-3 rounded-xl font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <PictureAsPdfIcon sx={{ fontSize: 16 }} />
                  <span>Download / View CV</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3 rounded-xl font-bold text-xs border border-divider/10 flex items-center gap-2 shadow-sm"
                >
                  <LinkedInIcon sx={{ fontSize: 16 }} />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-6 py-3 rounded-xl font-bold text-xs border border-divider/10 flex items-center gap-2 shadow-sm"
                >
                  <GitHubIcon sx={{ fontSize: 16 }} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-divider/10">
            {STATS.map((stat, i) => (
              <StatCard
                key={i}
                value={stat.value}
                label={stat.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </motion.div>

        {/* Engineering Focus Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <SectionHeader
            badge="Core Competencies"
            title="Technical"
            highlight="Focus Areas"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOCUS_AREAS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-2xl border border-divider/10 hover:border-highlight/30 transition-all duration-300 bg-secondary/20 flex items-start gap-4 shadow-md"
              >
                <div className="p-3 rounded-xl bg-secondary/60 shadow-sm flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-third leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Life Journey Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <SectionHeader
            badge="Academic & Professional Milestones"
            title="Life Journey"
            highlight="Timeline"
          />

          <LifeJourneyTimeline />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
