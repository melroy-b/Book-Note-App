import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/books", bookRoutes);

// 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});


export default app;