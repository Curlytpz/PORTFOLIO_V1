const portfolioKnowledge = {
  owner: "Kris Benedict M. Delos Santos",
  location: "Mabalacat, Pampanga, Philippines",
  about:
    "I’m Kris Benedict M. Delos Santos, a Computer Engineering student based in Mabalacat, Pampanga, Philippines. I’m interested in frontend development, web development, software development, IT support, and network/IT technician work.",
  education:
    "I’m studying Computer Engineering at Holy Angel University. My academic work includes software development, networking, hardware, and embedded systems.",
  careerGoals:
    "I’m working toward becoming a Senior Full-Stack Software Engineer or Web Developer. I’m also interested in building practical experience in IT support and networking.",
  background:
    "My interest in technology started with photo and video editing, graphic design, gaming, PC hardware, and building computers. That grew into an interest in frontend development, UI/UX, software engineering, and web development.",
  workflow:
    "I usually start with my own project or design idea, use AI to validate and improve the concept, plan the architecture and development steps, implement it, test and debug it, and keep refining it. I use AI as an assistant rather than as the sole developer.",
  webSkills: [
    "React",
    "Vite",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "shadcn/ui",
    "Lucide Icons",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "REST APIs",
    "PostgreSQL",
    "Supabase",
    "JWT",
    "Git",
    "GitHub",
    "VS Code",
    "Vercel",
    "Render",
    "Firebase/Firestore",
    "Gmail API",
    "OAuth 2.0",
    "FFmpeg",
    "FFprobe",
  ],
  itSupport: [
    "PC assembly",
    "hardware troubleshooting",
    "diagnosing broken PCs",
    "replacing PC components",
    "Windows installation and reinstallation",
    "driver installation",
    "BIOS configuration",
    "printer and peripheral troubleshooting",
    "cable crimping",
    "basic networking",
  ],
  networkingSkills: [
    "Cisco Packet Tracer",
    "router configuration",
    "switch configuration",
    "IP addressing",
    "subnetting",
    "DHCP",
    "NAT",
    "ACL",
  ],
  hardwareSkills: [
    "Arduino",
    "Raspberry Pi",
    "sensors",
    "microcontrollers",
    "breadboards",
    "soldering",
    "PCB design",
    "KiCad",
    "cameras",
  ],
  designMedia: ["Canva", "Lightroom", "CapCut"],
  softSkills: [
    "teamwork",
    "communication",
    "problem-solving",
    "adaptability",
    "attention to detail",
    "willingness to learn",
    "time management",
    "working under pressure",
  ],
  projects:
    "My projects include Sea-It-Solved, a responsive personal portfolio, and Top G / Top Garage, a car seat-cover and tailoring business website in development. My portfolio also includes a Stack browser game and local interactive features.",
  thesis:
    "Sea-It-Solved is my academic thesis and capstone project. It is an automated lecture capturing and documentation system that transforms mathematics and whiteboard lectures into structured digital learning materials using computer vision and AI. My work includes the database, backend, email verification, logs, PostgreSQL/Supabase, Gmail verification, Gemini API, FFmpeg, deployment, system integration, and testing. The architecture includes a React frontend, Express backend, PostgreSQL database, and background workers. The software is working in development and testing, while hardware integration is still pending. My teammates also contribute to testing, hardware, and thesis documentation.",
  topGarage:
    "Top G / Top Garage is a website I’m currently developing for a car seat-cover and tailoring business. Planned features include a product and gallery showcase, seat-cover designs, vehicle selection, Messenger/contact, appointment booking, and an admin dashboard.",
  experience:
    "My current experience comes from the Sea-It-Solved academic thesis and independent web development projects. I describe these as academic and personal work rather than professional employment.",
  certifications:
    "My portfolio lists CCNA: Switching, Routing, and Wireless Essentials, completed through Cisco Networking Academy on June 17, 2025, and IT Essentials: PC Hardware and Software, completed on April 11, 2024. Both are Cisco Networking Academy credentials offered through Holy Angel University’s School of Engineering and Architecture. I do not claim to be CCNA Certified unless a credential says so.",
  favoriteFoods:
    "My favorite foods are adobo and sisig.",
  hobbies:
    "My hobbies include playing games, jogging or running, basketball, and pickleball.",
  interests:
    "My interests include gaming, music, design, and photography. I was also part of a Valorant championship team or event within the School of Engineering and Architecture in 2025.",
  contact:
    "You can contact me at krisbenedict2delossantos@gmail.com, visit github.com/Curlytpz, connect at linkedin.com/in/kris-santos-21b134280, or use the portfolio’s Message feature.",
  games:
    "The Playground includes Stack, an interactive JavaScript browser experiment where you place each moving block as precisely as possible.",
  resume:
    "My CV summarizes my Computer Engineering education, web development and IT support skills, academic thesis work, certifications, and independent projects.",
};

