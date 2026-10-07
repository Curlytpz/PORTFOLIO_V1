import aiWorkspaceImage from "../assets/ai-workspace.png.png";
import aiWorkspaceDarkImage from "../assets/sea-it-solved/ai-lesson-materials-dark.png";
import hardwareSettingsImage from "../assets/hardware-settings.png.png";
import hardwareSettingsDarkImage from "../assets/sea-it-solved/hardware-settings-dark.png";
import heroImage from "../assets/hero.png.png";
import instructorDashboardImage from "../assets/instructor-dashboard.png.png";
import instructorDashboardDarkImage from "../assets/sea-it-solved/instructor-dashboard-dark.png";
import quizImage from "../assets/quiz.png.png";
import quizDarkImage from "../assets/sea-it-solved/assessments-dark.png";
import signinImage from "../assets/signin.png.png";
import signinDarkImage from "../assets/sea-it-solved/system-access-dark.png";

export const seaItSolvedProject = {
  title: "Sea-It-Solved",
  subtitle: "Automated Lecture Capturing & Documentation System",
  year: "2026",
  context: "Academic Thesis / Capstone",
  status: "Software Live / Hardware Integration In Development",
  visitUrl: "https://sea-it-solved.vercel.app",
  githubUrl: "https://github.com/Curlytpz/SEA-IT-SOLVED",
  overview:
    "Sea-It-Solved is an automated lecture capturing and documentation system designed for mathematics-focused classroom workflows. It connects classroom evidence, instructor review, AI-assisted content generation, assessments, and student access in one role-based platform.",
  problem:
    "Important whiteboard content can disappear after class, and students may miss multi-step mathematical discussions. Instructors also spend substantial time manually preparing notes and assessments, while ordinary lecture capture does not organize classroom evidence into usable learning materials.",
  solution:
    "Sea-It-Solved combines classroom capture, instructor-reviewed lesson context, AI-assisted material and quiz generation, assessment workflows, and student access. The instructor remains in the review loop before generated materials are approved or published.",
  role:
    "I lead the software development of Sea-It-Solved across the frontend, backend, database, authentication, AI integration, media processing, security, system integration, and debugging.",
  roleNote:
    "I collaborate with my teammates on hardware testing, research, and thesis documentation while coordinating the software and hardware integration work.",
  demo: {
    src: {
      light: "/assets/demos/sea-it-solved-demo.mp4",
      dark: null,
    },
    poster: {
      light: heroImage,
      dark: null,
    },
    title: "Sea-It-Solved system demo",
  },
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
  featureGroups: [
    {
      label: "Role-Based Access",
      items: ["Student workflows", "Instructor workflows", "Administrator workflows"],
    },
    {
      label: "Classroom & Lesson Management",
      items: ["Class sections", "Join codes", "Lessons", "Instructor workspace"],
    },
    {
      label: "Capture & Hardware",
      items: ["Camera", "Microphone", "Calibration", "Hardware settings"],
    },
    {
      label: "AI-Assisted Learning",
      items: ["Instructor-reviewed context", "Gemini-assisted materials", "Quiz generation"],
    },
    {
      label: "Assessment",
      items: ["Student quizzes", "Problem-solving submissions", "Results and analytics"],
    },
    {
      label: "Security",
      items: ["JWT authentication", "Backend authorization", "Verification", "Rate limiting"],
    },
  ],
  workflow: [
    "Instructor creates lesson",
    "Hardware and preflight setup",
    "Classroom capture",
    "Media and recognition processing",
    "Instructor reviews lesson context",
    "AI-assisted material generation",
    "Instructor approval",
    "Student access",
    "Quiz and assessment",
    "Results and analytics",
  ],
  architecture: [
    {
      label: "Frontend",
      items: ["React", "Vite", "JavaScript", "Tailwind CSS", "shadcn/ui", "Lucide", "Framer Motion"],
    },
    { label: "Backend", items: ["Node.js", "Express.js"] },
    { label: "Database", items: ["PostgreSQL", "Supabase"] },
    { label: "AI", items: ["Gemini 2.5 Flash"] },
    { label: "Authentication", items: ["JWT"] },
    { label: "Email Verification", items: ["Gmail API", "OAuth 2.0"] },
    { label: "Media Processing", items: ["FFmpeg", "FFprobe"] },
    { label: "Deployment", items: ["Vercel", "Render"] },
    { label: "Version Control", items: ["Git", "GitHub"] },
    { label: "API", items: ["REST API"] },
    { label: "Background Processing", items: ["Background workers where implemented"] },
    {
      label: "Storage",
      items: ["Local storage adapter", "Supabase media storage remains planned"],
    },
  ],
  aiAndSecurity: [
    {
      label: "Responsible AI",
      items: [
        "Instructor remains in the review loop",
        "Generated content may contain errors",
        "AI assists rather than acts as an autonomous authority",
        "Transparency, accountability, fairness, robustness, privacy, and safety",
      ],
    },
    {
      label: "Application Security",
      items: [
        "JWT authentication",
        "Role-based authorization",
        "Protected backend routes",
        "Hashed verification codes",
        "Rate limiting",
        "HTTPS",
        "Environment-variable secrets",
        "Supabase RLS where configured",
      ],
    },
  ],
  deployment: [
    { label: "Frontend", value: "Live on Vercel" },
    { label: "Backend", value: "Live on Render" },
    { label: "Database", value: "Supabase PostgreSQL" },
    { label: "AI Service", value: "Gemini 2.5 Flash" },
    { label: "Email", value: "Gmail API" },
  ],
  images: [
    {
      src: { light: heroImage, dark: null },
      alt: "Sea-It-Solved application overview showing the main system interface",
      caption: "Sea-It-Solved system overview",
    },
    {
      src: { light: signinImage, dark: signinDarkImage },
      alt: "Sea-It-Solved sign-in screen for student, instructor, and administrator access",
      caption: "Role-Based System Access",
    },
    {
      src: {
        light: instructorDashboardImage,
        dark: instructorDashboardDarkImage,
      },
      alt: "Sea-It-Solved instructor dashboard with class and lesson management tools",
      caption: "Instructor Dashboard",
    },
    {
      src: { light: hardwareSettingsImage, dark: hardwareSettingsDarkImage },
      alt: "Sea-It-Solved classroom camera, lighting, and calibration settings",
      caption: "Hardware Settings & Calibration",
    },
    {
      src: { light: aiWorkspaceImage, dark: aiWorkspaceDarkImage },
      alt: "Sea-It-Solved AI lesson workspace using approved lesson context",
      caption: "AI-Assisted Lesson Materials",
    },
    {
      src: { light: quizImage, dark: quizDarkImage },
      alt: "Sea-It-Solved quiz results and assessment analytics interface",
      caption: "Assessment Analytics",
    },
  ],
};