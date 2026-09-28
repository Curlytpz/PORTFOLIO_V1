import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config — tells Vite to use the React plugin
// and to treat "/" as the root of the dev server.
export default defineConfig({
  plugins: [react()],
});