import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import uvPhoto from "../../assets/uvPhoto.jpg";
import CircularText from "../ReactBits/CircularText.jsx";
import GradientText from "../ReactBits/GradientText.jsx";
import Hero3DCanvas from "./Hero3DCanvas.jsx";
import { AmbientBackground } from "../common";
import { PERSONAL_INFO, HERO_TECH_STACK } from "../../constants";

function ProfileAvatar() {
  return (
    <div className="relative flex items-center justify-center select-none group">
      {/* Outer Neon Aura Ring Glow */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-highlight via-emerald-400 to-indigo-500 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 animate-pulse pointer-events-none" />

      {/* Rotating Circular Text */}
      <div className="absolute w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] flex items-center justify-center pointer-events-none z-10">
        <CircularText
          text="MERN FULL STACK DEVELOPER "
          onHover="speedUp"
          spinDuration={20}
          className="w-full h-full text-highlight font-mono font-bold tracking-widest drop-shadow-md"
        />
      </div>

      {/* Profile Image Avatar Container with Glass Spotlight Ring */}
      <div className="relative z-20 p-2.5 rounded-full bg-gradient-to-tr from-highlight/40 via-emerald-500/30 to-purple-500/40 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(103,154,231,0.35)] group-hover:shadow-[0_0_90px_rgba(103,154,231,0.5)] transition-all duration-500">
        <img
          src={uvPhoto}
          alt={PERSONAL_INFO.name}
          className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-white/20 shadow-2xl transform rotate-3 group-hover:rotate-[360deg] group-hover:scale-105 transition duration-700 ease-in-out object-cover"
        />
      </div>
    </div>
  );
}

function HeroComp() {
  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center bg-primary overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <Hero3DCanvas />

      {/* Radial Ambient Background Glows */}
      <AmbientBackground />

      {/* Hero Content Overlay */}
      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10 pointer-events-none">
        {/* Left Side: Developer Hook & Actions */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0 pointer-events-auto"
        >
          {/* Status Pill */}
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-highlight/15 text-highlight border border-highlight/30 mb-6 flex items-center gap-2.5 backdrop-blur-md shadow-lg shadow-highlight/10 hover:border-highlight/60 transition-all cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-highlight animate-ping" />
            {PERSONAL_INFO.status}
          </span>

          <h1 className="text-xl sm:text-2xl font-bold mb-2 text-third tracking-wide">
            Hey there, I am
          </h1>

          <div className="mb-4">
            <GradientText
              colors={["#679ae7", "#10b981", "#679ae7", "#a855f7", "#10b981"]}
              animationSpeed={6}
              showBorder={false}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-[poppins] block drop-shadow-lg"
            >
              {PERSONAL_INFO.name}
            </GradientText>
          </div>

          <p className="mt-1 text-xl sm:text-2xl font-extrabold text-primary">
            Full Stack Developer{" "}
            <span className="text-highlight font-black">(MERN)</span>
          </p>

          <p className="text-sm sm:text-base text-third mt-4 leading-relaxed max-w-xl">
            IT Undergraduate at{" "}
            <span className="text-primary font-bold">
              {PERSONAL_INFO.college}
            </span>
            . I build scalable full-stack web applications, REST API servers,
            database architectures, and responsive 3D web interfaces.
          </p>

          {/* Core Tech Stack Chips with Interactive Glow */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center lg:justify-start">
            {HERO_TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-secondary/80 text-highlight border border-highlight/25 backdrop-blur-md hover:bg-highlight hover:text-dark hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hero Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#featured-projects"
              className="btn-primary relative group px-8 py-4 rounded-xl font-black text-sm hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg overflow-hidden"
            >
              <span className="relative z-10">Featured Projects</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </a>
            <Link
              to="/about"
              className="btn-secondary px-8 py-4 backdrop-blur-md border border-divider/20 rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300 shadow-md"
            >
              About Myself
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Profile Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative pointer-events-auto"
        >
          <ProfileAvatar />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroComp;
