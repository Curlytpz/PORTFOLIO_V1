// main.jsx is the entry point of the React app.
// It mounts the <App /> component into the #root div in index.html.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Import your existing stylesheet. Because it's plain CSS,
// it applies globally — exactly like the old <link> tag did.
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing (URLs change without a full reload) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);