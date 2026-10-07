import aboutImage from "../assets/top-g/about.png";
import aboutDarkImage from "../assets/top-g/about-dark.png";
import contactImage from "../assets/top-g/contact.png";
import contactDarkImage from "../assets/top-g/contact-dark.png";
import materialsImage from "../assets/top-g/materials.png";
import materialsDarkImage from "../assets/top-g/materials-dark.png";
import servicesImage from "../assets/top-g/services.png";
import servicesDarkImage from "../assets/top-g/services-dark.png";

export const topGarageProject = {
  title: "TOP-G Auto Seat",
  subtitle: "Full-Stack Business Website & Management System",
  year: "2026",
  context: "Independent Client Project",
  status: "Live / Deployed",
  visitUrl: "https://topgautoseat.vercel.app",
  githubUrl: "https://github.com/Curlytpz/TOP-G",
  role:
    "I designed and developed the entire system, covering planning, UI/UX, frontend development, backend APIs, database integration, authentication, the admin dashboard, security hardening, optimization, and deployment.",
  overview:
    "A full-stack business website and management system built for a custom automotive upholstery business. Customers can explore services and leather materials, view completed projects, and submit quotation requests, while the owner manages quotes, projects, images, and inquiries through a protected admin dashboard.",
  problem:
    "The business needed one professional system for presenting its upholstery work, collecting detailed quotation requests, and managing customer inquiries and published projects without relying on disconnected manual tools.",
  solution:
    "TOP-G combines a responsive public website with a protected management dashboard. The public experience supports service discovery, materials, project galleries, and quotations, while the admin workflow centralizes quote tracking and project publishing.",
  demo: {
    src: {
      light: "/assets/demos/top-g-auto-seat-demo.mp4",
      dark: "/assets/demos/top-g-auto-seat-demo-dark-20261007-032119.mp4",
    },
    poster: {
      light: servicesImage,
      dark: servicesDarkImage,
    },
    title: "TOP-G Auto Seat system overview",
  },
  technologies: [
    "React",
    "Vite",
    "JavaScript",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "Supabase",
    "Cloudinary",
    "Cloudflare Turnstile",
    "Vercel",
    "Render",
  ],
  featureGroups: [
    {
      label: "Customer Experience",
      items: [
        "Responsive business website",
        "Light and dark mode",
        "Interactive 3D TOP-G logo hero",
        "Materials pages",
        "Project gallery with before/after images",
      ],
    },
    {
      label: "Quotation Workflow",
      items: [
        "Multi-service quotation form",
        "Turnstile spam protection",
        "PostgreSQL quote storage",
        "Quote status tracking",
        "Manual email and call actions",
      ],
    },
    {
      label: "Admin Management",
      items: [
        "Secure admin authentication",
        "Quote management",
        "Project publishing and unpublishing",
        "Cloudinary image uploads",
        "Project deletion",
      ],
    },
    {
      label: "Business Content",
      items: [
        "Services and leather materials",
        "Completed upholstery projects",
        "Privacy Policy",
        "Terms & Conditions",
        "Warranty information",
      ],
    },
  ],
  techGroups: [
    { label: "Frontend", items: ["React", "Vite", "JavaScript"] },
    { label: "Backend", items: ["Express.js", "REST API", "Prisma ORM"] },
    { label: "Data", items: ["Supabase", "PostgreSQL"] },
    { label: "Media", items: ["Cloudinary"] },
    { label: "Security", items: ["Admin authentication", "Cloudflare Turnstile"] },
    { label: "Deployment", items: ["Vercel", "Render"] },
  ],
  architecture: [
    { label: "Frontend", items: ["React/Vite on Vercel"] },
    { label: "API", items: ["Express.js on Render"] },
    { label: "Data Layer", items: ["Prisma ORM", "Supabase PostgreSQL"] },
    { label: "Project Media", items: ["Cloudinary image storage"] },
  ],
  security: [
    {
      label: "Public Forms",
      items: ["Cloudflare Turnstile", "Server-side validation"],
    },
    {
      label: "Admin Access",
      items: ["Protected authentication", "Restricted management routes"],
    },
    {
      label: "Production Hardening",
      items: ["Secure API handling", "Validated database operations"],
    },
  ],
  adminCapabilities: [
    {
      label: "Quotes",
      items: ["Review customer requests", "Track quote status", "Email or call customers"],
    },
    {
      label: "Projects",
      items: ["Create and update projects", "Publish or unpublish entries", "Delete projects"],
    },
    {
      label: "Images",
      items: ["Upload gallery media", "Manage Cloudinary project images"],
    },
  ],
  deployment: [
    { label: "Public Frontend", value: "Live on Vercel" },
    { label: "Express API", value: "Live on Render" },
    { label: "Database", value: "Supabase PostgreSQL" },
    { label: "Project Images", value: "Cloudinary" },
  ],
  images: [
    {
      src: { light: servicesImage, dark: servicesDarkImage },
      alt: "TOP-G Auto Seat services page with automotive upholstery service cards",
      caption: "Services",
    },
    {
      src: { light: aboutImage, dark: aboutDarkImage },
      alt: "TOP-G Auto Seat about page with business information",
      caption: "About",
    },
    {
      src: { light: contactImage, dark: contactDarkImage },
      alt: "TOP-G Auto Seat contact page with phone, email, and location details",
      caption: "Contact and location",
    },
    {
      src: { light: materialsImage, dark: materialsDarkImage },
      alt: "TOP-G Auto Seat materials page showing leather options",
      caption: "Leather materials",
    },
  ],
};
