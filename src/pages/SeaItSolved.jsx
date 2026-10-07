import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CaseStudyFeatureSection from "../components/CaseStudyFeatureSection.jsx";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { seaItSolvedProject as project } from "../data/seaItSolved.js";

const featureImages = project.images.slice(1);

const featureSections = [
  {
    number: "02",
    label: "Authentication / Access",
    title: "Role-Based System Access",
    description:
      "Students, instructors, and administrators enter through dedicated role-based workflows, with authentication and backend authorization protecting the tools available to each user.",
    imageIndex: 0,
  },
  {
    number: "03",
    label: "Instructor Workspace",
    title: "Instructor Workspace",
    description:
      "Instructors can manage sections and lessons, review student activity, and move captured classroom content through the lesson and assessment workflow.",
    imageIndex: 1,
  },
  {
    number: "04",
    label: "Hardware Settings",
    title: "Hardware Settings & Calibration",
    description:
      "The hardware workspace provides camera calibration, classroom lighting, and microphone controls that prepare the system for lecture and whiteboard capture.",
    imageIndex: 2,
  },
  {
    number: "05",
    label: "AI-Assisted Lesson Materials",
    title: "AI-Assisted Lesson Materials",
    description:
      "Approved lesson context can be organized into structured learning materials and quiz drafts with Gemini assistance while the instructor remains responsible for review and publication.",
    imageIndex: 3,
  },
  {
    number: "06",
    label: "Assessments",
    title: "Assessment Analytics",
    description:
      "Assessment results help instructors review student performance, question-level response patterns, and areas that may need additional teaching attention.",
    imageIndex: 4,
  },
];

const technicalOverview = [
  {
    label: "Application",
    items: ["React/Vite frontend", "Node.js/Express API", "REST endpoints"],
  },
  {
    label: "Data & Processing",
    items: ["PostgreSQL/Supabase", "FFmpeg/FFprobe", "Background workers where implemented"],
  },
  {
    label: "AI",
    items: ["Gemini 2.5 Flash", "Instructor-reviewed context and output"],
  },
  {
    label: "Security",
    items: ["JWT", "Role-based authorization", "Protected routes", "Verification and rate limiting"],
  },
  {
    label: "Deployment",
    items: ["Vercel frontend", "Render backend", "Gmail API verification"],
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
            : (current - 1 + featureImages.length) % featureImages.length
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % featureImages.length
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
        : (current - 1 + featureImages.length) % featureImages.length
    );
  const nextImage = () =>
    setLightboxIndex((current) =>
      current === null ? null : (current + 1) % featureImages.length
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
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        {featureSections.map((section) => (
          <CaseStudyFeatureSection
            key={section.number}
            number={section.number}
            label={section.label}
            title={section.title}
            description={section.description}
            image={featureImages[section.imageIndex]}
            onOpen={() => setLightboxIndex(section.imageIndex)}
          />
        ))}

        <section className="case-section case-section--text container">
          <p className="case-section-label">07 / Problem &amp; Solution</p>
          <div className="case-section-copy">
            <h2>Problem &amp; Solution</h2>
            <p>
              <strong>Problem.</strong> Important whiteboard content can disappear
              after class, while students may miss multi-step mathematics and
              instructors spend additional time preparing notes and assessments.
            </p>
            <p>
              <strong>Solution.</strong> Sea-It-Solved connects classroom capture,
              instructor-reviewed lesson context, AI-assisted materials,
              assessments, and student access in one role-based workflow.
            </p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">08 / Technical Overview</p>
          <div className="case-section-copy">
            <h2>Technical Overview</h2>
            <p>
              A compact full-stack architecture supports classroom workflows,
              media processing, reviewed AI assistance, and protected user roles.
            </p>
          </div>
          <DetailGrid
            groups={technicalOverview}
            label="Sea-It-Solved technical overview"
          />
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">09 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>
              The software workflow is functional while physical classroom
              hardware integration remains under active development.
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

        <section className="case-section case-section--text container">
          <p className="case-section-label">10 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>
              Building Sea-It-Solved taught me how to connect a larger role-based
              frontend, API, database, media pipeline, and AI workflow. I also
              learned to keep instructors in control while coordinating software
              and hardware integration with a thesis team.
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
              media={featureImages[lightboxIndex].src}
              alt={featureImages[lightboxIndex].alt}
            />
            <figcaption>{featureImages[lightboxIndex].caption}</figcaption>
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
