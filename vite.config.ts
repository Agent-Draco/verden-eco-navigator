import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Define health check plugin
const healthCheckPlugin = {
  name: "health-check",
  configureServer(server: any) {
    server.middlewares.use("/healthz", (req: any, res: any) => {
      res.statusCode = 200;
      res.end("OK");
    });
  },
  configurePreviewServer(server: any) {
    server.middlewares.use("/healthz", (req: any, res: any) => {
      res.statusCode = 200;
      res.end("OK");
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["verden-maps.onrender.com"],
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    healthCheckPlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
