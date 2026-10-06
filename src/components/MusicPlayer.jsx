import { useEffect, useRef, useState } from "react";
import defaultPlaylist from "../data/playlist.js";

function formatTime(value) {
  if (!Number.isFinite(value) || value < 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function MusicPlayer({ songs = defaultPlaylist }) {
  const audioRef = useRef(null);
  const playerRef = useRef(null);
  const tabRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  const hideMusic = () => {
    setIsHidden(true);
    window.dispatchEvent(new Event("portfolio-music-close"));
  };

  useEffect(() => {
    const closeForChat = () => hideMusic();
    window.addEventListener("portfolio-chat-open", closeForChat);
    return () => window.removeEventListener("portfolio-chat-open", closeForChat);
  }, []);

  const showMusic = () => {
    window.dispatchEvent(new Event("portfolio-music-open"));
    window.setTimeout(() => setIsHidden(false), 320);
  };

  const currentSong = songs[currentIndex] || songs[0];
  useEffect(() => {
    if (isHidden) return undefined;

    const closeOnOutsideClick = (event) => {
      if (playerRef.current?.contains(event.target) || tabRef.current?.contains(event.target)) return;
      hideMusic();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isHidden]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return undefined;

    audio.pause();
    audio.src = currentSong.src;
    audio.load();
    audio.volume = 0.45;
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return undefined;
  }, [currentIndex, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const updateTime = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setCurrentIndex((index) => (index + 1) % songs.length);
      setIsPlaying(true);
    };
    const handleError = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const selectSong = (index) => {
    setCurrentIndex(index);
  };

  const previousSong = () => {
    setCurrentIndex((index) => (index - 1 + songs.length) % songs.length);
  };

  const nextSong = () => {
    setCurrentIndex((index) => (index + 1) % songs.length);
  };

  const seek = (event) => {
    const nextTime = Number(event.target.value);
    if (!audioRef.current || !Number.isFinite(nextTime)) return;
    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  if (!currentSong || !songs.length) return null;

  return (
    <>
      <aside
        ref={playerRef}
        className={`music-player ${isHidden ? "is-hidden" : ""}`}
        aria-label="Music player"
      >
        <div className="music-player__heading">
          <p className="music-player__label">NOW PLAYING</p>
          <button
            className="music-player__hide"
            type="button"
            onClick={hideMusic}
            aria-label="Hide music player"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

      <div className="music-player__list" role="list">
        {songs.map((song, index) => (
          <button
            className={`music-player__song ${index === currentIndex ? "is-active" : ""}`}
            key={song.id || song.title}
            type="button"
            onClick={() => selectSong(index)}
            aria-pressed={index === currentIndex}
          >
            <span className="music-player__number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="music-player__song-copy">
              <span className="music-player__title">{song.title}</span>
              <span className="music-player__artist">{song.artist}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="music-player__controls">
        <button type="button" onClick={previousSong} aria-label="Previous song">
          <span aria-hidden="true">‹</span>
        </button>
        <button
          className="music-player__play"
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
        </button>
        <button type="button" onClick={nextSong} aria-label="Next song">
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="music-player__progress">
        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(currentTime, duration || 1)}
          onChange={seek}
          aria-label="Seek through current song"
          disabled={!duration}
        />
        <div className="music-player__time" aria-live="off">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} src={currentSong.src} preload="metadata" />
      </aside>
      {isHidden && (
        <button
          ref={tabRef}
          className="music-player__tab"
          type="button"
          onClick={showMusic}
          aria-label="Show music player"
        >
          <span aria-hidden="true">♫</span>
          <span className="music-player__tab-label">Music</span>
        </button>
      )}
    </>
  );
}
