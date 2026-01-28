import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/books", bookRoutes);

// Test database connection
//await db.query("SELECT 1")

export default app;
