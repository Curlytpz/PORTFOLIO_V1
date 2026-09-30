import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeSection, setActiveSection] = useState(
    isHome ? "home" : location.pathname.slice(1)
  );

  useEffect(() => {
    if (!isHome) {
      setActiveSection(
        location.pathname === "/games" ? "playground" : location.pathname.slice(1)
      );
      return undefined;
    }

    let frameId;
    const update = () => {
      const work = document.getElementById("work");
      if (!work) return;
      const threshold = work.offsetTop - window.innerHeight * 0.4;
      setActiveSection(window.scrollY >= threshold ? "projects" : "home");
    };
    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome, location.pathname]);

  const active = (name) => (activeSection === name ? "is-active" : "");

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          Kris Benedict Delos Santos
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link className={active("home")} to="/">Home</Link>
          <Link className={active("projects")} to="/#work">Projects</Link>
          <Link className={active("experience")} to="/experience">Experience</Link>
          <Link className={active("playground")} to="/playground">Playground</Link>
        </nav>
      </div>
    </header>
  );
}
