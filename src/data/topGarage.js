import aboutImage from "../assets/top-g/about.png";
import contactImage from "../assets/top-g/contact.png";
import materialsImage from "../assets/top-g/materials.png";
import servicesImage from "../assets/top-g/services.png";

export const topGarageProject = {
  title: "Top G / Top Garage",
  subtitle: "Automotive Upholstery Business Website",
  year: "2026",
  context: "Independent Web Development Project",
  status: "In Development",
  visitUrl: "",
  demo: {
    src: "/assets/demos/top-g-auto-seat-demo.mp4",
    poster: servicesImage,
    title: "Top G Auto Seat system demo",
  },
  features: [
    "Service pages for seat covers, re-upholstery, and installation.",
    "Material collection browsing with warranty information.",
    "Contact details, location information, and quote call-to-actions.",
    "Responsive page layouts for showcasing automotive upholstery work.",
  ],
  technologies: [
    "React",
    "Vite",
    "JavaScript",
    "HTML",
    "CSS",
    "Responsive Design",
  ],
  images: [
    {
      src: servicesImage,
      alt: "Top G Auto Seat services page with automotive upholstery service cards",
      caption: "Services",
    },
    {
      src: aboutImage,
      alt: "Top G Auto Seat about page with business information",
      caption: "About",
    },
    {
      src: contactImage,
      alt: "Top G Auto Seat contact page with phone, email, and location details",
      caption: "Contact",
    },
    {
      src: materialsImage,
      alt: "Top G Auto Seat materials page showing upholstery material options",
      caption: "Materials",
    },
  ],
};
