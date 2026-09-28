// Projects renders the "Selected Work" section.
// It imports the project data and maps over it,
// rendering one <ProjectItem /> per project.

import projects from "../data/projects.js";
import ProjectItem from "./ProjectItem.jsx";

export default function Projects() {
  return (
    <section id="work" className="work container">
      <h2 className="section-label">Selected Work</h2>

      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </section>
  );
}