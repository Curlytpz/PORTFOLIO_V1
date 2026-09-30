import { useEffect, useMemo, useState } from "react";

function getGrid(pixelSize) {
  const width = window.innerWidth || 1;
  const height = window.innerHeight || 1;
  return {
    width,
    height,
    columns: Math.ceil(width / pixelSize) + 1,
    rows: Math.ceil(height / pixelSize) + 1,
  };
}

export default function PixelSwap({
  trigger = "manual",
  active = false,
  firstContent,
  secondContent,
  pixelSize = 64,
  gap = 0,
  pixelRadius = 0,
  pixelSpin = 0,
  pixelScale = 0.35,
  duration = 800,
  pixelDuration = 300,
  pattern = "center-out",
  randomness = 0,
  fade = true,
  onComplete,
}) {
  const [phase, setPhase] = useState("idle");
  const [grid, setGrid] = useState(() => getGrid(pixelSize));

  useEffect(() => {
    const handleResize = () => setGrid(getGrid(pixelSize));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pixelSize]);

  const cells = useMemo(
    () => {
      const isCenterOut = ["center-out", "radial", "center"].includes(pattern);
      const centerX = grid.width / 2;
      const centerY = grid.height / 2;
      const maxDistance = Math.hypot(centerX, centerY) || 1;
      const availableDelay = Math.max(0, duration - pixelDuration);

      return Array.from({ length: grid.columns * grid.rows }, (_, index) => {
        const column = index % grid.columns;
        const row = Math.floor(index / grid.columns);
        const cellCenterX = (column + 0.5) * pixelSize;
        const cellCenterY = (row + 0.5) * pixelSize;
        const distanceFromCenter = Math.hypot(
          cellCenterX - centerX,
          cellCenterY - centerY
        );
        const radialProgress = Math.min(1, distanceFromCenter / maxDistance);
        const horizontalProgress = grid.columns > 1
          ? column / (grid.columns - 1)
          : 0;
        const delay = isCenterOut
          ? radialProgress * availableDelay
          : horizontalProgress * availableDelay;

        return { index, column, row, delay };
      });
    },
    [duration, grid, pattern, pixelDuration, pixelSize]
  );

  useEffect(() => {
    if (trigger !== "manual" || !active || phase !== "idle") return undefined;

    setPhase("active");
    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => window.clearTimeout(completeTimer);
  }, [active, duration, onComplete, trigger]);

  return (
    <div
      className={`pixel-swap pixel-swap--${phase}`}
      style={{
        "--pixel-size": `${pixelSize}px`,
        "--pixel-gap": `${gap}px`,
        "--pixel-radius": `${pixelRadius}px`,
        "--pixel-spin": `${pixelSpin}deg`,
        "--pixel-scale": pixelScale,
        "--pixel-duration": `${pixelDuration}ms`,
        "--pixel-total-duration": `${duration}ms`,
        "--pixel-randomness": randomness,
        "--pixel-fade": fade ? 1 : 0,
        "--pixel-columns": grid.columns,
        "--pixel-rows": grid.rows,
      }}
      data-pattern={pattern}
    >
      <div className="pixel-swap__first">{firstContent}</div>
      {secondContent && (
        <div className="pixel-swap__second" aria-hidden="true">
          {secondContent}
        </div>
      )}
      <div
        className="pixel-swap__pixels"
        aria-hidden="true"
        style={{
          gridTemplateColumns: `repeat(${grid.columns}, var(--pixel-size))`,
          gridTemplateRows: `repeat(${grid.rows}, var(--pixel-size))`,
          gap: "var(--pixel-gap)",
        }}
      >
        {cells.map(({ index, delay }) => (
          <span
            className="pixel-swap__pixel"
            key={index}
            style={{ "--pixel-delay": `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
