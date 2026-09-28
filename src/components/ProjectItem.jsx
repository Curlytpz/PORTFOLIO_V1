// ProjectItem renders ONE project entry.
// It receives the project as a "prop" — a piece of data
// passed in from the parent (Projects).

import { Link } from "react-router-dom";

export default function ProjectItem({ project }) {
  return (
    <article className="project">
      <div className="project-meta-top">
        <span className="project-number">{project.number}</span>
        <span className="project-year">{project.year}</span>
      </div>

      <h3 className="project-title">
        {/* Link to the case-study route */}
        <Link to={project.link}>{project.title}</Link>
      </h3>

      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>

      <div className="project-meta-bottom">
        <div className="project-tags">
          {/* Join categories with a middle-dot separator */}
          {project.categories.map((category, index) => (
            <span key={category}>
              {category}
              {index < project.categories.length - 1 && (
                <span aria-hidden="true"> · </span>
              )}
            </span>
          ))}
        </div>

        <div className="project-status">
          <span className="status-badge">{project.status}</span>
          <Link to={project.link} className="project-link">
            View project <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}