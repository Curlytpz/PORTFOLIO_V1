import { useEffect, useState } from "react";
import {
  SiCss,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRender,
  SiSupabase,
  SiTailwindcss,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { LuBraces } from "react-icons/lu";
import { VscVscode } from "react-icons/vsc";
import canvaLogo from "../assets/canva.svg";

function CanvaIcon({ className, ...props }) {
  return (
    <img
      className={`${className} tech-icon--canva`}
      src={canvaLogo}
      alt=""
      {...props}
    />
  );
}

const groups = [
  {
    label: "Frontend",
    items: [
      { label: "HTML", icon: SiHtml5 },
      { label: "CSS", icon: SiCss },
      { label: "JavaScript", icon: SiJavascript },
      { label: "React", icon: SiReact },
      { label: "Vite", icon: SiVite },
      { label: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    label: "Backend & Database",
    items: [
      { label: "Node.js", icon: SiNodedotjs },
      { label: "Express.js", icon: SiExpress },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "Supabase", icon: SiSupabase },
      { label: "Firebase", icon: SiFirebase },
      { label: "REST API", icon: LuBraces },
    ],
  },
  {
    label: "Tools & Deployment",
    items: [
      { label: "Git", icon: SiGit },
      { label: "GitHub", icon: SiGithub },
      { label: "VS Code", icon: VscVscode },
      { label: "Vercel", icon: SiVercel },
      { label: "Render", icon: SiRender },
      { label: "Figma", icon: SiFigma },
      { label: "Canva", icon: CanvaIcon },
    ],
  },
];

function TechIcon({ item }) {
  const Icon = item.icon;
  const iconClass = `tech-icon tech-icon--${item.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
  return <Icon className={iconClass} aria-hidden="true" focusable="false" />;
}

function TechPill({ item, isOpen, onToggle }) {
  const tooltipId = `tech-tooltip-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <li>
      <button
        className="tech-tooltip-trigger"
        type="button"
        aria-label={item.label}
        aria-pressed={isOpen}
        onClick={onToggle}
        data-open={isOpen || undefined}
      >
        <TechIcon item={item} />
        <span className="tech-tooltip" id={tooltipId} role="tooltip">
          {item.label}
        </span>
      </button>
    </li>
  );
}

export default function TechStack() {
  const [openLabel, setOpenLabel] = useState(null);

  useEffect(() => {
    const closeTooltipOutside = (event) => {
      if (!event.target.closest(".tech-tooltip-trigger")) setOpenLabel(null);
    };
    const closeTooltipWithEscape = (event) => {
      if (event.key === "Escape") setOpenLabel(null);
    };

    document.addEventListener("pointerdown", closeTooltipOutside);
    document.addEventListener("keydown", closeTooltipWithEscape);
    return () => {
      document.removeEventListener("pointerdown", closeTooltipOutside);
      document.removeEventListener("keydown", closeTooltipWithEscape);
    };
  }, []);

  useEffect(() => {
    if (!openLabel) return undefined;

    const timeoutId = window.setTimeout(() => setOpenLabel(null), 1000);
    return () => window.clearTimeout(timeoutId);
  }, [openLabel]);

  return (
    <section className="tech-stack container">
      <h2 className="section-label">04 — Tech Stack</h2>

      {groups.map((group) => (
        <div className="tech-group" key={group.label}>
          <h3 className="tech-group-label">{group.label}</h3>
          <ul className="tech-pills">
            {group.items.map((item) => (
              <TechPill
                key={item.label}
                item={item}
                isOpen={openLabel === item.label}
                onToggle={() =>
                  setOpenLabel((current) =>
                    current === item.label ? null : item.label
                  )
                }
              />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
