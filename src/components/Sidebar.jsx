import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function routeSection(pathname) {
  if (pathname.startsWith("/projects/")) return "projects";
  if (pathname === "/playground" || pathname === "/games") return "playground";
  if (pathname === "/experience" || pathname === "/achievements") {
    return "experience";
  }
  return "home";
}

export default function Sidebar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [activeNav, setActiveNav] = useState(() =>
    routeSection(location.pathname)
  );

  useEffect(() => {
    if (!isHome) {
      setActiveNav(routeSection(location.pathname));
      return undefined;
    }

    let frameId;

    const updateActiveNav = () => {
      const workSection = document.getElementById("work");
      if (!workSection) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const workStart = workSection.offsetTop - viewportHeight * 0.4;
      const workEnd =
        workSection.offsetTop +
        workSection.offsetHeight -
        viewportHeight * 0.2;

      if (scrollPosition < workStart) {
        setActiveNav("home");
      } else if (scrollPosition <= workEnd) {
        setActiveNav("projects");
      } else {
        setActiveNav(null);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveNav);
    };

    updateActiveNav();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome, location.pathname]);

  const navClass = (name) => (activeNav === name ? "is-active" : "");
  const current = (name, value = "page") =>
    activeNav === name ? value : undefined;

  return (
    <aside className="home-sidebar">
      <Link className="sidebar-brand" to="/">
        Kris Benedict
        <br />
        Delos Santos
      </Link>

      <nav className="sidebar-nav" aria-label="Portfolio navigation">
        {isHome ? (
          <a
            className={navClass("home")}
            href="#top"
            aria-current={current("home")}
          >
            <span aria-hidden="true">→</span>
            HOME
          </a>
        ) : (
          <Link className={navClass("home")} to="/">
            <span aria-hidden="true">→</span>
            HOME
          </Link>
        )}

        {isHome ? (
          <a
            className={navClass("projects")}
            href="#work"
            aria-current={current("projects", "location")}
          >
            <span aria-hidden="true">→</span>
            PROJECTS
          </a>
        ) : (
          <Link
            className={navClass("projects")}
            to="/#work"
            aria-current={current("projects")}
          >
            <span aria-hidden="true">→</span>
            PROJECTS
          </Link>
        )}

        <Link
          className={navClass("experience")}
          to="/experience"
          aria-current={current("experience")}
        >
          <span aria-hidden="true">→</span>
          EXPERIENCE
        </Link>

        <Link
          className={navClass("playground")}
          to="/playground"
          aria-current={current("playground")}
        >
          <span aria-hidden="true">→</span>
          PLAYGROUND
        </Link>
      </nav>

      <div className="sidebar-footer">
        <a
          className="sidebar-email"
          href="mailto:krisbenedict2delossantos@gmail.com"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M3.5 5.5h17v13h-17zM4.5 6.5 12 13l7.5-6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>krisbenedict2delossantos@gmail.com</span>
        </a>
        <ThemeToggle />
      </div>
    </aside>
  );
}
