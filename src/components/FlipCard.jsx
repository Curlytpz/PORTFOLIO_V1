import { useEffect, useRef, useState } from "react";

export default function FlipCard({
  front,
  back,
  axis = "y",
  flipOnClick = true,
  initialFlipped = false,
  draggable = false,
  tilt = true,
  tiltMax = 5,
  glare = true,
  glareOpacity = 0.08,
  hoverScale = 1.025,
  perspective = 1000,
  stiffness = 180,
  damping = 22,
  radius = 16,
  shadow = true,
  shadowOpacity = 0.12,
  onFlipChange,
  ariaLabel = "Flip card",
  className = "",
}) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(initialFlipped);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return undefined;

    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener?.("change", updatePreference);
    return () => mediaQuery.removeEventListener?.("change", updatePreference);
  }, []);

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--flip-card-tilt-x", "0deg");
    card.style.setProperty("--flip-card-tilt-y", "0deg");
    card.style.setProperty("--flip-card-glare-x", "50%");
    card.style.setProperty("--flip-card-glare-y", "50%");
  };

  const handlePointerMove = (event) => {
    if (!tilt || reducedMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const rotateX = (0.5 - y) * tiltMax * 2;
    const rotateY = (x - 0.5) * tiltMax * 2;

    card.style.setProperty("--flip-card-tilt-x", `${rotateX}deg`);
    card.style.setProperty("--flip-card-tilt-y", `${rotateY}deg`);
    card.style.setProperty("--flip-card-glare-x", `${x * 100}%`);
    card.style.setProperty("--flip-card-glare-y", `${y * 100}%`);
  };

  const springDuration = Math.max(
    320,
    Math.min(600, Math.round((damping / stiffness) * 3600))
  );

  const toggleFlipped = () => {
    setFlipped((current) => {
      const next = !current;
      onFlipChange?.(next);
      return next;
    });
  };

  return (
    <button
      ref={cardRef}
      type="button"
      className={`flip-card ${className}`.trim()}
      aria-label={ariaLabel}
      aria-pressed={flipped}
      data-axis={axis}
      data-flipped={flipped ? "true" : "false"}
      data-glare={glare ? "true" : "false"}
      data-shadow={shadow ? "true" : "false"}
      onClick={flipOnClick ? toggleFlipped : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        "--flip-card-perspective": `${perspective}px`,
        "--flip-card-radius": `${radius}px`,
        "--flip-card-hover-scale": hoverScale,
        "--flip-card-glare-opacity": glareOpacity,
        "--flip-card-shadow-opacity": shadowOpacity,
        "--flip-card-duration": `${springDuration}ms`,
      }}
    >
      <span className="flip-card__inner">
        <span className="flip-card__face flip-card__face--front" draggable={draggable}>
          {front}
        </span>
        <span className="flip-card__face flip-card__face--back" draggable={draggable}>
          {back}
        </span>
      </span>
    </button>
  );
}