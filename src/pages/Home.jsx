import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroComp from "../components/Home/HeroComp.jsx";
import FeaturedProjects from "../components/Home/FeaturedProjects.jsx";
import LifeJourneyTimeline from "../components/ReactBits/LifeJourneyTimeline.jsx";
import SkillsComponents from "../components/skills/SkillsComponents";
import { STATS, SKILL_CATEGORIES } from "../constants";
import { SectionHeader, AmbientBackground, StatCard } from "../components/common";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    hover: {
      y: -6,
      scale: 1.02,
    },
  };

  return (
    <div className="relative bg-primary text-primary overflow-hidden min-h-screen">
      {/* Background Radial Glow Orbs */}
      <AmbientBackground />

      {/* 1. Full-Section 3D WebGL Hero */}
      <HeroComp />

      {/* Animated Stats Banner with Reusable StatCards */}
      <section className="relative z-10 bg-secondary/30 py-12 sm:py-16 border-y border-divider/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, idx) => (
              <StatCard
                key={idx}
                value={stat.value}
                label={stat.label}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Featured Projects Showcase */}
      <FeaturedProjects limit={6} />

      {/* 3. Life Journey Timeline Section */}
      <section id="life-journey-timeline" className="relative z-10 py-20 sm:py-24 px-6 sm:px-12 lg:px-8 bg-secondary/10 border-t border-divider/10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Academic & Professional Milestones"
            title="Life Journey"
            highlight="Timeline"
          />

          <LifeJourneyTimeline />
        </div>
      </section>

      {/* 4. Tech Stack Dashboard Section */}
      <section className="relative z-10 bg-secondary/15 py-20 sm:py-24 px-6 sm:px-12 lg:px-8 border-t border-divider/10 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Engineering Matrix"
            title="Skills &"
            highlight="Capabilities"
            subtitle="Core technologies for building scalable full-stack web applications, REST microservices, and reactive user interfaces."
          />

          <SkillsComponents
            containerVariants={containerVariants}
            cardVariants={cardVariants}
            skillCategories={SKILL_CATEGORIES.slice(0, 3)}
          />

          <div className="mt-12 text-center">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-highlight hover:text-white transition-all duration-300 hover:translate-x-1"
            >
              <span>Explore full skills & milestones</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="relative z-10 py-20 sm:py-24 px-6 sm:px-12 lg:px-8 border-t border-divider/10 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl p-10 sm:p-14 md:p-16 overflow-hidden glass-card border border-divider/10 shadow-2xl text-center flex flex-col items-center"
          >
            <span className="text-xs uppercase tracking-widest text-highlight font-black mb-4 px-3.5 py-1 bg-highlight/10 rounded-full border border-highlight/20 select-none">
              Let's Collaborate
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-primary tracking-tight max-w-2xl leading-tight">
              Have a project concept or an exciting opportunity?
            </h2>

            <p className="text-base sm:text-lg text-third max-w-2xl mb-8 leading-relaxed">
              I'm always eager to exchange ideas, tackle technical challenges,
              or join innovative engineering teams. Let's design and code
              something magnificent!
            </p>

            <Link
              to="/contact"
              className="px-8 py-4 bg-highlight text-dark rounded-xl font-bold shadow-lg shadow-highlight/20 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
