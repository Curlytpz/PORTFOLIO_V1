import aboutImage from "../assets/top-g/about.png";
import aboutDarkImage from "../assets/top-g/about-dark.png";
import contactImage from "../assets/top-g/contact.png";
import contactDarkImage from "../assets/top-g/contact-dark.png";
import materialsImage from "../assets/top-g/materials.png";
import materialsDarkImage from "../assets/top-g/materials-dark.png";
import servicesImage from "../assets/top-g/services.png";
import servicesDarkImage from "../assets/top-g/services-dark.png";

export const topGarageProject = {
  title: "Top G / Top Garage",
  subtitle: "Automotive Upholstery Business Website",
  year: "2026",
  context: "Independent Web Development Project",
  status: "In Development",
  visitUrl: "",
  demo: {
    src: {
      light: "/assets/demos/top-g-auto-seat-demo.mp4",
      dark: "/assets/demos/top-g-auto-seat-demo-dark-20261007-032119.mp4",
    },
    poster: {
      light: servicesImage,
      dark: servicesDarkImage,
    },
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
      src: { light: servicesImage, dark: servicesDarkImage },
      alt: "Top G Auto Seat services page with automotive upholstery service cards",
      caption: "Services",
    },
    {
      src: { light: aboutImage, dark: aboutDarkImage },
      alt: "Top G Auto Seat about page with business information",
      caption: "About",
    },
    {
      src: { light: contactImage, dark: contactDarkImage },
      alt: "Top G Auto Seat contact page with phone, email, and location details",
      caption: "Contact",
    },
    {
      src: { light: materialsImage, dark: materialsDarkImage },
      alt: "Top G Auto Seat materials page showing upholstery material options",
      caption: "Materials",
    },
  ],
};