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
    id: "top-garage",
    number: "02",
    title: "TOP-G Auto Seat",
    subtitle: "Full-Stack Business Website & Management System",
    year: "2026",
    status: ["Live / Deployed"],
    categories: ["React", "Express.js", "PostgreSQL", "Prisma ORM"],
    description:
      "A full-stack business website and management system for a custom automotive upholstery business, with public service and material pages, quotation requests, project galleries, and a protected admin dashboard.",
    link: "/projects/top-garage",
    liveUrl: "https://topgautoseat.vercel.app",
    githubUrl: "https://github.com/Curlytpz/TOP-G",
  },
  {
    id: "personal-portfolio",
    number: "03",
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
