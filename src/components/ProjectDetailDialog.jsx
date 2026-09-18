import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Github } from "./BrandIcons.jsx";
import { getProjectDetails } from "../constants/projectDetails.js";

function ProjectGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const dragX = useRef(null);
  const hasMultiple = images.length > 1;
  const move = (direction) =>
    setActive((index) => (index + direction + images.length) % images.length);
  const finishSwipe = (endX) => {
    if (dragX.current === null || !hasMultiple) return;
    const delta = endX - dragX.current;
    if (Math.abs(delta) > 55) move(delta < 0 ? 1 : -1);
    dragX.current = null;
  };
  if (!images.length) {
    return (
      <div className="gallery-empty">
        <ImageIcon size={35} aria-hidden="true" />
        <strong>{title}</strong>
        <span>No project screenshots were included in the supplied files.</span>
      </div>
    );
  }
  return (
    <section className="project-gallery" aria-label={`${title} image gallery`}>
      <div
        className="gallery-stage"
        tabIndex={hasMultiple ? 0 : undefined}
        aria-label={
          hasMultiple
            ? "Gallery: use left and right arrow keys to change images"
            : "Project visual"
        }
        onKeyDown={(event) => {
          if (!hasMultiple) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse") dragX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (event.pointerType === "mouse") finishSwipe(event.clientX);
        }}
        onPointerCancel={() => {
          dragX.current = null;
        }}
        onTouchStart={(event) => {
          dragX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          finishSwipe(event.changedTouches[0].clientX);
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={`${images[active].src}-${active}`}
            src={images[active].src}
            alt={images[active].alt || `${title} screenshot ${active + 1}`}
            loading={active === 0 ? "eager" : "lazy"}
            draggable="false"
            initial={reduced ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: reduced ? 0 : 0.24 }}
          />
        </AnimatePresence>
        {hasMultiple && (
          <>
            <button
              className="gallery-arrow gallery-prev"
              onClick={() => move(-1)}
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="gallery-arrow gallery-next"
              onClick={() => move(1)}
              aria-label="Next screenshot"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
        <span className="gallery-image-count" aria-live="polite">
          {active + 1} / {images.length}
        </span>
      </div>
      <div className="gallery-caption">
        <span>
          {images[active].caption || images[active].alt || "Project image"}
        </span>
        <span>
          {images.length === 1
            ? "ONE ORIGINAL IMAGE AVAILABLE"
            : "DRAG OR SWIPE TO EXPLORE"}
        </span>
      </div>
      {hasMultiple && (
        <div
          className="gallery-thumbnails"
          aria-label="Choose project screenshot"
        >
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className={
                index === active ? "gallery-thumb selected" : "gallery-thumb"
              }
              aria-label={`View screenshot ${index + 1}: ${image.caption || image.alt || title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <img src={image.src} alt="" loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ProjectDetailDialog({
  project,
  projects,
  onClose,
  getCategory,
}) {
  const dialog = useRef(null);
  const closeButton = useRef(null);
  const details = getProjectDetails(project);
  const idx = projects.findIndex((item) => item.id === project.id);
  const neighbor = (direction) =>
    projects[(idx + direction + projects.length) % projects.length];

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    node.showModal();
    document.body.classList.add("modal-open");
    closeButton.current?.focus();
    return () => {
      if (node.open) node.close();
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className="project-dialog project-dialog-full"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="dialog-content">
        <header className="dialog-header">
          <span className="dialog-index">
            CASE STUDY <span>/</span> {String(idx + 1).padStart(2, "0")} OF{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <button
            ref={closeButton}
            className="dialog-close"
            onClick={() => onClose()}
            aria-label="Close project details"
          >
            <span>CLOSE</span>
            <X size={22} />
          </button>
        </header>
        <div className="dialog-project-heading">
          <div>
            <span className="mini-label">
              {getCategory(project)} / SELECTED WORK
            </span>
            <h2 id="project-dialog-title">
              {project.title}
              <span className="accent-dot">.</span>
            </h2>
          </div>
          <p>{details.overview}</p>
        </div>
        <div className="dialog-body">
          <div className="dialog-gallery-column">
            <ProjectGallery images={details.images} title={project.title} />
          </div>
          <div className="dialog-details">
            <div className="dialog-subsection">
              <span className="detail-section-number">01 / OVERVIEW</span>
              <h3>Behind the build</h3>
              <p className="dialog-description">{details.description}</p>
            </div>
            {details.features.length > 0 && (
              <div className="dialog-subsection">
                <span className="detail-section-number">02 / CAPABILITIES</span>
                <h3>Key features</h3>
                <ul className="dialog-features">
                  {details.features.map((feature, i) => (
                    <li key={`${feature}-${i}`}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="dialog-subsection">
              <span className="detail-section-number">03 / STACK</span>
              <h3>Technologies</h3>
              <div className="tech-tags">
                {project.techStack.map((technology, i) => (
                  <span key={`${technology}-${i}`}>{technology}</span>
                ))}
              </div>
            </div>
            {details.challenges.length > 0 && (
              <div className="dialog-subsection">
                <span className="detail-section-number">
                  04 / PROBLEM SOLVING
                </span>
                <h3>Challenges &amp; Solutions</h3>
                <div className="challenge-grid">
                  {details.challenges.map((challenge, i) => (
                    <article
                      key={`${challenge.title}-${i}`}
                      className="challenge-card"
                    >
                      <span>CHALLENGE {String(i + 1).padStart(2, "0")}</span>
                      <h4>{challenge.title}</h4>
                      <p>
                        <b>Challenge</b> {challenge.challenge}
                      </p>
                      <p>
                        <b>Solution</b> {challenge.solution}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            )}
            <div className="dialog-subsection dialog-resources">
              <span className="detail-section-number">
                {details.challenges.length ? "05" : "04"} / LINKS
              </span>
              <h3>Explore the project</h3>
              <div className="dialog-links">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-lime"
                  >
                    <Github size={17} /> View source <ArrowUpRight size={17} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline"
                  >
                    Live website <ExternalLink size={17} />
                  </a>
                )}
                {!project.repo && !project.live && (
                  <p className="unavailable-note">
                    No public source or demo link was supplied for this project.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="dialog-footer">
          <button
            onClick={() => onClose(neighbor(-1).id)}
            aria-label={`Previous project: ${neighbor(-1).title}`}
          >
            <ArrowLeft size={18} />
            <span>Previous project</span>
          </button>
          <span>
            {idx + 1} / {projects.length}
          </span>
          <button
            onClick={() => onClose(neighbor(1).id)}
            aria-label={`Next project: ${neighbor(1).title}`}
          >
            <span>Next project</span>
            <ArrowRight size={18} />
          </button>
        </footer>
      </div>
    </dialog>
  );
}
