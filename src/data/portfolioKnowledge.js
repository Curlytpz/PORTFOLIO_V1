const portfolioKnowledge = {
  owner: "Kris Benedict M. Delos Santos",
  about:
    "I’m Kris Benedict M. Delos Santos, a Computer Engineering student at Holy Angel University, expected to graduate in 2027. I’m interested in frontend and web development, software development, IT support, and networking, with a strong interest in UI/UX and practical systems.",
  education:
    "I’m studying Computer Engineering at Holy Angel University and expect to graduate in 2027. My studies include software development, networking, hardware, and embedded systems.",
  career:
    "I’m currently looking for OJT or internship opportunities, especially in web development and software roles. I can also contribute to IT support and hardware or network troubleshooting while continuing toward full-stack development.",
  careerGoals:
    "My long-term goal is to become a full-stack software engineer or web developer who builds practical, well-designed systems.",
  developmentApproach:
    "I usually begin with my own ideas or problems, plan the features and architecture, then implement, research, test, and debug. I use documentation and AI tools as development support, but I make the implementation and design decisions myself and verify generated solutions.",
  webSkills: [
    "React",
    "Vite",
    "JavaScript",
    "HTML/CSS",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "REST APIs",
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Git/GitHub",
    "Vercel",
    "Render",
  ],
  itSupport: [
    "desktop PC assembly",
    "hardware diagnosis and repair",
    "component replacement",
    "Windows installation and reinstallation",
    "driver installation",
    "BIOS configuration",
    "printer and peripheral troubleshooting",
    "cable crimping",
    "soldering",
    "Arduino circuits",
    "basic electronics",
    "KiCad",
  ],
  networkingSkills: [
    "Cisco Packet Tracer",
    "router and switch configuration",
    "IP addressing",
    "subnetting",
    "DHCP",
    "NAT",
    "ACLs",
    "cable crimping",
  ],
  designMedia: ["Canva", "Lightroom", "CapCut", "UI/UX", "graphic design"],
  softSkills: [
    "problem solving",
    "teamwork",
    "communication",
    "adaptability",
    "attention to detail",
    "willingness to learn",
    "time management",
    "working under pressure",
  ],
  seaItSolved:
    "Sea-It-Solved is my Computer Engineering capstone and thesis: an automated lecture capturing and documentation system for mathematics lectures. It uses a React frontend, Express and Node.js backend, PostgreSQL and Supabase, role-based workflows, authentication and email verification, Gemini integration, and FFmpeg media processing. I worked on database and backend integration, verification and logging, testing, debugging, and system integration. The software platform is functional; physical classroom hardware integration is still in development.",
  topGarage:
    "Top G / Top Garage is a real portfolio and client project for a car seat-cover tailoring business. It presents services, vehicle and seat-cover information, material and design options, and contact or location details. The project also supports appointment and customer workflows, with admin functionality where it is currently implemented.",
  portfolio:
    "My personal portfolio is a React and Vite project with responsive desktop and mobile layouts, light and dark modes, a graduation theme, animations, a music player, Stack mini-game, interactive profile card, this local assistant, a Firebase contact form, Cloudflare Turnstile, and Vercel deployment.",
  experience:
    "My experience includes academic and independent project work: Sea-It-Solved, the live TOP-G Auto Seat client system, and my personal portfolio. I present this accurately as thesis, client-project, and portfolio work rather than professional employment.",
  certifications:
    "My certification includes Cisco Networking Academy — Computer Hardware Basics, completed in 2026.",
  contact:
    "You can reach me through the portfolio’s Contact or Message section. My email is krisbenedict2delossantos@gmail.com, and my links include GitHub and LinkedIn.",
  resume:
    "My CV covers my Computer Engineering education, project work, web development stack, IT and networking skills, and certification.",
  favoriteFoods: "My favorite foods are adobo and sisig.",
  hobbies:
    "My hobbies include playing games, jogging or running, basketball, and pickleball.",
};

const list = (items) => items.join(", ");

