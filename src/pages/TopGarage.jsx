import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaseStudyFeatureSection from "../components/CaseStudyFeatureSection.jsx";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { topGarageProject as project } from "../data/topGarage.js";

const featureSections = [
  {
    number: "02",
    label: "Services",
    title: "Services",
    description:
      "The services experience presents the business's confirmed automotive upholstery options, including seat covers, door sidings, ceiling work, and installation support.",
    imageIndex: 0,
  },
  {
    number: "03",
    label: "About",
    title: "About the Business",
    description:
      "The About page introduces TOP-G's custom approach, service area, operating information, warranty details, and customer-focused business identity.",
    imageIndex: 1,
  },
  {
    number: "04",
    label: "Contact",
    title: "Contact & Location",
    description:
      "Customers can find the business phone numbers, email address, operating hours, and mapped shop location before starting a quotation or visit.",
    imageIndex: 2,
  },
  {
    number: "05",
    label: "Materials",
    title: "Leather Materials",
    description:
      "Dedicated material presentation helps customers compare confirmed leather options, appearance, and warranty information before discussing their vehicle build.",
    imageIndex: 3,
  },
];

const technicalOverview = [
  {
    label: "Application",
    items: ["React/Vite frontend", "Express REST API", "Prisma ORM"],
  },
  {
    label: "Data & Media",
    items: ["Supabase PostgreSQL", "Cloudinary project images"],
  },
  {
    label: "Production Architecture",
    items: ["Vercel frontend → Render API → Prisma → Supabase PostgreSQL"],
  },
  {
    label: "Security",
    items: ["Protected admin authentication", "Cloudflare Turnstile", "Server-side validation"],
  },
];
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
          </div>
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        {featureSections.map((section) => (
          <CaseStudyFeatureSection
            key={section.number}
            number={section.number}
            label={section.label}
            title={section.title}
            description={section.description}
            image={project.images[section.imageIndex]}
            onOpen={() => setLightboxIndex(section.imageIndex)}
          />
        ))}

        <section className="case-section case-section--text container">
          <p className="case-section-label">06 / Problem &amp; Solution</p>
          <div className="case-section-copy">
            <h2>Problem &amp; Solution</h2>
            <p>
              <strong>Problem.</strong> TOP-G needed one professional place to
              present its upholstery work, collect detailed quotation requests,
              and manage customer inquiries and published projects.
            </p>
            <p>
              <strong>Solution.</strong> The system combines a responsive public
              website with a protected dashboard for quotations, project media,
              publishing, and customer follow-up.
            </p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">07 / Technical Overview</p>
          <div className="case-section-copy">
            <h2>Technical Overview</h2>
            <p>
              The frontend, API, database, media service, and security controls
              form one compact full-stack business system.
            </p>
          </div>
          <DetailGrid groups={technicalOverview} label="TOP-G technical overview" />
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">08 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              Core customer-facing pages and management features are implemented
              while the website continues to be refined for the business.
            </p>
          </div>
          <dl className="case-status-grid case-status-grid--single">
            <div>
              <dt>Website Development</dt>
              <dd>In Development</dd>
            </div>
          </dl>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">09 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>
              Building TOP-G taught me how to translate a real business workflow
              into a complete frontend, API, database, media, and admin system. I
              also gained practical experience securing and deploying services
              that must work together reliably.
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