const list = (items) => items.join(", ");

export const chatbotIntents = [
  {
    id: "about",
    keywords: ["about", "who", "yourself", "introduce", "kris", "person", "location", "live", "based"],
    answer: portfolioKnowledge.about,
  },
  {
    id: "education",
    keywords: ["education", "study", "studying", "school", "degree", "course", "major", "student", "computer engineering", "university", "ha u"],
    answer: portfolioKnowledge.education,
  },
  {
    id: "goals",
    keywords: ["career goal", "career goals", "future", "aspire", "aspiring", "long term", "goal", "want to become"],
    answer: portfolioKnowledge.careerGoals,
  },
  {
    id: "background",
    keywords: ["background", "started", "interest in technology", "why tech", "how did you start"],
    answer: portfolioKnowledge.background,
  },
  {
    id: "workflow",
    keywords: ["workflow", "ai assisted", "ai-assisted", "use ai", "develop", "development process", "how do you build"],
    answer: portfolioKnowledge.workflow,
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "stack", "technology", "technologies", "tech", "tools", "frontend", "backend", "javascript", "react", "web development"],
    answer: `My web development stack includes ${list(portfolioKnowledge.webSkills)}. I also have basic or academic experience in networking, hardware, and IT support.`,
  },
  {
    id: "it-support",
    keywords: ["it support", "technical support", "pc support", "computer repair", "troubleshoot", "broken pc", "windows installation", "bios", "printer", "pc assembly"],
    answer: `I have experience with ${list(portfolioKnowledge.itSupport)}. These are practical, academic, or hands-on skills rather than claims of advanced professional expertise.`,
  },
  {
    id: "networking",
    keywords: ["networking", "network", "packet tracer", "router", "switch", "routing", "switching", "subnetting", "dhcp", "nat", "acl", "ip address"],
    answer: `My networking experience includes ${list(portfolioKnowledge.networkingSkills)}.`,
  },
  {
    id: "hardware",
    keywords: ["hardware", "embedded", "arduino", "raspberry pi", "sensor", "microcontroller", "soldering", "kicad", "pcb", "breadboard", "camera"],
    answer: `I have basic or academic experience with ${list(portfolioKnowledge.hardwareSkills)}.`,
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "made", "work", "portfolio", "created"],
    answer: portfolioKnowledge.projects,
  },
  {
    id: "thesis",
    keywords: ["thesis", "sea-it-solved", "sea it solved", "research", "capstone", "case study", "lecture capture", "whiteboard"],
    answer: portfolioKnowledge.thesis,
  },
  {
    id: "top-garage",
    keywords: ["top g", "top garage", "car seat", "tailoring", "seat cover", "business website"],
    answer: portfolioKnowledge.topGarage,
  },
  {
    id: "experience",
    keywords: ["experience", "job", "work experience", "career", "internship", "professional", "employment"],
    answer: portfolioKnowledge.experience,
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "certificate", "credential", "ccna", "cisco", "it essentials"],
    answer: portfolioKnowledge.certifications,
  },
  {
    id: "food",
    keywords: ["favorite food", "favourite food", "food", "foods", "eat", "eats"],
    answer: portfolioKnowledge.favoriteFoods,
  },
  {
    id: "hobbies",
    keywords: ["hobby", "hobbies", "free time", "pastime", "pastimes", "gaming", "games", "basketball", "pickleball", "jogging", "running"],
    answer: portfolioKnowledge.hobbies,
  },
  {
    id: "interests",
    keywords: ["interest", "interests", "music", "photography", "valorant"],
    answer: portfolioKnowledge.interests,
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "message", "hire", "connect", "linkedin", "github"],
    answer: portfolioKnowledge.contact,
  },
  {
    id: "games",
    keywords: ["game", "games", "playground", "stack game", "play"],
    answer: portfolioKnowledge.games,
  },
  {
    id: "resume",
    keywords: ["resume", "cv", "curriculum", "vitae", "view my cv", "show me your cv", "see your resume", "qualifications"],
    answer: portfolioKnowledge.resume,
  },
];

export const fallbackAnswer =
  "I’m not sure about that, and I don’t want to guess. Try asking about my education, projects, skills, thesis, IT support, certifications, interests, hobbies, favorite food, or contact information.";

export default portfolioKnowledge;
