import { useEffect, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase.js";

const initialErrors = { email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M3.5 5.5h17v13h-17zM4.5 6.5 12 13l7.5-6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const previousFocusRef = useRef(null);

  const closeDrawer = () => {
    if (status === "loading") return;
    setIsOpen(false);
    window.setTimeout(() => setIsMounted(false), 320);
  };

  const openDrawer = () => {
    previousFocusRef.current = document.activeElement;
    setIsMounted(true);
    window.requestAnimationFrame(() => setIsOpen(true));
  };

  useEffect(() => {
    if (!isMounted) {
      previousFocusRef.current?.focus?.();
      return undefined;
    }

    const scrollY = window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll(
          "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]"
        )
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, [isMounted, isOpen]);

  const resetFeedback = () => {
    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;
    if (honeypot.trim()) return;

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const nextErrors = { ...initialErrors };

    if (!trimmedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (trimmedEmail.length > 254) {
      nextErrors.email = "Email addresses must be 254 characters or fewer.";
    } else if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!trimmedMessage) {
      nextErrors.message = "Please enter a message.";
    } else if (trimmedMessage.length > 2000) {
      nextErrors.message = "Messages must be 2000 characters or fewer.";
    }

    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.message) {
      setStatus("error");
      setFeedback("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      await addDoc(collection(db, "contactMessages"), {
        email: trimmedEmail,
        message: trimmedMessage,
        createdAt: serverTimestamp(),
      });

      setName("");
      setEmail("");
      setMessage("");
      setHoneypot("");
      setErrors(initialErrors);
      setStatus("success");
      setFeedback("✓ Message sent successfully. I’ll get back to you as soon as I can.");
    } catch {
      setStatus("error");
      setFeedback("Something went wrong while sending your message. Please try again.");
    }
  };

  return (
    <>
      <section id="contact" className="contact container">
        <h2 className="section-label">06 — Let&apos;s Connect</h2>
        <p className="contact-text">
          I&apos;m currently looking for internship opportunities in web development
          and IT, and I&apos;m open to collaborating on practical projects.
        </p>
        <p className="contact-links">
          <a href="mailto:krisbenedict2delossantos@gmail.com?subject=Portfolio%20Inquiry" className="external">
            Email <span className="arrow">↗</span>
          </a>
          <a href="https://github.com/Curlytpz" className="external" target="_blank" rel="noopener noreferrer">
            GitHub <span className="arrow">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/kris-santos-21b134280" className="external" target="_blank" rel="noopener noreferrer">
            LinkedIn <span className="arrow">↗</span>
          </a>
        </p>
        <button className="contact-inline-trigger" type="button" onClick={openDrawer}>
          SEND ME A MESSAGE <span className="arrow">→</span>
        </button>
      </section>

      {!isMounted ? (
        <button ref={triggerRef} className="contact-trigger" type="button" onClick={openDrawer} aria-label="Open message panel">
          <MailIcon />
          <span>MESSAGE</span>
        </button>
      ) : null}

      {isMounted ? (
        <>
          <button className={`contact-backdrop ${isOpen ? "is-open" : ""}`} type="button" aria-label="Close message panel" onClick={closeDrawer} />
          <aside ref={drawerRef} className={`contact-drawer ${isOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="contact-drawer-title">
            <div className="contact-drawer__inner">
              <header className="contact-drawer__header">
                <div>
                  <p className="contact-drawer__eyebrow">CONTACT</p>
                  <h2 id="contact-drawer-title">SEND A MESSAGE</h2>
                  <p>Have a project, opportunity, or just want to say hello? Drop me a message below.</p>
                </div>
                <button ref={closeButtonRef} className="contact-drawer__close" type="button" onClick={closeDrawer} aria-label="Close message panel">
                  ×
                </button>
              </header>

              <form className="contact-drawer__form" onSubmit={handleSubmit} noValidate>
                <div className="contact-drawer__field">
                  <label htmlFor="contact-name">Name <span>(optional)</span></label>
                  <input id="contact-name" name="name" type="text" value={name} maxLength={120} placeholder="Your name" autoComplete="name" onChange={(event) => { setName(event.target.value); resetFeedback(); }} />
                </div>
                <div className="contact-drawer__field">
                  <label htmlFor="contact-email-drawer">Email</label>
                  <input id="contact-email-drawer" name="email" type="email" value={email} maxLength={254} placeholder="your@email.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} onChange={(event) => { setEmail(event.target.value); resetFeedback(); }} />
                  {errors.email ? <p id="contact-email-error" className="contact-drawer__error" role="alert">{errors.email}</p> : null}
                </div>
                <div className="contact-drawer__field contact-drawer__field--message">
                  <div className="contact-drawer__label-row">
                    <label htmlFor="contact-message-drawer">Message</label>
                    <span>{message.length} / 2000</span>
                  </div>
                  <textarea id="contact-message-drawer" name="message" value={message} maxLength={2000} placeholder="Write your message..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={(event) => { setMessage(event.target.value); resetFeedback(); }} />
                  {errors.message ? <p id="contact-message-error" className="contact-drawer__error" role="alert">{errors.message}</p> : null}
                </div>
                <div className="contact-drawer__honeypot" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </div>
                <div className="contact-drawer__actions">
                  <button className="contact-drawer__submit" type="submit" data-status={status} disabled={status === "loading"}>
                    {status === "loading" ? "SENDING..." : status === "success" ? "MESSAGE SENT ✓" : status === "error" ? "TRY AGAIN →" : "SEND MESSAGE →"}
                  </button>
                  <p className="contact-drawer__feedback" aria-live="polite" role="status">{feedback}</p>
                </div>
              </form>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}