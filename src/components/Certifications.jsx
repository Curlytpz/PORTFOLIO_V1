import certifications from "../data/certifications.js";

export default function Certifications() {
  return (
    <section id="certifications" className="certifications container">
      <h2 className="section-label">05 — Certifications</h2>

      <div className="certification-list">
        {certifications.map((certification) => (
          <article className="certification" key={certification.id}>
            <p className="certification-date">
              Completed {certification.completed}
            </p>
            <h3>{certification.title}</h3>
            <p className="certification-issuer">{certification.issuer}</p>
            {certification.offeredThrough ? (
              <p className="certification-through">
                Offered through {certification.offeredThrough}
              </p>
            ) : null}
            <ul
              className="certification-tags"
              aria-label={`${certification.title} topics`}
            >
              {certification.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {certification.credentialUrl ? (
              <a
                className="certification-link external"
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Credential{" "}
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
