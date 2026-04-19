import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import bookRouter from "./routes/bookRoutes.js";
import authRouter from "./routes/authRoutes.js";
import db from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//api endpoint for routing client requests
app.use("/api/books", bookRouter);

//auth endpoint for routing local and oauth flows
app.use("/auth", authRouter);

// Test database connection
//await db.query("SELECT 1")

export default app;
