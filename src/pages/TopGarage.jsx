import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { topGarageProject as project } from "../data/topGarage.js";

function DetailGrid({ groups, label }) {
  return (
    <div className="architecture-grid" aria-label={label}>
      {groups.map((group) => (
        <section className="architecture-group" key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.items.join(" · ")}</p>
        </section>
      ))}
    </div>
  );
}

export default function TopGarage() {
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
          <p className="case-header-label">Live client project</p>
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
          <div className="case-header-actions" aria-label="Project links">
            <a
              className="case-visit-link"
              href={project.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              LIVE SITE ↗
            </a>
            <a
              className="case-visit-link"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>
          </div>
        </header>

        <section className="case-section case-section--hero container">
          <p className="case-section-label">01 / Overview</p>
          <div className="case-section-copy">
            <h2>Overview</h2>
            <p>{project.overview}</p>
            <p className="case-section-note">{project.role}</p>
          </div>
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">02 / Problem</p>
          <div className="case-section-copy">
            <h2>Problem</h2>
            <p>{project.problem}</p>
          </div>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">03 / Solution</p>
          <div className="case-section-copy">
            <h2>Solution</h2>
            <p>{project.solution}</p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">04 / Key Features</p>
          <div className="case-section-copy">
            <h2>Key Features</h2>
            <p>
              Customer-facing and administrative workflows are integrated into
              one responsive system.
            </p>
          </div>
          <DetailGrid groups={project.featureGroups} label="TOP-G key features" />
        </section>

        <section className="case-section container">
          <p className="case-section-label">05 / Tech Stack</p>
          <div className="case-section-copy">
            <h2>Tech Stack</h2>
            <p>
              The production stack supports the public website, API, database,
              media management, security, and deployment workflow.
            </p>
          </div>
          <DetailGrid groups={project.techGroups} label="TOP-G technology stack" />
        </section>

        <section className="case-section container">
          <p className="case-section-label">06 / System Architecture</p>
          <div className="case-section-copy">
            <h2>System Architecture</h2>
            <p>
              The React client communicates with the Express API, which uses
              Prisma to access Supabase PostgreSQL. Cloudinary stores project
              imagery separately.
            </p>
          </div>
          <DetailGrid groups={project.architecture} label="TOP-G system architecture" />
        </section>

        <section className="case-section container">
          <p className="case-section-label">07 / Security</p>
          <div className="case-section-copy">
            <h2>Security</h2>
            <p>
              Public submissions and protected management workflows are handled
              through layered validation and access controls.
            </p>
          </div>
          <DetailGrid groups={project.security} label="TOP-G security controls" />
        </section>

        <section className="case-section container">
          <p className="case-section-label">08 / Admin Dashboard</p>
          <div className="case-section-copy">
            <h2>Admin Dashboard</h2>
            <p>
              The business owner can manage customer quotations and control the
              projects displayed on the public website.
            </p>
          </div>
          <DetailGrid groups={project.adminCapabilities} label="TOP-G admin capabilities" />
        </section>

        <section className="case-section case-gallery container">
          <p className="case-section-label">09 / Screenshots</p>
          <div className="case-section-copy">
            <h2>Screenshots</h2>
            <p>Selected public interfaces from the deployed TOP-G website.</p>
          </div>
          <div className="case-gallery-grid">
            {project.images.map((image, index) => (
              <button
                className="case-gallery-item"
                type="button"
                key={image.caption}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open ${image.caption} at full size`}
              >
                <ThemeAwareImage media={image.src} alt={image.alt} />
                <span>{image.caption}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">10 / Deployment</p>
          <div className="case-section-copy">
            <h2>Deployment</h2>
            <p>
              The full production system is deployed across managed frontend,
              API, database, and media services.
            </p>
          </div>
          <dl className="case-status-grid case-status-grid--deployment">
            {project.deployment.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">11 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>
              Building TOP-G strengthened my ability to take a real business
              system from planning through production. I gained deeper practical
              experience with full-stack architecture, database and media
              workflows, protected admin tools, security, responsive UI design,
              optimization, and deployment across multiple services.
            </p>
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
          aria-label="TOP-G project image viewer"
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
            <ThemeAwareImage
              media={project.images[lightboxIndex].src}
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
