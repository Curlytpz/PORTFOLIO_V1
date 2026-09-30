import FlipCard from "./FlipCard.jsx";
import profilePhoto from "../assets/kris.png";
import graduationPhoto from "../assets/graduation-photo.jpg";

export default function Hero() {
  const handleFlipChange = (flipped) => {
    if (flipped) {
      document.documentElement.dataset.graduationTheme = "true";
    } else {
      document.documentElement.removeAttribute("data-graduation-theme");
    }

    window.dispatchEvent(new Event("portfolio:graduation-change"));
  };

  return (
    <section className="intro container" aria-labelledby="intro-name">
      <p className="intro-eyebrow">01 — Introduction</p>

      <div className="intro-identity">
        <div className="intro-photo-frame">
          <FlipCard
            axis="y"
            initialFlipped={document.documentElement.dataset.graduationTheme === "true"}
            flipOnClick
            draggable={false}
            tilt
            tiltMax={5}
            glare
            glareOpacity={0.08}
            hoverScale={1.025}
            perspective={1000}
            stiffness={180}
            damping={22}
            radius={16}
            shadow
            shadowOpacity={0.12}
            ariaLabel="Profile photo — click to flip"
            onFlipChange={handleFlipChange}
            front={
              <img
                src={profilePhoto}
                alt="Portrait of Kris Benedict Delos Santos"
                className="intro-photo intro-photo--front"
                draggable="false"
              />
            }
            back={
              <img
                src={graduationPhoto}
                alt="Graduation portrait of Kris Benedict Delos Santos"
                className="intro-photo intro-photo--back"
                draggable="false"
              />
            }
          />
        </div>

        <div className="intro-heading">
          <h1 id="intro-name">Kris Benedict Delos Santos</h1>
          <p>Computer Engineering student &amp; aspiring web developer</p>
        </div>
      </div>

      <div className="intro-copy">
        <p>
          I&rsquo;m a Computer Engineering student focused on web development,
          software engineering, and AI-powered applications. I build practical
          full-stack systems while continuously developing my skills through
          hands-on projects.
        </p>
        <p>
          I use AI-assisted development tools as part of my workflow for
          prototyping, debugging, and iteration, while maintaining an
          understanding of the architecture, technologies, and code behind the
          systems I build.
        </p>
      </div>
    </section>
  );
}