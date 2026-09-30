import {
  SiCss,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiVite,
} from "react-icons/si";
import { LuBraces } from "react-icons/lu";
import { VscVscode } from "react-icons/vsc";
import canvaLogo from "../assets/canva.svg";

function CanvaIcon({ className, ...props }) {
  return (
    <span
      className={`${className} tech-icon--canva`}
      style={{ "--tech-icon-mask": `url(${canvaLogo})` }}
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
    label: "Backend",
    items: [
      { label: "Node.js", icon: SiNodedotjs },
      { label: "Express.js", icon: SiExpress },
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "Supabase", icon: SiSupabase },
      { label: "JWT", icon: SiJsonwebtokens },
      { label: "REST API", icon: LuBraces },
    ],
  },
  {
    label: "Developer Tools",
    items: [
      { label: "Git", icon: SiGit },
      { label: "GitHub", icon: SiGithub },
      { label: "VS Code", icon: VscVscode },
      { label: "Figma", icon: SiFigma },
      { label: "Canva", icon: CanvaIcon },
    ],
  },
];

const capabilities = [
  {
    label: "Networking",
    items: [
      "Cisco Packet Tracer",
      "Routing & Switching",
      "IP Addressing",
      "Subnetting",
      "DHCP",
      "NAT",
      "ACL",
    ],
  },
  {
    label: "Hardware & Embedded",
    items: [
      "PC Assembly",
      "Hardware Troubleshooting",
      "Arduino",
      "Raspberry Pi",
      "Sensors",
      "Microcontrollers",
      "Breadboarding",
      "Soldering",
      "Camera Integration",
    ],
  },
  {
    label: "Engineering Tools",
    items: ["KiCad", "PCB Design"],
  },
];

function TechIcon({ item }) {
  const Icon = item.icon;
  const iconClass = `tech-icon tech-icon--${item.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
  return <Icon className={iconClass} aria-hidden="true" focusable="false" />;
}

export default function TechStack() {
  return (
    <section className="tech-stack container">
      <h2 className="section-label">04 — Tech Stack</h2>

      {groups.map((group) => (
        <div className="tech-group" key={group.label}>
          <h3 className="tech-group-label">{group.label}</h3>
          <ul className="tech-pills">
            {group.items.map((item) => (
              <li key={item.label}>
                <TechIcon item={item} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="technical-capabilities">
        <p className="technical-capabilities__label">
          Additional hands-on capabilities
        </p>
        <div className="technical-capabilities__grid">
          {capabilities.map((group) => (
            <section className="capability-group" key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(" · ")}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
