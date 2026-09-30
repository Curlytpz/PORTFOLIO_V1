import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import About from "../components/About.jsx";
import TechStack from "../components/TechStack.jsx";
import Certifications from "../components/Certifications.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <main id="top" className="home-main">
        <Hero />
        <Projects />
        <About />
        <TechStack />
        <Certifications />
        <Contact />
      </main>
      <div className="home-footer">
        <Footer />
      </div>
    </>
  );
}
