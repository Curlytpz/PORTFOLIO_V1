// Hero is your introduction section.
// It's a "presentational" component — no state, just markup.

export default function Hero() {
  return (
    <section className="intro container">
      <h1>
        Computer Engineering student
        <br />
        &amp; aspiring web developer.
      </h1>
      <p className="intro-support">
        I'm a Computer Engineering student interested in building
        practical web applications and exploring full-stack
        development and artificial intelligence.
      </p>
      <p className="intro-links">
        <a href="#work">
          View my work <span className="arrow">→</span>
        </a>
        {/* Replace with actual GitHub URL */}
        <a href="#" className="external">
          GitHub <span className="arrow">↗</span>
        </a>
      </p>
    </section>
  );
}