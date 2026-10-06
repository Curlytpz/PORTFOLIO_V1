import { useEffect, useRef, useState } from "react";
import { chatbotIntents, fallbackAnswer } from "../data/portfolioKnowledge.js";

const suggestions = ["About", "Projects", "Skills", "Thesis", "Certifications", "Education", "IT Support", "Contact"];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function findAnswer(question) {
  const normalized = normalize(question);
  if (!normalized) return { text: fallbackAnswer, action: null };

  const ranked = chatbotIntents
    .map((intent) => {
      const score = intent.keywords.reduce((total, keyword) => {
        return total + (normalized.includes(normalize(keyword)) ? normalize(keyword).length : 0);
      }, 0);
      return { intent, score };
    })
    .sort((first, second) => second.score - first.score);

  const match = ranked[0]?.score ? ranked[0].intent : null;
  return {
    text: match?.answer || fallbackAnswer,
    action: match && ["resume", "experience", "education", "skills", "projects", "certifications"].includes(match.id) ? "resume" : null,
  };
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const chatRef = useRef(null);
  const responseTimerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [question, setQuestion] = useState("");
  useEffect(() => {
    const closeForMusic = () => {
      setIsOpen(false);
      setIsMusicOpen(true);
    };
    const restoreAfterMusic = () => setIsMusicOpen(false);
    window.addEventListener("portfolio-music-open", closeForMusic);
    window.addEventListener("portfolio-music-close", restoreAfterMusic);
    return () => {
      window.removeEventListener("portfolio-music-open", closeForMusic);
      window.removeEventListener("portfolio-music-close", restoreAfterMusic);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!chatRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);
  const openChat = () => {
    window.dispatchEvent(new Event("portfolio-chat-open"));
    window.setTimeout(() => setIsOpen(true), 320);
  };

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Ask me about Kris's education, projects, skills, thesis, or background.",
    },
  ]);

  const ask = (value = question) => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) return;

    const timestamp = Date.now();
    const answer = findAnswer(trimmed);
    setMessages((current) => [
      ...current,
      { id: `${timestamp}-question`, role: "user", text: trimmed },
    ]);
    setQuestion("");
    setIsTyping(true);

    window.clearTimeout(responseTimerRef.current);
    responseTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `${timestamp}-answer`,
          role: "assistant",
          text: answer.text,
          action: answer.action,
        },
      ]);
      setIsTyping(false);
      responseTimerRef.current = null;
    }, 650);
  };

  return (
    <div ref={chatRef} className={`portfolio-chat ${isOpen ? "is-open" : ""}`}>
      <section
        className={`portfolio-chat__panel ${isOpen ? "is-visible" : ""}`}
        aria-label="Ask about Kris"
        aria-hidden={!isOpen}
      >
        <header className="portfolio-chat__header">
          <div>
            <p className="portfolio-chat__eyebrow">LOCAL GUIDE</p>
            <h2>Ask about Kris</h2>
          </div>
          <button
            className="portfolio-chat__close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close Ask about Kris"
          >
            ×
          </button>
        </header>

        <div className="portfolio-chat__messages" aria-live="polite">
          {messages.map((message) => (
            <p
              className={`portfolio-chat__message portfolio-chat__message--${message.role}`}
              key={message.id}
            >
              {message.text}
              {message.action === "resume" ? (
                <a
                  className="portfolio-chat__cv-action"
                  href="/assets/Kris_Benedict_Delos_Santos_CV_ATS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW CV <span className="arrow">↗</span>
                </a>
              ) : null}
            </p>
          ))}
          {isTyping ? (
          <p className="portfolio-chat__typing" role="status" aria-label="Kris is typing">
            Typing<span aria-hidden="true">…</span>
          </p>
          ) : null}
        </div>

        <div className="portfolio-chat__suggestions" aria-label="Suggested questions">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => ask(suggestion)}
              disabled={isTyping}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          className="portfolio-chat__form"
          onSubmit={(event) => {
            event.preventDefault();
            ask();
          }}
        >
          <label className="sr-only" htmlFor="portfolio-chat-question">
            Ask about Kris
          </label>
          <input
            id="portfolio-chat-question"
            disabled={isTyping}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question"
            autoComplete="off"
          />
          <button type="submit" aria-label="Send question" disabled={isTyping}>
            →
          </button>
        </form>
      </section>

      {!isOpen && !isMusicOpen && (
        <button
          className="portfolio-chat__trigger"
          type="button"
          onClick={openChat}
          aria-label="Open Ask about Kris"
        >
          <span aria-hidden="true">?</span>
          <span>Ask about Kris</span>
        </button>
      )}
    </div>
  );
}
