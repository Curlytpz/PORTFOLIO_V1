import { useCallback, useEffect, useRef, useState } from "react";

const BLOCK_HEIGHT = 24;
const BASE_OFFSET = 28;
const TOP_SPACE = 72;
const STORAGE_KEY = "portfolio-stack-best";

function readBestScore() {
  try {
    return Number.parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export default function StackGame() {
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const movingXRef = useRef(0);
  const directionRef = useRef(1);
  const visibleRef = useRef(false);

  const [stageSize, setStageSize] = useState({ width: 0, height: 360 });
  const [blocks, setBlocks] = useState([]);
  const [movingBlock, setMovingBlock] = useState(null);
  const [fallingPiece, setFallingPiece] = useState(null);
  const [status, setStatus] = useState("playing");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(readBestScore);

  const restart = useCallback(() => {
    const width = stageRef.current?.clientWidth || stageSize.width;
    if (!width) return;

    const blockWidth = Math.min(190, width * 0.46);
    const centeredX = (width - blockWidth) / 2;

    movingXRef.current = 0;
    directionRef.current = 1;
    setBlocks([{ x: centeredX, width: blockWidth }]);
    setMovingBlock({ width: blockWidth });
    setFallingPiece(null);
    setScore(0);
    setStatus("playing");
  }, [stageSize.width]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      setStageSize({
        width: stage.clientWidth,
        height: stage.clientHeight,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stageSize.width > 0 && blocks.length === 0) restart();
  }, [stageSize.width, blocks.length, restart]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.35 }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (status !== "playing" || !movingBlock || !stageSize.width) return;

    const animate = (time) => {
      const elapsed = Math.min((time - lastTimeRef.current) / 1000, 0.04);
      lastTimeRef.current = time;
      const speed = Math.min(290, 135 + score * 8);
      const maxX = Math.max(0, stageSize.width - movingBlock.width);
      let nextX = movingXRef.current + directionRef.current * speed * elapsed;

      if (nextX >= maxX) {
        nextX = maxX;
        directionRef.current = -1;
      } else if (nextX <= 0) {
        nextX = 0;
        directionRef.current = 1;
      }

      movingXRef.current = nextX;
      stageRef.current?.style.setProperty(
        "--stack-moving-x",
        nextX + "px"
      );
      frameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [movingBlock, score, stageSize.width, status]);

  const finishGame = useCallback(() => {
    setStatus("game-over");
    setMovingBlock(null);
    setBestScore((currentBest) => {
      const nextBest = Math.max(currentBest, score);
      try {
        localStorage.setItem(STORAGE_KEY, String(nextBest));
      } catch {
        // The game remains playable when storage is unavailable.
      }
      return nextBest;
    });
  }, [score]);

  const placeBlock = useCallback(() => {
    if (status !== "playing" || !movingBlock || blocks.length === 0) return;

    const previous = blocks[blocks.length - 1];
    const movingX = movingXRef.current;
    const overlapStart = Math.max(previous.x, movingX);
    const overlapEnd = Math.min(
      previous.x + previous.width,
      movingX + movingBlock.width
    );
    const overlapWidth = overlapEnd - overlapStart;

    if (overlapWidth <= 0) {
      setFallingPiece({
        x: movingX,
        width: movingBlock.width,
        level: blocks.length,
      });
      finishGame();
      return;
    }

    const trimmedFromLeft = overlapStart - movingX;
    const overhangWidth = movingBlock.width - overlapWidth;
    if (overhangWidth > 0.5) {
      setFallingPiece({
        x:
          trimmedFromLeft > 0
            ? movingX
            : overlapStart + overlapWidth,
        width: overhangWidth,
        level: blocks.length,
      });
    } else {
      setFallingPiece(null);
    }

    const nextBlocks = [...blocks, { x: overlapStart, width: overlapWidth }];
    setBlocks(nextBlocks);
    setScore((current) => current + 1);
    setMovingBlock({ width: overlapWidth });
    movingXRef.current =
      directionRef.current > 0 ? 0 : stageSize.width - overlapWidth;
  }, [blocks, finishGame, movingBlock, stageSize.width, status]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== "Space" || !visibleRef.current) return;
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLButtonElement
      ) {
        return;
      }
      event.preventDefault();
      placeBlock();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [placeBlock]);

  const cameraOffset = Math.max(
    0,
    blocks.length * BLOCK_HEIGHT -
      (stageSize.height - TOP_SPACE - BASE_OFFSET)
  );
  const blockBottom = (level) =>
    BASE_OFFSET + level * BLOCK_HEIGHT - cameraOffset;

  return (
    <div className="stack-game">
      <div className="stack-game__topbar">
        <p>
          Score <strong>{score}</strong>
        </p>
        <p>
          Best <strong>{bestScore}</strong>
        </p>
      </div>

      <div
        ref={stageRef}
        className="stack-game__stage"
        role="application"
        aria-label="Stack game. Click or press Space to place the moving block."
        tabIndex={0}
        onClick={placeBlock}
      >
        <div className="stack-game__guide" aria-hidden="true" />

        {blocks.map((block, index) => (
          <div
            className="stack-game__block"
            key={index}
            style={{
              width: block.width,
              left: block.x,
              bottom: blockBottom(index),
            }}
          />
        ))}

        {movingBlock && (
          <div
            className="stack-game__block stack-game__block--moving"
            style={{
              width: movingBlock.width,
              bottom: blockBottom(blocks.length),
            }}
          />
        )}

        {fallingPiece && (
          <div
            className="stack-game__block stack-game__block--falling"
            key={fallingPiece.level + "-" + fallingPiece.x}
            style={{
              width: fallingPiece.width,
              left: fallingPiece.x,
              bottom: blockBottom(fallingPiece.level),
            }}
          />
        )}

        {status === "game-over" && (
          <div className="stack-game__game-over">
            <p>Game over</p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                restart();
              }}
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <p className="stack-game__hint">Click the game or press Space to stack.</p>
    </div>
  );
}
