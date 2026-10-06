import { useEffect, useRef, useState } from "react";
import {
  resolveThemeMedia,
  useIsDarkPortfolioTheme,
} from "./ThemeAwareImage.jsx";

function getReducedMotionPreference() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function ProjectDemoVideo({ demo, autoPlayWhenVisible = false }) {
  const mediaRef = useRef(null);
  const lightVideoRef = useRef(null);
  const darkVideoRef = useRef(null);
  const isVisibleRef = useRef(false);
  const previousVariantRef = useRef("light");
  const activeVariantRef = useRef("light");
  const isDarkTheme = useIsDarkPortfolioTheme();
  const lightSource = resolveThemeMedia(demo.src, false);
  const darkSource = resolveThemeMedia(demo.src, true);
  const hasDarkVideo = lightSource !== darkSource;
  const activeVariant = hasDarkVideo && isDarkTheme ? "dark" : "light";
  const activePoster = resolveThemeMedia(demo.poster, isDarkTheme);
  activeVariantRef.current = activeVariant;
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getReducedMotionPreference
  );

  const getVideo = (variant) =>
    variant === "dark" && hasDarkVideo
      ? darkVideoRef.current
      : lightVideoRef.current;

  const pauseAllVideos = () => {
    lightVideoRef.current?.pause();
    darkVideoRef.current?.pause();
  };

  const playActiveVideo = () => {
    if (
      prefersReducedMotion ||
      !autoPlayWhenVisible ||
      !isVisibleRef.current
    ) {
      return;
    }

    const currentVariant = activeVariantRef.current;
    const activeVideo = getVideo(currentVariant);
    if (!activeVideo) return;

    const inactiveVideo = getVideo(currentVariant === "dark" ? "light" : "dark");
    if (inactiveVideo !== activeVideo) inactiveVideo?.pause();

    activeVideo.play().catch(() => {
      // Muted playback can still be declined by some browsers.
    });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return undefined;

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const previousVariant = previousVariantRef.current;
    if (previousVariant === activeVariant) return;

    const outgoingVideo = getVideo(previousVariant);
    const incomingVideo = getVideo(activeVariant);
    previousVariantRef.current = activeVariant;
    setIsReady(false);
    setHasError(false);

    if (!incomingVideo) return;

    const playbackPosition = outgoingVideo?.currentTime ?? 0;
    const shouldContinuePlaying =
      autoPlayWhenVisible &&
      !prefersReducedMotion &&
      isVisibleRef.current &&
      (outgoingVideo ? !outgoingVideo.paused : true);

    const synchronizeIncomingVideo = () => {
      if (Number.isFinite(playbackPosition) && playbackPosition > 0) {
        try {
          incomingVideo.currentTime = playbackPosition;
        } catch {
          // The browser will use the beginning if seeking is unavailable.
        }
      }

      if (shouldContinuePlaying) {
        incomingVideo.play().catch(() => {
          // Muted playback can still be declined by some browsers.
        });
      }
    };

    if (incomingVideo.readyState >= 1) {
      synchronizeIncomingVideo();
    } else {
      incomingVideo.addEventListener("loadedmetadata", synchronizeIncomingVideo, {
        once: true,
      });
    }

    outgoingVideo?.pause();
  }, [activeVariant, autoPlayWhenVisible, prefersReducedMotion]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !autoPlayWhenVisible) return undefined;

    if (prefersReducedMotion) {
      pauseAllVideos();
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      isVisibleRef.current = true;
      playActiveVideo();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          playActiveVideo();
        } else {
          pauseAllVideos();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(media);
    return () => {
      observer.disconnect();
      pauseAllVideos();
    };
  }, [autoPlayWhenVisible, hasDarkVideo, prefersReducedMotion]);

  const handleCanPlay = (variant) => {
    if (variant !== activeVariant) return;

    setIsReady(true);
    playActiveVideo();
  };

  const videoProps = (variant, source, ref) => ({
    ref,
    className: [
      "project-demo__video",
      hasDarkVideo && "project-demo__video--theme-variant",
      hasDarkVideo && `project-demo__video--${variant}`,
      variant === activeVariant && "is-active",
    ]
      .filter(Boolean)
      .join(" "),
    src: source,
    controls: variant === activeVariant,
    autoPlay: autoPlayWhenVisible && !prefersReducedMotion && variant === activeVariant,
    loop: true,
    muted: true,
    playsInline: true,
    preload: hasDarkVideo ? "auto" : "metadata",
    poster: activePoster,
    "aria-label": demo.title,
    "aria-hidden": variant !== activeVariant,
    tabIndex: variant === activeVariant ? 0 : -1,
    onCanPlay: () => handleCanPlay(variant),
    onError: () => {
      if (variant === activeVariant) setHasError(true);
    },
  });

  return (
    <figure
      className={[
        "project-demo",
        isReady && "is-ready",
        hasError && "has-error",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={!isReady && !hasError}
    >
      <div className="project-demo__media" ref={mediaRef}>
        <video {...videoProps("light", lightSource, lightVideoRef)}>
          Your browser does not support MP4 video.
        </video>
        {hasDarkVideo ? (
          <video {...videoProps("dark", darkSource, darkVideoRef)}>
            Your browser does not support MP4 video.
          </video>
        ) : null}
        <p className="project-demo__loading" aria-live="polite">
          {hasError ? "Demo video could not load." : "Loading system demo…"}
        </p>
      </div>
    </figure>
  );
}
