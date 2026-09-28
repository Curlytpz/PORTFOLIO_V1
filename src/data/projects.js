// Single source of truth for project data.
// To add another project later, add another object to this array.
// The Projects component uses .map() to render each one.

const projects = [
  {
    id: 1,
    number: "01",
    title: "Sea-It-Solved",
    subtitle: "Automated Lecture Capturing & Documentation System",
    year: "2026",
    status: "In Development",
    categories: ["AI", "Computer Vision", "Web Development"],
    description:
      "Sea-It-Solved is a thesis project designed to capture whiteboard lectures and transform them into structured digital notes using computer vision and artificial intelligence.",
    // Internal route (React Router will handle navigation)
    link: "/projects/sea-it-solved",
  },
];

export default projects;