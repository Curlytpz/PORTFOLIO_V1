import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { seaItSolvedProject as project } from "../data/seaItSolved.js";

const featureSections = [
  {
    number: "01 / Overview",
    title: "Overview",
    copy:
      "Sea-It-Solved is an automated lecture capturing and documentation system designed for mathematics lectures. The system combines classroom capture, computer vision, media processing, and AI-assisted processing to transform lecture content into structured digital learning materials.",
    imageIndex: 0,
    className: "case-section--hero",
  },
  {
    number: "02 / My Role",
    title: "My Role",
    copy:
      "I lead the software development of Sea-It-Solved, working across the frontend, backend, database, authentication, AI integration, media processing, security, and overall application architecture. I also handle system integration and debugging while collaborating with the team on hardware testing and thesis documentation.",
    note:
      "My teammates contribute primarily to hardware integration, testing, and research and thesis documentation.",
  },
  {
    number: "03 / System Access",
    title: "System Access",
    copy:
      "Sea-It-Solved provides separate access for students, instructors, and administrators, allowing each user type to access tools relevant to their role. Authentication and role-based access control help keep those workflows appropriately separated.",
    imageIndex: 1,
  },
  {
    number: "04 / Instructor Workspace",
    title: "Instructor Workspace",
    copy:
      "The instructor workspace provides tools for managing class sections, monitoring students, reviewing submitted work, and accessing lesson management features.",
    imageIndex: 2,
  },
  {
    number: "05 / Hardware Integration",
    title: "Hardware Integration",
    copy:
      "The platform includes configurable classroom hardware settings for camera calibration, classroom lighting, and microphone input. The software interface for hardware configuration is implemented, while physical hardware integration remains under development.",
    imageIndex: 3,
  },
  {
    number: "06 / AI-Assisted Lesson Materials",
    title: "AI-Assisted Lesson Materials",
    copy:
      "Captured and reviewed lesson content can be organized into structured learning materials. The instructor workspace includes an AI lesson assistant powered by Google Gemini 2.5 Flash that works with approved lesson context to generate supporting materials such as quizzes.",
    imageIndex: 4,
    className: "case-section--showcase",
  },
  {
    number: "07 / Assessments",
    title: "Assessments",
    copy:
      "Instructors can review and manage generated assessments based on approved lesson material, including questions, answer choices, correct answers, and explanations.",
    imageIndex: 5,
  },
];

export default function SeaItSolved() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const previousTriggerRef = useRef(null);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    previousTriggerRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + project.images.length) % project.images.length
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % project.images.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousTriggerRef.current?.focus?.();
    };
  }, [lightboxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const previousImage = () =>
    setLightboxIndex((current) =>
      current === null
        ? null
        : (current - 1 + project.images.length) % project.images.length
    );
  const nextImage = () =>
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % project.images.length
    );

  return (
    <>
      <main className="case-study-page">
        <header className="case-header container">
          <Link to="/#work" className="back-link">
            ← Back to projects
          </Link>
          <p className="case-header-label">Featured project</p>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
          <p className="case-meta-line">
            {project.year} · {project.context} · {project.status}
          </p>
          <ul className="case-header-tech" aria-label="Project technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {project.visitUrl ? (
            <a
              className="case-visit-link"
              href={project.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Project ↗
            </a>
          ) : null}
        </header>

        {featureSections.map((section) => {
          const image =
            section.imageIndex === undefined
              ? null
              : project.images[section.imageIndex];

          return (
            <section
              className={`case-section container ${section.className || ""} ${image ? "" : "case-section--text"}`}
              key={section.number}
            >
              <p className="case-section-label">{section.number}</p>
              <div className="case-section-copy">
                <h2>{section.title}</h2>
                <p>{section.copy}</p>
                {section.note ? <p className="case-section-note">{section.note}</p> : null}
              </div>
              {image ? (
                <button
                  className="case-image-button"
                  type="button"
                  onClick={() => openLightbox(section.imageIndex)}
                  aria-label={`View ${image.caption} at full size`}
                >
                  <img className="case-image" src={image.src} alt={image.alt} />
                  <span className="case-image-caption">{image.caption}</span>
                </button>
              ) : null}
            </section>
          );
        })}

        <section className="case-section case-architecture container">
          <p className="case-section-label">08 / Technology &amp; Architecture</p>
          <div className="case-section-copy">
            <h2>Technology &amp; Architecture</h2>
            <p>
              The platform combines a React interface with an Express API,
              PostgreSQL data, background processing, and supporting services.
            </p>
          </div>
          <div className="architecture-grid">
            {project.architecture.map((group) => (
              <section className="architecture-group" key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(" · ")}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">09 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              The software platform is currently functional, while physical
              classroom hardware integration remains under development.
            </p>
          </div>
          <dl className="case-status-grid">
            <div>
              <dt>Software Platform</dt>
              <dd>Functional</dd>
            </div>
            <div>
              <dt>Physical Hardware Integration</dt>
              <dd>In Development</dd>
            </div>
          </dl>
        </section>

        <section className="case-section case-gallery container">
          <p className="case-section-label">10 / Gallery</p>
          <div className="case-section-copy">
            <h2>Gallery</h2>
            <p>Selected interfaces from the current software platform.</p>
          </div>
          <div className="case-gallery-grid">
            {project.images.map((image, index) => (
              <button
                className="case-gallery-item"
                type="button"
                key={image.src}
                onClick={() => openLightbox(index)}
                aria-label={`Open ${image.caption} at full size`}
              >
                <img src={image.src} alt={image.alt} />
                <span>{image.caption}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="page-footer">
        <Footer />
      </div>

      {lightboxIndex !== null ? (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Sea-It-Solved image viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={closeButtonRef}
            className="project-lightbox__close"
            type="button"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            ×
          </button>
          <button
            className="project-lightbox__control project-lightbox__control--previous"
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
          >
            ←
          </button>
          <figure className="project-lightbox__figure">
            <img
              src={project.images[lightboxIndex].src}
              alt={project.images[lightboxIndex].alt}
            />
            <figcaption>{project.images[lightboxIndex].caption}</figcaption>
          </figure>
          <button
            className="project-lightbox__control project-lightbox__control--next"
            type="button"
            onClick={nextImage}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      ) : null}
    </>
  );
}
