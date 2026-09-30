import { useEffect, useState } from "react";

const orbitOrder = [0, 1, 2, 5, 8, 7, 6, 3];

function getElapsedSeconds(startedAt) {
  return Math.max(0, (Date.now() - startedAt) / 1000);
}

export default function LatticeLoader({
  label = "Thinking",
  doneLabel = "Done in",
  errorLabel = "Failed after",
  status = "working",
  pattern = "orbit",
  grid = 3,
  shape = "round",
  color = "currentColor",
  doneColor = "#22c55e",
  errorColor = "#ef4444",
  cellSize = 6,
  gap = 2,
  fontSize = 14,
  step = 90,
  idleOpacity = 0.15,
  showTimer = true,
  className = "",
  style,
}) {
  const [startedAt] = useState(() => Date.now());
  const [elapsed, setElapsed] = useState(() => getElapsedSeconds(startedAt));

  useEffect(() => {
    if (!showTimer || status !== "working") return undefined;
    const intervalId = window.setInterval(
      () => setElapsed(getElapsedSeconds(startedAt)),
      100
    );
    return () => window.clearInterval(intervalId);
  }, [showTimer, startedAt, status]);

  const cells = Array.from({ length: grid * grid }, (_, index) => index);
  const isDone = status === "done";
  const isError = status === "error";
  const statusColor = isDone ? doneColor : isError ? errorColor : color;
  const labelText = isDone ? doneLabel : isError ? errorLabel : label;
  const patternName = typeof pattern === "string" ? pattern : "orbit";

  return (
    <div
      className={`lattice-loader lattice-loader--${status} ${className}`.trim()}
      style={{
        ...style,
        color: statusColor,
        "--lattice-cell-size": `${cellSize}px`,
        "--lattice-gap": `${gap}px`,
        "--lattice-font-size": `${fontSize}px`,
        "--lattice-step": `${step}ms`,
        "--lattice-idle-opacity": idleOpacity,
      }}
      role="status"
      aria-live="polite"
      aria-label={labelText}
      data-pattern={patternName}
      data-grid={grid}
    >
      <div
        className={`lattice-loader__grid lattice-loader__grid--${shape}`}
        style={{ gridTemplateColumns: `repeat(${grid}, var(--lattice-cell-size))` }}
        aria-hidden="true"
      >
        {cells.map((index) => {
          const orbitIndex = orbitOrder.indexOf(index);
          const delay = orbitIndex === -1 ? 0 : orbitIndex * step;
          return (
            <span
              className="lattice-loader__cell"
              key={index}
              style={{ "--lattice-delay": `${delay}ms` }}
            />
          );
        })}
      </div>

      {isDone && <span className="lattice-loader__mark" aria-hidden="true">✓</span>}
      {isError && <span className="lattice-loader__mark" aria-hidden="true">×</span>}

      <span className="lattice-loader__label">{labelText}</span>
      {showTimer && (
        <span className="lattice-loader__timer">{elapsed.toFixed(1)}s</span>
      )}
    </div>
  );
}
