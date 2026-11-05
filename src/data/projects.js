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
      "Live / Deployed",
      "Hardware Integration In Development",
    ],
    categories: ["AI", "Computer Vision", "Full-Stack Development"],
    description:
      "A role-based full-stack thesis system that captures mathematics lectures, supports instructor-reviewed lesson context, and produces structured learning materials and assessment workflows.",
    link: "/projects/sea-it-solved",
    liveUrl: "https://sea-it-solved.vercel.app",
    githubUrl: "https://github.com/Curlytpz/SEA-IT-SOLVED",
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
  {
    id: "trace",
    number: "04",
    title: "TRACE",
    subtitle: "Agentic RAG Investigation Workspace",
    year: "2026",
    status: ["In Development"],
    categories: [
      "React",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Gemini API",
      "RAG",
    ],
    description:
      "An AI-powered investigation workspace that helps developers organize technical problems, manage evidence, and retrieve relevant knowledge using keyword, semantic, and hybrid search.",
    link: "/projects/trace",
    githubUrl: "https://github.com/Curlytpz/TRACE",
  },
  {
    id: "recall",
    number: "05",
    title: "Recall",
    subtitle: "Private Family History & Memory Workspace",
    year: "2026",
    status: ["In Development"],
    categories: ["React", "TypeScript", "Express.js", "PostgreSQL", "Prisma ORM"],
    description:
      "A private family history workspace for preserving people, relationship records, stories, photos, invitations, and source-grounded family discovery.",
    link: "/projects/recall",
  },
];

export default projects;
