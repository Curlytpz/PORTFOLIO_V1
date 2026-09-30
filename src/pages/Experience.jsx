import Footer from "../components/Footer.jsx";

const experiences = [
  {
    title: "Project Developer — SEA-IT-SOLVED",
    context: "Academic Thesis / Capstone · 2026 — Present",
    description: [
      "Developing the software system for an automated lecture capturing and documentation platform for mathematics education. Responsible for the full-stack web application, including the user interface, backend APIs, database, authentication, AI integration, media processing, security, and system architecture.",
      "The system uses AI-assisted processing to transform captured lecture content into structured learning materials and assessments. Team members contribute to hardware integration, system testing, and research documentation.",
    ],
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "AI Integration",
      "REST API",
      "Git",
    ],
  },
  {
    title: "Independent Web Development",
    context: "Personal Projects · 2026 — Present",
    description: [
      "Building full-stack web applications to strengthen practical experience in frontend and backend development. Projects involve responsive interfaces, API integration, databases, authentication, interactive components, and deployment.",
      "I use AI-assisted development as part of my workflow for prototyping, debugging, and iteration while strengthening my understanding of the technologies and code I use.",
    ],
    tags: [
      "React",
      "JavaScript",
      "Node.js",
      "PostgreSQL",
      "REST API",
      "Git",
      "GitHub",
    ],
  },
];

export default function Experience() {
  return (
    <>
      <main className="simple-page experience-page container">
        <p className="case-section-label">Experience</p>
        <h1>Experience</h1>
        <p className="experience-intro">
          Academic and independent development work that reflects my current
          hands-on experience.
        </p>

        <ol className="experience-timeline">
          {experiences.map((experience) => (
            <li className="experience-item" key={experience.title}>
              <article className="experience-entry">
                <p className="experience-context">{experience.context}</p>
                <h2>{experience.title}</h2>
                <div className="experience-description">
                  {experience.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul
                  className="tech-pills"
                  aria-label={`${experience.title} technologies`}
                >
                  {experience.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </main>
      <div className="page-footer">
        <Footer />
      </div>
    </>
  );
}
