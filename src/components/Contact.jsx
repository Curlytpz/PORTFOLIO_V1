// Contact — "Let's Connect" section.
// All links are placeholders. Replace the href values later.

export default function Contact() {
  return (
    <section id="contact" className="contact container">
      <h2 className="section-label">Let's Connect</h2>
      <p className="contact-text">
        I'm currently looking for opportunities to learn, collaborate,
        and gain real-world development experience.
      </p>
      <p className="contact-links">
        {/* Replace with actual email address */}
        <a href="#" className="external">
          Email <span className="arrow">↗</span>
        </a>
        {/* Replace with actual GitHub URL */}
        <a href="#" className="external">
          GitHub <span className="arrow">↗</span>
        </a>
        {/* Replace with actual LinkedIn URL */}
        <a href="#" className="external">
          LinkedIn <span className="arrow">↗</span>
        </a>
      </p>
    </section>
  );
}