import { useEffect, useState } from "react";

const STORAGE_KEY = "portfolio-theme";
const modes = ["system", "light", "dark"];

function getInitialMode() {
  try {
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (modes.includes(savedMode)) return savedMode;
  } catch {
    // The selector works without stored preferences.
  }
  return "system";
}

function systemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function Icon({ mode }) {
  if (mode === "system") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="12" rx="2" />
        <path d="M8 20h8M12 16.5V20" />
      </svg>
    );
  }

  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 15.2A8 8 0 0 1 8.8 4.5 8 8 0 1 0 19.5 15.2Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const theme = mode === "system" ? systemTheme() : mode;
      const graduation =
        document.documentElement.dataset.graduationTheme === "true";

      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          graduation
            ? theme === "dark"
              ? "#160e0f"
              : "#fbf6f4"
            : theme === "dark"
              ? "#171613"
              : "#faf9f7"
        );
    };

    applyTheme();
    window.addEventListener("portfolio:intro-complete", applyTheme);
    window.addEventListener("portfolio:graduation-change", applyTheme);
    if (mode === "system") media.addEventListener("change", applyTheme);

    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // The selected mode still applies during this visit.
    }

    return () => {
      window.removeEventListener("portfolio:intro-complete", applyTheme);
      window.removeEventListener("portfolio:graduation-change", applyTheme);
      media.removeEventListener("change", applyTheme);
    };
  }, [mode]);

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      {modes.map((option) => (
        <button
          className={mode === option ? "is-selected" : ""}
          type="button"
          key={option}
          title={`Use ${option} theme`}
          aria-label={`${option} theme`}
          aria-pressed={mode === option}
          onClick={() => setMode(option)}
        >
          <Icon mode={option} />
        </button>
      ))}
    </div>
  );
}