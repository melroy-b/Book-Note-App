import express from "express";
import cors from "cors";
import router from "./routes/bookRoutes.js";
import db from "./db/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

//api endpoint for routing client requests
app.use("/api/books", router);

// Test database connection
//await db.query("SELECT 1")

export default app;
