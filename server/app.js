import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import bookRouter from "./routes/bookRoutes.js"; // For book related routes
import authRouter from "./routes/authRoutes.js"; // For auth routes
import db from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, "");

// Render terminates HTTPS before forwarding traffic to Express.
app.set("trust proxy", 1);

// Allow the React client to send session cookies with API requests.
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure cookie-backed sessions used by Passport authentication.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    },
  })
);

// Attach Passport authentication and session state to each request.
app.use(passport.initialize());
app.use(passport.session());

//api endpoint for routing client requests
app.use("/api/books", bookRouter);

//auth endpoint for routing local and oauth flows
app.use("/auth", authRouter);

// Test database connection
//await db.query("SELECT 1")

// Test route to verify server is running
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Book Note API" });
});

export default app;
