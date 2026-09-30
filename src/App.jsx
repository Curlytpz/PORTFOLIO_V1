import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout.jsx";
import Home from "./pages/Home.jsx";
import SeaItSolved from "./pages/SeaItSolved.jsx";
import Games from "./pages/Games.jsx";
import Experience from "./pages/Experience.jsx";
import IntroLoader from "./components/IntroLoader.jsx";

function Portfolio() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects/sea-it-solved" element={<SeaItSolved />} />
        <Route path="/playground" element={<Games />} />
        <Route path="/games" element={<Games />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/achievements" element={<Experience />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <>
      <Portfolio />
      <IntroLoader />
    </>
  );
}
