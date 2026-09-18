import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../constants";
import ProjectCard from "../components/ReactBits/ProjectCard.jsx";
import FeaturedProjectCard from "../components/ReactBits/FeaturedProjectCard.jsx";
import { SectionHeader, AmbientBackground, StatCard } from "../components/common";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProject = PROJECTS[0];
  const otherProjects = PROJECTS.slice(1);

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return otherProjects.filter((p) => {
      const matchesCategory =
        filter === "all"
          ? true
          : filter === "live"
          ? Boolean(p.live && p.live.trim() !== "")
          : !p.live || p.live.trim() === "";

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.techStack?.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [otherProjects, filter, searchQuery]);

  const liveProjectsCount = useMemo(
    () => PROJECTS.filter((p) => p.live && p.live.trim() !== "").length,
    []
  );

  const fullStackCount = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes("mern") ||
          p.description.toLowerCase().includes("mern") ||
          p.id === "converse2k25" ||
          p.id === "memories"
      ).length,
    []
  );

  return (
    <section className="relative bg-primary text-primary min-h-screen pt-28 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-8 overflow-hidden">
      {/* Background Orbs */}
      <AmbientBackground variant="cyan" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Page Header */}
        <SectionHeader
          as="h1"
          icon={<FolderOpenIcon sx={{ fontSize: 36 }} />}
          badge="Open Source Catalog"
          title="My Creative"
          highlight="Archive"
          subtitle="A comprehensive catalog of full-stack products, lab utilities, algorithms, and frontend interfaces I have designed and deployed."
        />

        {/* Featured Project Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <SectionHeader
            badge="Flagship Application"
            title={featuredProject.title}
            className="mb-8"
          />

          <FeaturedProjectCard {...featuredProject} />
        </motion.div>

        {/* Interactive Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <SectionHeader
            badge="Browse Repositories"
            title="All Project"
            highlight="Repositories"
            className="mb-8"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-secondary/30 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border border-divider/10 shadow-2xl max-w-4xl mx-auto">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { type: "all", label: `📁 All (${otherProjects.length})` },
                {
                  type: "live",
                  label: `⚡ Live Demos (${otherProjects.filter((p) => p.live && p.live.trim() !== "").length})`,
                },
                {
                  type: "repo",
                  label: `💻 Code Repos (${otherProjects.filter((p) => !p.live || p.live.trim() === "").length})`,
                },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer ${
                    filter === type
                      ? "btn-primary shadow-lg scale-105"
                      : "btn-secondary"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Live Search Box */}
            <div className="relative w-full md:w-64">
              <SearchIcon sx={{ fontSize: 18 }} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-third" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stack or title..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs transition-all shadow-inner"
              />
            </div>
          </div>
        </motion.div>

        {/* Counter Pill */}
        <div className="mb-6 flex items-center justify-between text-xs text-third font-medium max-w-6xl mx-auto px-2">
          <span>
            Showing <strong className="text-highlight font-black">{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? "" : "s"}
          </span>
          <span className="flex items-center gap-1">
            <FilterListIcon sx={{ fontSize: 14 }} className="text-highlight" />
            <span>Interactive Repository Grid</span>
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id || index} {...project} index={index} />
          ))}
        </div>

        {/* Clean Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 rounded-3xl border border-divider/10 max-w-xl mx-auto bg-secondary/20"
          >
            <p className="text-sm font-bold text-third mb-4">
              No repositories found matching your filter or search query.
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 rounded-xl btn-primary font-bold text-xs cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Bottom Interactive Stats Panel */}
        <div className="mt-24 pt-12 border-t border-divider/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={PROJECTS.length} label="Total Projects" delay={0.1} />
            <StatCard value={liveProjectsCount} label="Live Demos" delay={0.2} />
            <StatCard value={fullStackCount} label="Full Stack" delay={0.3} />
            <StatCard value="100%" label="Open Source" delay={0.4} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
