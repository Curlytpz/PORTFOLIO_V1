// SeaItSolved is a placeholder case-study page.
// It uses the SAME header and footer as the homepage,
// so the design feels continuous.

import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function SeaItSolved() {
  return (
    <>
      <Header />
      <main>
        <section className="case-header container">
          {/* Link back to the homepage */}
          <Link to="/" className="back-link">
            ← Back to home
          </Link>

          <h1 className="case-title">Sea-It-Solved</h1>
          <p className="case-subtitle">
            Automated Lecture Capturing &amp; Documentation System
          </p>

          <div className="case-meta">
            <span>2026</span>
            <span aria-hidden="true">·</span>
            <span>In Development</span>
          </div>
        </section>

        <section className="case-section container">
          <p className="case-section-label">01 / Overview</p>
          <p>Case study coming soon.</p>
          <p>This page will document the project as it develops.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}