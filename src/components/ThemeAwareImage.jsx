import { useEffect, useState } from "react";

export function resolveThemeMedia(media, isDarkTheme) {
  if (typeof media === "string") return media;
  if (!media) return "";

  return (isDarkTheme ? media.dark : media.light) || media.light || media.dark || "";
}

export function useIsDarkPortfolioTheme() {
  const getCurrentTheme = () =>
    typeof document !== "undefined" &&
    document.documentElement.dataset.theme === "dark";

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => setIsDarkTheme(root.dataset.theme === "dark");
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkTheme;
}

export default function ThemeAwareImage({ media, alt, className = "" }) {
  const isDarkTheme = useIsDarkPortfolioTheme();
  const lightSrc = resolveThemeMedia(media, false);
  const darkSrc = resolveThemeMedia(media, true);
  const hasDarkVariant = lightSrc !== darkSrc;

  return (
    <span
      className={`theme-media ${hasDarkVariant && isDarkTheme ? "is-dark" : ""}`}
    >
      <img
        className={`theme-media__image theme-media__image--light ${className}`.trim()}
        src={lightSrc}
        alt={alt}
      />
      {hasDarkVariant ? (
        <img
          className={`theme-media__image theme-media__image--dark ${className}`.trim()}
          src={darkSrc}
          alt=""
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}
