import { useEffect, useRef, useState } from "react";

function getReducedMotionPreference() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function ProjectDemoVideo({ demo, autoPlayWhenVisible = false }) {
  const videoRef = useRef(null);
  const isVisibleRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getReducedMotionPreference
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return undefined;

    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlayWhenVisible) return undefined;

    const playVideo = () => {
      if (prefersReducedMotion || !isVisibleRef.current) return;
      video.play().catch(() => {
        // Muted playback can still be declined by some browsers.
      });
    };

    if (prefersReducedMotion) {
      video.pause();
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      isVisibleRef.current = true;
      playVideo();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          playVideo();
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [autoPlayWhenVisible, prefersReducedMotion]);

  const handleCanPlay = () => {
    setIsReady(true);
    if (autoPlayWhenVisible && !prefersReducedMotion && isVisibleRef.current) {
      videoRef.current?.play().catch(() => {
        // Muted playback can still be declined by some browsers.
      });
    }
  };

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
      <div className="project-demo__media">
        <video
          ref={videoRef}
          className="project-demo__video"
          controls
          autoPlay={autoPlayWhenVisible && !prefersReducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          poster={demo.poster}
          aria-label={demo.title}
          onCanPlay={handleCanPlay}
          onError={() => setHasError(true)}
        >
          <source src={demo.src} type="video/mp4" />
          Your browser does not support MP4 video.
        </video>
        <p className="project-demo__loading" aria-live="polite">
          {hasError ? "Demo video could not load." : "Loading system demo…"}
        </p>
      </div>
    </figure>
  );
}