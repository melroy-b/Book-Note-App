import express from "express";
import passport from "passport";
import { register_user } from "../controllers/auth.js";

const router = express.Router();

//POST /auth/login - Initiate local auth flow
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=invalid_credentials`,
  })
);

router.post("/register", register_user);

//GET /auth/google - Initiate google auth flow
router.get("/google", (req, res) => {
  console.log("google login accessed");
});

//GET /auth/apple - Initiate apple auth flow
router.get("/apple", (req, res) => {
  console.log("apple login accessed");
});

export default router;
