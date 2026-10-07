import ThemeAwareImage from "./ThemeAwareImage.jsx";

export default function CaseStudyFeatureSection({
  number,
  label,
  title,
  description,
  image,
  onOpen,
}) {
  return (
    <section className="case-section case-section--showcase container">
      <p className="case-section-label">
        {number} / {label}
      </p>
      <div className="case-section-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button
        className="case-image-button"
        type="button"
        onClick={onOpen}
        aria-label={`View ${image.caption} at full size`}
      >
        <ThemeAwareImage media={image.src} className="case-image" alt={image.alt} />
        <span className="case-image-caption">{image.caption}</span>
      </button>
    </section>
  );
}
