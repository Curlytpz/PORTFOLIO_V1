// Home composes all homepage sections in order.
// Each section is a separate component so it can be
// modified independently — important for future
// React Bits / OriginKit integration.

import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import About from "../components/About.jsx";
import TechStack from "../components/TechStack.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}