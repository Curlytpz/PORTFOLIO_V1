import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MusicPlayer from "./MusicPlayer.jsx";
import PortfolioChatbot from "./PortfolioChatbot.jsx";

const pageTitles = {
  "/": "Kris Benedict Delos Santos — Web Developer Portfolio",
  "/experience": "Experience — Kris Benedict Delos Santos",
  "/achievements": "Experience — Kris Benedict Delos Santos",
  "/playground": "Playground — Kris Benedict Delos Santos",
  "/games": "Playground — Kris Benedict Delos Santos",
  "/projects/sea-it-solved": "Sea-It-Solved — Kris Benedict Delos Santos",
};

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    document.title =
      pageTitles[location.pathname] ||
      "Kris Benedict Delos Santos — Web Developer Portfolio";
  }, [location.pathname]);

  useEffect(() => {
    let frameId;

    const scrollToLocation = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (location.hash) {
          const reduceMotion = window.matchMedia?.(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          document
            .getElementById(location.hash.slice(1))
            ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      });
    };

    scrollToLocation();
    window.addEventListener("portfolio:intro-complete", scrollToLocation);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("portfolio:intro-complete", scrollToLocation);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    let observer;
    let disposed = false;

    const initializeReveals = () => {
      if (
        disposed ||
        !document.documentElement.classList.contains("intro-complete")
      ) {
        return;
      }

      const sections = Array.from(
        document.querySelectorAll(
          ".home-main > section, .games-page > section, .simple-page, .case-study-page > section"
        )
      );

      if (!sections.length) return;
      sections.forEach((section) => section.classList.add("reveal-section"));

      const reduceMotion = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion || !("IntersectionObserver" in window)) {
        sections.forEach((section) => section.classList.add("is-visible"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      sections.forEach((section) => observer.observe(section));
    };

    initializeReveals();
    window.addEventListener("portfolio:intro-complete", initializeReveals);

    return () => {
      disposed = true;
      window.removeEventListener("portfolio:intro-complete", initializeReveals);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="site-layout">
      <Sidebar />
      <div className="site-content">
        <div className="home-mobile-header">
          <Header />
        </div>
        <Outlet />
      </div>
      <MusicPlayer />
      <PortfolioChatbot />
    </div>
  );
}
