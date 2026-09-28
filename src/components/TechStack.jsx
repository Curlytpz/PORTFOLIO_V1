// TechStack renders your "02 — Tech Stack" section.
// The data lives in a local array here because it's only used
// on this page. If you ever reuse it elsewhere, move it to data/.

// Each group is an object: { label, items }
// .map() loops over the groups and renders one block per group.
const groups = [
  {
    label: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "Supabase", "JWT", "REST"],
  },
  {
    label: "Developer Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "OpenCode",
      "Discord",
      "Figma",
      "Canva",
    ],
  },
];

export default function TechStack() {
  return (
    <section className="tech-stack container">
      <p className="case-section-label">02 — Tech Stack</p>

      {groups.map((group) => (
        <div className="tech-group" key={group.label}>
          <h3 className="tech-group-label">{group.label}</h3>
          <ul className="tech-pills">
            {/* .map() turns each string into an <li>.
                "key" helps React track items between renders. */}
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}