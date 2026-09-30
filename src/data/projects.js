// Single source of truth for project data.
// To add another project later, add another object to this array.

const projects = [
  {
    id: "sea-it-solved",
    number: "01",
    title: "Sea-It-Solved",
    subtitle: "Automated Lecture Capturing & Documentation System",
    year: "2026",
    status: [
      "Software Functional",
      "Hardware Integration In Development",
    ],
    categories: ["AI", "Computer Vision", "Full-Stack Development"],
    description:
      "Sea-It-Solved is an academic thesis project designed to capture mathematics lectures and transform lecture content into structured digital learning materials using computer vision, media processing, and artificial intelligence.",
    link: "/projects/sea-it-solved",
  },
  {
    id: "personal-portfolio",
    number: "02",
    title: "Personal Portfolio",
    subtitle: "Personal Project",
    year: "2026",
    status: ["Personal Project"],
    categories: [
      "React",
      "JavaScript",
      "Music Player",
      "Local Portfolio Chatbot",
      "Stack Game",
      "Theme Controls",
      "Animations",
      "ReactBits",
      "Responsive Layout",
      "Custom Loading Animation",
    ],
    description:
      "A responsive personal portfolio built to showcase my projects, technical experience, and development work. It includes an interactive music player, portfolio chatbot, Stack mini-game, theme controls, custom loading animations, responsive layouts, and interface animations.",
    link: "",
  },
];

export default projects;
