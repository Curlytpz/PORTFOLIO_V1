import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import { topGarageProject as project } from "../data/topGarage.js";

const featureSections = [
  {
    number: "02 / Services",
    title: "Services",
    copy:
      "The services page presents the automotive upholstery work available through Top G, including custom seat covers, interior re-upholstery, ceiling work, and installation options.",
    imageIndex: 0,
  },
  {
    number: "03 / About",
    title: "About",
    copy:
      "The about page introduces Top G’s approach to custom automotive interiors, along with business details that help visitors understand the services and location.",
    imageIndex: 1,
  },
  {
    number: "04 / Contact",
    title: "Contact",
    copy:
      "The contact page brings together phone, email, shop location, business hours, and a map so visitors can quickly get in touch or plan a visit.",
    imageIndex: 2,
  },
  {
    number: "05 / Materials",
    title: "Materials",
    copy:
      "The materials page helps customers explore seat-cover options and warranty details before starting a quote conversation for their vehicle.",
    imageIndex: 3,
  },
];

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

        <section className="case-section case-section--hero container">
          <p className="case-section-label">01 / Overview</p>
          <div className="case-section-copy">
            <h2>Overview</h2>
            <p>
              Top G / Top Garage is an automotive upholstery business website
              for presenting interior services, materials, business information,
              and ways for visitors to request a quote.
            </p>
          </div>
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        {featureSections.map((section) => {
          const image = project.images[section.imageIndex];

          return (
            <section className="case-section container" key={section.number}>
              <p className="case-section-label">{section.number}</p>
              <div className="case-section-copy">
                <h2>{section.title}</h2>
                <p>{section.copy}</p>
              </div>
              <button
                className="case-image-button"
                type="button"
                onClick={() => setLightboxIndex(section.imageIndex)}
                aria-label={`View ${image.caption} at full size`}
              >
                <img className="case-image" src={image.src} alt={image.alt} />
                <span className="case-image-caption">{image.caption}</span>
              </button>
            </section>
          );
        })}

        <section className="case-section case-architecture container">
          <p className="case-section-label">06 / Technology &amp; Architecture</p>
          <div className="case-section-copy">
            <h2>Technology &amp; Architecture</h2>
            <p>The site is built with a responsive frontend-focused stack.</p>
          </div>
          <div className="architecture-grid">
            <section className="architecture-group">
              <h3>Technologies</h3>
              <p>{project.technologies.join(" · ")}</p>
            </section>
          </div>
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">07 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              TOP G is currently in development. Core website pages and
              customer-facing features are being implemented and refined for
              the business.
            </p>
          </div>
          <dl className="case-status-grid">
            <div>
              <dt>Website Development</dt>
              <dd>In Development</dd>
            </div>
          </dl>
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
          aria-label="Top G project image viewer"
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