export const chatbotIntents = [
  {
    id: "recruiter-about",
    keywords: ["tell me about kris", "about kris", "who is kris", "introduce kris"],
    answer: portfolioKnowledge.about,
  },
  {
    id: "strongest-skills",
    keywords: ["strongest skills", "best skills", "key strengths", "what is kris good at"],
    answer:
      "Kris’s strongest areas are frontend and web development, practical project building, UI/UX interest, and hands-on IT support and networking fundamentals. Sea-It-Solved and the personal portfolio demonstrate those skills in real project work.",
  },
  {
    id: "hire",
    keywords: ["why should we hire", "why hire kris", "why hire", "hire kris"],
    answer:
      "Kris can contribute as a detail-oriented intern who plans before building, learns unfamiliar tools when needed, and follows through with testing and debugging. His work on Sea-It-Solved, Top G, and his portfolio shows practical web development alongside IT and networking fundamentals.",
  },
  {
    id: "intern-contribution",
    keywords: ["contribute as an intern", "what can kris contribute", "intern contribution", "what can he contribute"],
    answer:
      "As an intern, Kris can contribute responsive frontend work, web application implementation, documentation, testing, debugging, and practical IT support or hardware and network troubleshooting. He is comfortable collaborating and learning the tools a project requires.",
  },
  {
    id: "personal-work",
    keywords: ["personally work on", "personally worked on", "what did kris work on", "his role", "kris role"],
    answer:
      "For Sea-It-Solved, Kris worked on database and backend integration, verification and logging, testing, debugging, and system integration. He also makes the implementation and design decisions for his independent portfolio work and Top G project.",
  },
  {
    id: "frontend-backend",
    keywords: ["frontend backend", "frontend and backend", "know frontend", "know backend", "full stack", "full-stack"],
    answer:
      "Kris is strongest in frontend and web development and also works with backend tools including Node.js, Express.js, REST APIs, PostgreSQL, Supabase, and Firebase. He is continuing to grow toward full-stack development through practical projects.",
  },
  {
    id: "about",
    keywords: ["about", "who", "yourself", "introduce", "kris", "person", "location", "based"],
    answer: portfolioKnowledge.about,
  },
  {
    id: "education",
    keywords: ["education", "study", "studying", "school", "degree", "course", "major", "student", "computer engineering", "university", "holy angel", "graduation"],
    answer: portfolioKnowledge.education,
  },
  {
    id: "career",
    keywords: ["ojt", "internship", "intern", "career", "role", "opportunity", "looking for"],
    answer: portfolioKnowledge.career,
  },
  {
    id: "goals",
    keywords: ["career goal", "career goals", "future", "aspire", "aspiring", "long term", "goal", "want to become"],
    answer: portfolioKnowledge.careerGoals,
  },
  {
    id: "development-approach",
    keywords: ["development approach", "development process", "how do you build", "workflow", "plan projects", "use ai", "ai assisted", "ai-assisted"],
    answer: portfolioKnowledge.developmentApproach,
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "stack", "technology", "technologies", "tech", "tools", "web development", "react", "vite", "javascript", "tailwind", "express", "postgresql", "supabase", "firebase"],
    answer: `My web development stack includes ${list(portfolioKnowledge.webSkills)}. I describe my backend, networking, and hardware skills accurately as hands-on, academic, or continuing-learning experience where appropriate.`,
  },
  {
    id: "it-support",
    keywords: ["it support", "technical support", "pc support", "computer repair", "troubleshoot", "broken pc", "windows installation", "bios", "printer", "pc assembly", "peripheral"],
    answer: `I have hands-on experience with ${list(portfolioKnowledge.itSupport)}. These are practical skills I have developed personally and academically, rather than claims of advanced professional IT employment.`,
  },
  {
    id: "networking",
    keywords: ["networking experience", "networking", "network", "packet tracer", "router", "switch", "routing", "switching", "subnetting", "dhcp", "nat", "acl", "ip address"],
    answer: `My networking experience includes ${list(portfolioKnowledge.networkingSkills)}. I’m continuing to strengthen my networking knowledge through practice and study.`,
  },
  {
    id: "hardware",
    keywords: ["hardware experience", "hardware", "arduino", "soldering", "kicad", "electronics", "cable crimping", "component replacement"],
    answer: `I have hands-on hardware experience with ${list(portfolioKnowledge.itSupport)}. I have personally assembled a desktop PC and worked on practical troubleshooting, repairs, and basic electronics projects.`,
  },
  {
    id: "projects",
    keywords: ["what projects", "projects", "project", "built", "made", "created", "portfolio project"],
    answer:
      "Kris has built Sea-It-Solved, an academic lecture-capture thesis system; TOP-G Auto Seat, a deployed full-stack business and management system; and this React/Vite portfolio. Each project addresses practical user needs without inventing metrics or employment claims.",
  },
  {
    id: "portfolio",
    keywords: ["personal portfolio", "your portfolio", "this portfolio", "portfolio features"],
    answer: portfolioKnowledge.portfolio,
  },
  {
    id: "thesis",
    keywords: ["thesis", "sea-it-solved", "sea it solved", "research", "capstone", "lecture capture", "whiteboard", "mathematics lectures"],
    answer: portfolioKnowledge.seaItSolved,
  },
  {
    id: "top-garage",
    keywords: ["top g", "top-g", "top garage", "top-g auto seat", "car seat", "tailoring", "seat cover", "business website"],
    answer: portfolioKnowledge.topGarage,
  },
  {
    id: "experience",
    keywords: ["experience", "work experience", "professional", "employment", "qualifications"],
    answer: portfolioKnowledge.experience,
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "certificate", "credential", "cisco", "computer hardware basics"],
    answer: portfolioKnowledge.certifications,
  },
  {
    id: "current-learning",
    keywords: ["currently learning", "what is kris learning", "learning now", "improving"],
    answer:
      "Kris is continuing to develop toward full-stack web development while improving his networking knowledge. He also learns unfamiliar technologies as project requirements arise.",
  },
  {
    id: "design-media",
    keywords: ["design", "ui ux", "ui/ux", "canva", "lightroom", "capcut", "graphic design"],
    answer: `My design and media experience includes ${list(portfolioKnowledge.designMedia)}. I bring that UI/UX interest into practical web interfaces.`,
  },
  {
    id: "food",
    keywords: ["favorite food", "favourite food", "food", "foods", "eat", "eats"],
    answer: portfolioKnowledge.favoriteFoods,
  },
  {
    id: "hobbies",
    keywords: ["hobby", "hobbies", "free time", "pastime", "gaming", "games", "basketball", "pickleball", "jogging", "running"],
    answer: portfolioKnowledge.hobbies,
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "message", "connect", "linkedin", "github", "how can i contact"],
    answer: portfolioKnowledge.contact,
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "curriculum vitae", "view my cv", "show me your cv", "show me his cv", "see your resume", "see his resume", "view cv"],
    answer: portfolioKnowledge.resume,
  },
];

export const fallbackAnswer =
  "I’m not sure about that, and I don’t want to guess. Try asking about Kris’s education, projects, skills, thesis, IT support, networking, certifications, career goals, CV, or contact information.";

export default portfolioKnowledge;
