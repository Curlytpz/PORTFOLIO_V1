
// Header renders the site header and top navigation.
// It uses useState + useEffect to track which section is
// currently in view and mark the matching nav link with .is-active.

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  // "activeSection" holds the id of the section currently in view
  const [activeSection, setActiveSection] = useState("");

  // useLocation tells us if we're on the homepage or a sub-page
  const location = useLocation();
  const isHome = location.pathname === "/";

  // useEffect runs side effects — here, we set up an
  // IntersectionObserver to track which section is visible.
  useEffect(() => {
    if (!isHome) return; // only run on the homepage

    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    const sections = Array.from(navLinks)
      .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Link to home. On the homepage, scrolls to top.
            On sub-pages, navigates back to "/" */}
        <Link to="/" className="brand">
          Kris Delos Santos
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <a href={isHome ? "#about" : "/#about"}>About</a>
          <a href={isHome ? "#work" : "/#work"}>Work</a>
          <a href={isHome ? "#contact" : "/#contact"}>Contact</a>
          {/* Replace with actual GitHub URL */}
          <a href="#" className="nav-external" aria-label="GitHub profile">
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}