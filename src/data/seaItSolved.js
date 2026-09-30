import aiWorkspaceImage from "../assets/ai-workspace.png.png";
import hardwareSettingsImage from "../assets/hardware-settings.png.png";
import heroImage from "../assets/hero.png.png";
import instructorDashboardImage from "../assets/instructor-dashboard.png.png";
import quizImage from "../assets/quiz.png.png";
import signinImage from "../assets/signin.png.png";

export const seaItSolvedProject = {
  title: "Sea-It-Solved",
  subtitle: "Automated Lecture Capturing & Documentation System",
  year: "2026",
  context: "Academic Thesis / Capstone",
  status: "Software Functional / Hardware Integration In Development",
  visitUrl: "",
  technologies: [
    "React",
    "Vite",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Supabase",
    "Gemini 2.5 Flash",
    "FFmpeg",
    "REST API",
  ],
  architecture: [
    {
      label: "Frontend",
      items: [
        "React",
        "Vite",
        "JavaScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Lucide Icons",
        "Framer Motion",
      ],
    },
    { label: "Backend", items: ["Node.js", "Express.js"] },
    { label: "Database", items: ["PostgreSQL", "Supabase"] },
    { label: "AI", items: ["Google Gemini 2.5 Flash"] },
    { label: "Authentication", items: ["JWT"] },
    { label: "Email Verification", items: ["Gmail API", "OAuth 2.0"] },
    { label: "Media Processing", items: ["FFmpeg", "FFprobe"] },
    { label: "Deployment", items: ["Vercel", "Render"] },
    { label: "Version Control", items: ["Git", "GitHub"] },
    {
      label: "Storage",
      items: ["Local storage adapter", "Planned Supabase Storage"],
    },
    { label: "API", items: ["REST API"] },
    {
      label: "Security",
      items: ["SHA-256 hashing", "Rate limiting", "Role-based access control"],
    },
    {
      label: "Testing",
      items: ["Node.js test suites", "Frontend UX tests"],
    },
    {
      label: "Architecture",
      items: [
        "React frontend",
        "Express backend",
        "PostgreSQL database",
        "Background workers",
      ],
    },
  ],
  images: [
    {
      src: heroImage,
      alt: "Sea-It-Solved application overview showing the main system interface",
      caption: "Sea-It-Solved project overview",
    },
    {
      src: signinImage,
      alt: "Sea-It-Solved sign-in screen for student, instructor, and administrator access",
      caption: "System access",
    },
    {
      src: instructorDashboardImage,
      alt: "Sea-It-Solved instructor dashboard with class and lesson management tools",
      caption: "Instructor workspace",
    },
    {
      src: hardwareSettingsImage,
      alt: "Sea-It-Solved classroom camera, lighting, and microphone settings",
      caption: "Hardware integration settings",
    },
    {
      src: aiWorkspaceImage,
      alt: "Sea-It-Solved AI lesson workspace using approved lesson context",
      caption: "AI-assisted lesson materials",
    },
    {
      src: quizImage,
      alt: "Sea-It-Solved assessment editor with questions and answer choices",
      caption: "Generated assessments",
    },
  ],
};
