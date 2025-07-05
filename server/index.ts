import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAnalysis } from "./routes/analyze";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" })); // Increase limit for large chat files
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Analysis route
  app.post("/api/analyze", handleAnalysis);

  return app;
}
