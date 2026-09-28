// App.jsx defines the routes for the whole site.
// Each <Route> maps a URL to a page component.

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SeaItSolved from "./pages/SeaItSolved.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/sea-it-solved" element={<SeaItSolved />} />
    </Routes>
  );
}