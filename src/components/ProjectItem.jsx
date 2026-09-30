import { Link } from "react-router-dom";

export default function ProjectItem({ project }) {
  const statuses = Array.isArray(project.status)
    ? project.status
    : project.status
      ? [project.status]
      : [];

  return (
    <article className="project" aria-labelledby={`project-${project.id}`}>
      <div className="project-meta-top">
        <span className="project-number">{project.number}</span>
        <span className="project-year">{project.year}</span>
      </div>

      <h3 className="project-title" id={`project-${project.id}`}>
        {project.link ? (
          <Link to={project.link}>{project.title}</Link>
        ) : (
          project.title
        )}
      </h3>

      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>

      <div className="project-meta-bottom">
        <div className="project-tags">
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
          <div className="project-status-list" aria-label="Project status">
            {statuses.map((status) => (
              <span className="status-badge" key={status}>{status}</span>
            ))}
          </div>
          {project.link ? (
            <Link to={project.link} className="project-link">
              View project <span className="arrow">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
