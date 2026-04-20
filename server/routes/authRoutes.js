import express from "express";
import passport from "passport";
import { register_user, isAuthenticated, logout } from "../controllers/auth.js";

const router = express.Router();

//GET /auth/me - route to check if the user is already authenticated with a session running
router.get("/me", isAuthenticated);

//GET /auth/logout - to logout from current session
router.get("/logout", logout);

//POST /auth/login - Initiate local auth flow
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=invalid_credentials`,
  }),
);
router.post("/register", register_user);

//GET /auth/google - Initiate google auth flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
// /auth/google/callback - handle google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=invalid_credentials`,
  }),
);

//GET /auth/github - Initiate github auth flow
router.get("/github", (req, res) => {
  console.log("github login accessed");
});

export default router;
