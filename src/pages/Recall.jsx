import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import ProjectDemoVideo from "../components/ProjectDemoVideo.jsx";
import ThemeAwareImage from "../components/ThemeAwareImage.jsx";
import { recallProject as project } from "../data/recall.js";

const featureSections = [
  {
    number: "02",
    label: "Family Workspace",
    title: "A Calm Home for Family Context",
    description:
      "The main workspace brings people, family connections, stories, and next steps into one private place, helping families continue their records at their own pace.",
    imageIndexes: [0],
  },
  {
    number: "03",
    label: "Family Tree",
    title: "Relationship-Centered Family Tree",
    description:
      "Families can explore maternal, paternal, full, and person-centered views while keeping connections tied to saved relationship records instead of inferred information.",
    imageIndexes: [1],
  },
  {
    number: "04",
    label: "Stories & Photos",
    title: "Preserving Family Memories",
    description:
      "Stories, people, and photographs can be documented together so a family history stays connected to the people and moments it describes.",
    imageIndexes: [2],
  },
  {
    number: "05",
    label: "Ask Recall",
    title: "Source-Grounded Family Assistant",
    description:
      "Ask Recall helps people explore saved family context through relationship paths and local retrieval. Answers remain scoped to the current family workspace and connect back to supporting records.",
    imageIndexes: [3, 4],
  },
  {
    number: "06",
    label: "Private Sharing",
    title: "Invitations and Family Roles",
    description:
      "Owners can invite trusted family members with clear roles, while membership and workspace isolation help keep shared family records private and controlled.",
    imageIndexes: [5],
  },
];

const technicalOverview = [
  { label: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "TypeScript", "Zod"] },
  { label: "Data", items: ["PostgreSQL", "Prisma ORM"] },
  { label: "Privacy", items: ["Authenticated workspaces", "CSRF protection", "Role-based access"] },
  { label: "Quality", items: ["Vitest", "Supertest", "Playwright"] },
];

function DetailGrid({ groups }) {
  return (
    <div className="architecture-grid" aria-label="Recall technical overview">
      {groups.map((group) => (
        <section className="architecture-group" key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.items.join(" · ")}</p>
        </section>
      ))}
    </div>
  );
}

function RecallFeatureSection({ section, onOpen }) {
  const images = section.imageIndexes.map((index) => project.images[index]);

  return (
    <section className="case-section case-section--showcase container">
      <p className="case-section-label">{section.number} / {section.label}</p>
      <div className="case-section-copy">
        <h2>{section.title}</h2>
        <p>{section.description}</p>
      </div>
      <div className="recall-feature-media-stack">
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
              <ThemeAwareImage media={image.src} alt={image.alt} loading="lazy" />
              <span className="case-image-caption">{image.caption}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function Recall() {
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
      if (event.key === "ArrowLeft") setLightboxIndex((current) => (current - 1 + project.images.length) % project.images.length);
      if (event.key === "ArrowRight") setLightboxIndex((current) => (current + 1) % project.images.length);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousTriggerRef.current?.focus?.();
    };
  }, [lightboxIndex]);

  return (
    <>
      <main className="case-study-page">
        <header className="case-header container">
          <Link to="/#work" className="back-link">← Back to projects</Link>
          <p className="case-header-label">Independent full-stack project</p>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-subtitle">{project.subtitle}</p>
          <p className="case-meta-line">{project.year} · {project.context} · {project.status}</p>
          <ul className="case-header-tech" aria-label="Project technologies">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </header>

        <section className="case-section case-section--hero container">
          <p className="case-section-label">01 / Overview</p>
          <div className="case-section-copy">
            <h2>Private Family History, Built for Continuity</h2>
            <p>{project.overview}</p>
          </div>
          <ProjectDemoVideo demo={project.demo} autoPlayWhenVisible />
        </section>

        {featureSections.map((section) => <RecallFeatureSection key={section.number} section={section} onOpen={setLightboxIndex} />)}

        <section className="case-section case-section--text container">
          <p className="case-section-label">07 / Problem &amp; Solution</p>
          <div className="case-section-copy">
            <h2>Problem &amp; Solution</h2>
            <p><strong>Problem.</strong> Family stories, photos, and relationship details are often spread across conversations, paper records, and disconnected files, making them difficult to preserve and share safely.</p>
            <p><strong>Solution.</strong> Recall gives each family an authenticated workspace for people, connections, stories, private media, and source-grounded discovery without treating personal family details as public content.</p>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">08 / Technical Overview</p>
          <div className="case-section-copy">
            <h2>Technical Overview</h2>
            <p>A typed React and Express application combines private family workspaces, PostgreSQL persistence, and deliberate privacy controls.</p>
          </div>
          <DetailGrid groups={technicalOverview} />
        </section>

        <section className="case-section case-status container">
          <p className="case-section-label">09 / Project Status</p>
          <div className="case-section-copy">
            <h2>Project Status</h2>
            <p>Core family workspaces, relationship records, stories, private uploads, invitations, and the source-grounded assistant are implemented. Public-launch readiness remains under development while infrastructure and privacy verification continue.</p>
          </div>
          <dl className="case-status-grid">
            <div><dt>Family Workspace &amp; Records</dt><dd>Implemented</dd></div>
            <div><dt>Private Sharing &amp; Assistant</dt><dd>Implemented</dd></div>
            <div><dt>Public Launch Readiness</dt><dd>In Development</dd></div>
            <div><dt>Privacy &amp; Recovery Verification</dt><dd>In Progress</dd></div>
          </dl>
        </section>

        <section className="case-section case-section--text container">
          <p className="case-section-label">10 / What I Learned</p>
          <div className="case-section-copy">
            <h2>What I Learned</h2>
            <p>Building Recall strengthened my approach to privacy-first product design, relationship data modeling, and access control. It also taught me to make assistant features useful without overstating what they know or sending family information outside the workspace by default.</p>
          </div>
        </section>
      </main>

      <div className="page-footer"><Footer /></div>

      {lightboxIndex !== null ? (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label="Recall project image viewer" onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}>
          <button ref={closeButtonRef} className="project-lightbox__close" type="button" onClick={() => setLightboxIndex(null)} aria-label="Close image viewer">×</button>
          <button className="project-lightbox__control project-lightbox__control--previous" type="button" onClick={() => setLightboxIndex((current) => (current - 1 + project.images.length) % project.images.length)} aria-label="Previous image">←</button>
          <figure className="project-lightbox__figure">
            <ThemeAwareImage media={project.images[lightboxIndex].src} alt={project.images[lightboxIndex].alt} />
            <figcaption>{project.images[lightboxIndex].caption}</figcaption>
          </figure>
          <button className="project-lightbox__control project-lightbox__control--next" type="button" onClick={() => setLightboxIndex((current) => (current + 1) % project.images.length)} aria-label="Next image">→</button>
        </div>
      ) : null}
    </>
  );
}
