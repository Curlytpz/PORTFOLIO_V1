import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { seaItSolvedProject as project } from "../data/seaItSolved.js";

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
          <p className="case-header-label">Academic thesis · deployed software</p>
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
          </div>
          <button
            className="case-image-button"
            type="button"
            onClick={() => setLightboxIndex(0)}
            aria-label={`View ${project.images[0].caption} at full size`}
          >
            <ThemeAwareImage
              media={project.images[0].src}
              className="case-image"
              alt={project.images[0].alt}
            />
            <span className="case-image-caption">{project.images[0].caption}</span>
          </button>
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

        <section className="case-section case-section--text container">
          <p className="case-section-label">04 / My Role</p>
          <div className="case-section-copy">
            <h2>My Role</h2>
            <p>{project.role}</p>
            <p className="case-section-note">{project.roleNote}</p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">05 / Key Features</p>
          <div className="case-section-copy">
            <h2>Key Features</h2>
            <p>
              Role-based classroom workflows connect lesson management, capture,
              instructor review, learning materials, and assessment in one system.
            </p>
          </div>
          <DetailGrid groups={project.featureGroups} label="Sea-It-Solved key features" />
        </section>

        <section className="case-section container">
          <p className="case-section-label">06 / System Workflow</p>
          <div className="case-section-copy">
            <h2>System Workflow</h2>
            <p>
              Each stage keeps classroom evidence traceable while preserving
              instructor review before students receive generated material.
            </p>
          </div>
          <ol className="case-workflow" aria-label="Sea-It-Solved system workflow">
            {project.workflow.map((step, index) => (
              <li key={step}>
                <span className="case-workflow__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="case-section container">
          <p className="case-section-label">07 / Technology &amp; Architecture</p>
          <div className="case-section-copy">
            <h2>Technology &amp; Architecture</h2>
            <p>
              The platform combines a React interface, Express API, PostgreSQL
              data, media processing, and supporting services. Media currently
              uses the local storage adapter; persistent Supabase media storage
              remains planned.
            </p>
          </div>
          <DetailGrid
            groups={project.architecture}
            label="Sea-It-Solved technology and architecture"
          />
        </section>

        <section className="case-section container">
          <p className="case-section-label">08 / AI &amp; Security</p>
          <div className="case-section-copy">
            <h2>AI &amp; Security</h2>
            <p>
              AI-assisted generation remains subject to instructor review, while
              layered application controls protect role-based workflows and
              sensitive configuration.
            </p>
          </div>
          <DetailGrid groups={project.aiAndSecurity} label="Sea-It-Solved AI and security" />
        </section>

        <section className="case-section case-gallery container">
          <p className="case-section-label">09 / Screenshots</p>
          <div className="case-section-copy">
            <h2>Screenshots</h2>
            <p>
              Selected role-based, classroom, AI-assisted, and assessment
              interfaces from the current software platform.
            </p>
          </div>
          <div className="case-gallery-grid">
            {project.images.slice(1).map((image, index) => {
              const imageIndex = index + 1;
              return (
                <button
                  className="case-gallery-item"
                  type="button"
                  key={image.caption}
                  onClick={() => setLightboxIndex(imageIndex)}
                  aria-label={`Open ${image.caption} at full size`}
                >
                  <ThemeAwareImage media={image.src} alt={image.alt} />
                  <span>{image.caption}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">10 / Deployment</p>
          <div className="case-section-copy">
            <h2>Deployment</h2>
            <p>
              The web platform is deployed across managed frontend, backend,
              database, AI, and email services.
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

        <section className="case-section case-status container">
          <p className="case-section-label">11 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              The web software is functional and deployed. Full physical
              classroom hardware integration is still being developed and tested.
            </p>
          </div>
          <dl className="case-status-grid">
            <div>
              <dt>Software Platform</dt>
              <dd>Functional / Deployed</dd>
            </div>
            <div>
              <dt>Physical Hardware Integration</dt>
              <dd>In Development</dd>
            </div>
          </dl>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">12 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>
              Building Sea-It-Solved strengthened my experience with larger
              role-based full-stack systems, API and database design,
              authentication and authorization, AI integration, background
              processing, system security, debugging, and integration. It also
              taught me how to balance AI automation with instructor review and
              coordinate software and hardware work within a thesis team.
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
          aria-label="Sea-It-Solved project image viewer"
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
