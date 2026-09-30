import Footer from "../components/Footer.jsx";
import StackGame from "../components/StackGame.jsx";

export default function Games() {
  return (
    <>
      <main className="games-page container">
        <section className="playground" aria-labelledby="stack-title">
          <p className="case-section-label">Playground — 01</p>
          <div className="playground-heading">
            <div>
              <h1 id="stack-title">Stack</h1>
              <p>Place each moving block as precisely as you can.</p>
              <p className="playground-tech-caption">
                Interactive browser experiment built with JavaScript.
              </p>
            </div>
          </div>
          <StackGame />
        </section>
      </main>
      <div className="page-footer">
        <Footer />
      </div>
    </>
  );
}
