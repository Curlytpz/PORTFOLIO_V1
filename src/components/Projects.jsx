import projects from "../data/projects.js";
import ProjectItem from "./ProjectItem.jsx";

export default function Projects() {
  return (
    <section id="work" className="work container">
      <h2 className="section-label">02 — Selected Work</h2>

      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </section>
  );
}
