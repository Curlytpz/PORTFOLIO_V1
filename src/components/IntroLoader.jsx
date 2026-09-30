import { useEffect, useRef, useState } from "react";
import LatticeLoader from "./LatticeLoader.jsx";
import PixelSwap from "./PixelSwap.jsx";

const WORKING_DURATION = 1200;
const DONE_DURATION = 250;
const REDUCED_FADE_DURATION = 80;
const INTRO_STORAGE_KEY = "portfolioIntroPlayed";

function readIntroPlayed() {
  try {
    return sessionStorage.getItem(INTRO_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

const introPlayedOnLoad = readIntroPlayed();

function prepareLightTheme() {
  document.documentElement.dataset.theme = "light";
  document.documentElement.style.colorScheme = "light";
}

if (introPlayedOnLoad) {
  document.documentElement.classList.add("intro-complete");
} else {
  prepareLightTheme();
}

export default function IntroLoader() {
  const [visible, setVisible] = useState(() => !introPlayedOnLoad);
  const completedRef = useRef(introPlayedOnLoad);
  const [phase, setPhase] = useState("working");
  const [startReveal, setStartReveal] = useState(false);
  const [reducedMotion] = useState(() =>
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const completeIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // The intro still completes when session storage is unavailable.
    }

    document.documentElement.classList.add("intro-complete");
    window.dispatchEvent(new Event("portfolio:intro-complete"));
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return undefined;

    prepareLightTheme();

    if (reducedMotion) {
      const fadeTimer = window.setTimeout(() => setPhase("fade"), 60);
      const closeTimer = window.setTimeout(
        completeIntro,
        REDUCED_FADE_DURATION
      );
      return () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(closeTimer);
      };
    }

    const doneTimer = window.setTimeout(() => setPhase("done"), WORKING_DURATION);
    const revealTimer = window.setTimeout(
      () => setStartReveal(true),
      WORKING_DURATION + DONE_DURATION
    );

    return () => {
      window.clearTimeout(doneTimer);
      window.clearTimeout(revealTimer);
    };
  }, [reducedMotion, visible]);

  useEffect(() => {
    if (!visible) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.classList.add("intro-is-active");
    body.classList.add("intro-is-active");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.classList.remove("intro-is-active");
      body.classList.remove("intro-is-active");
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  const loader = (
    <div className="portfolio-intro-content">
      <LatticeLoader
        label="Initializing"
        doneLabel="Ready"
        status={phase === "working" ? "working" : "done"}
        pattern="orbit"
        grid={3}
        shape="round"
        cellSize={10}
        gap={3}
        fontSize={16}
        color="#f2eee7"
        doneColor="#f2eee7"
        showTimer={false}
      />
    </div>
  );

  if (reducedMotion) {
    return (
      <div
        className={`portfolio-intro portfolio-intro--${phase}`}
        aria-hidden="true"
      >
        {loader}
      </div>
    );
  }

  return (
    <PixelSwap
      trigger="manual"
      active={startReveal}
      pixelSize={80}
      gap={0}
      pixelRadius={0}
      pixelSpin={0}
      pixelScale={0.35}
      duration={1000}
      pixelDuration={420}
      pattern="center-out"
      randomness={0}
      fade
      firstContent={loader}
      secondContent={null}
      onComplete={completeIntro}
    />
  );
}
