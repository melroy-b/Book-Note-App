import express from "express";

const router = express.Router();

//POST /auth/login - Initiate local auth flow
router.post("/login", (req, res) => {
  console.log("local login accessed");
});

//GET /auth/google - Initiate google auth flow
router.get("/google", (req, res) => {
  console.log("google login accessed");
});

//GET /auth/apple - Initiate apple auth flow
router.get("/apple", (req, res) => {
  console.log("apple login accessed");
});

export default router;
