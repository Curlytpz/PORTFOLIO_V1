import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { traceProject as project } from "../data/trace.js";

const featureSections = [
  {
    number: "02",
    label: "Investigation Workspace",
    title: "Structured Investigation Workflow",
    description:
      "Developers can frame a technical problem, record relevant context and technology tags, then return to persisted investigations through a clear history and status workflow.",
    imageIndexes: [0, 1],
  },
  {
    number: "03",
    label: "Knowledge Source Management",
    title: "Evidence Source Library",
    description:
      "Documentation, error logs, and technical notes can be stored as scoped knowledge sources so investigation evidence stays organized, inspectable, and reusable.",
    imageIndexes: [2],
  },
  {
    number: "04",
    label: "Controlled Ingestion",
    title: "Traceable Knowledge Ingestion",
    description:
      "TRACE breaks source content into ordered, traceable chunks and supports re-ingestion when a source changes, helping keep retrieval tied to the current underlying evidence.",
    imageIndexes: [3],
  },
  {
    number: "05",
    label: "Hybrid Evidence Search",
    title: "Keyword, Semantic, and Hybrid Retrieval",
    description:
      "Search combines PostgreSQL full-text retrieval with opt-in semantic retrieval and Reciprocal Rank Fusion, while retaining a keyword-only path when an embedding provider is unavailable.",
    imageIndexes: [4],
  },
  {
    number: "06",
    label: "Evidence-Grounded AI Analysis",
    title: "Scoped, Citation-Aware Analysis",
    description:
      "The analysis endpoint retrieves evidence within the current investigation and validates returned citations against those source chunks. Mocked tests cover that workflow; live Gemini structured-answer generation remains an opt-in capability pending controlled verification.",
    imageIndexes: [],
  },
];

const technicalOverview = [
  {
    label: "Frontend",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "TypeScript", "Zod"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Prisma ORM"],
  },
  {
    label: "Retrieval",
    items: ["Keyword search", "Semantic retrieval", "Hybrid RRF"],
  },
  {
    label: "AI & Testing",
    items: ["Gemini embeddings", "Evidence-scoped analysis", "Vitest", "Supertest"],
  },
];

function DetailGrid({ groups }) {
  return (
    <div className="architecture-grid" aria-label="TRACE technical overview">
      {groups.map((group) => (
        <section className="architecture-group" key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.items.join(" · ")}</p>
        </section>
      ))}
    </div>
  );
}

function TraceFeatureSection({ section, onOpen }) {
  const images = section.imageIndexes.map((index) => project.images[index]);

  return (
    <section className="case-section case-section--showcase container">
      <p className="case-section-label">
        {section.number} / {section.label}
      </p>
      <div className="case-section-copy">
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      {images.length ? (
        <div className="trace-feature-media-stack">
          {images.map((image) => {
            const imageIndex = project.images.findIndex(({ id }) => id === image.id);
            return (
              <button
                className="case-image-button"
                key={image.id}
                type="button"
                onClick={() => onOpen(imageIndex)}
                aria-label={`Open ${image.caption} image`}
              >
                <ThemeAwareImage
                  media={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
                <span className="case-image-caption">{image.caption}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

export default function Trace() {
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
          <p className="case-header-label">Independent full-stack project</p>
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
            <h2>Developer-Focused Investigation</h2>
            <p>{project.overview}</p>
          </div>
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        {featureSections.map((section) => (
          <TraceFeatureSection
            key={section.number}
            section={section}
            onOpen={setLightboxIndex}
          />
        ))}

        <section className="case-section case-section--text container">
          <p className="case-section-label">07 / Problem &amp; Solution</p>
          <div className="case-section-copy">
            <h2>Problem &amp; Solution</h2>
            <p>
              <strong>Problem.</strong> Troubleshooting information often ends up
              scattered across logs, documentation, and remembered context, making
              it hard to reconnect evidence to the exact issue being investigated.
            </p>
            <p>
              <strong>Solution.</strong> TRACE centralizes investigations and
              source material, then retrieves investigation-scoped evidence through
              keyword, semantic, or hybrid search before analysis is requested.
            </p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">08 / Technical Overview</p>
          <div className="case-section-copy">
            <h2>Technical Overview</h2>
            <p>
              A typed React and Express application pairs persisted investigations
              with controlled knowledge ingestion and layered evidence retrieval.
            </p>
          </div>
          <DetailGrid groups={technicalOverview} />
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">09 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              Investigation persistence, source ingestion, and retrieval workflows
              are implemented. Live Gemini answer generation, access control, and
              production deployment remain under development and verification.
            </p>
          </div>
          <dl className="case-status-grid case-status-grid--trace">
            <div>
              <dt>Investigation &amp; Ingestion</dt>
              <dd>Implemented</dd>
            </div>
            <div>
              <dt>Keyword &amp; Hybrid Retrieval</dt>
              <dd>Implemented</dd>
            </div>
            <div>
              <dt>Evidence-Grounded AI Analysis</dt>
              <dd>Mocked Tests / Live Verification Pending</dd>
            </div>
            <div>
              <dt>Access Control &amp; Deployment</dt>
              <dd>In Development</dd>
            </div>
          </dl>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">10 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>
              Building TRACE strengthened my understanding of typed full-stack
              architecture, controlled RAG ingestion, and retrieval tradeoffs. It
              also reinforced the importance of grounding AI-assisted workflows in
              traceable evidence and clearly separating verified behavior from work
              still being validated.
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
          aria-label="TRACE project image viewer"
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
