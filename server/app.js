import express from "express";
import cors from "cors";
import router from "./routes/bookRoutes.js";
import db from "./db/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

//api endpoint for routing client requests
app.use("/api/books", router);

// 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});


export default app;