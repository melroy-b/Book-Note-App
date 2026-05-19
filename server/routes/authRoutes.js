import express from "express";
import passport from "passport";
import { register_user, isAuthenticated, logout } from "../controllers/auth.js";

const router = express.Router();

const getSafeReturnTo = (returnTo) => {
  if (typeof returnTo !== "string" || !returnTo.startsWith("/")) return "/";
  if (returnTo.startsWith("//")) return "/";
  return returnTo;
};

const storeReturnTo = (req, res, next) => {
  req.session.oauthReturnTo = getSafeReturnTo(req.query.returnTo);
  req.session.save((err) => {
    if (err) return next(err);
  });
  next();
};

const handleOAuthCallback = (provider) => (req, res, next) => {
  passport.authenticate(
    provider,
    {
      failureRedirect: `${process.env.CLIENT_URL}/login?error=invalid_credentials`,
    },
    (err, user) => {
      if (err) return next(err);
      if (!user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=invalid_credentials`
        );
      }

      const returnTo = getSafeReturnTo(req.session.oauthReturnTo);
      req.logIn(user, (loginError) => {
        delete req.session.oauthReturnTo;
        if (loginError) return next(loginError);
        return res.redirect(`${process.env.CLIENT_URL}${returnTo}`);
      });
    }
  )(req, res, next);
};

//GET /auth/me - route to check if the user is already authenticated with a session running
router.get("/me", isAuthenticated);

//GET /auth/logout - to logout from current session
router.get("/logout", logout);

//POST /auth/login - Initiate local auth flow
router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    //successRedirect: `${process.env.CLIENT_URL}/`,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=invalid_credentials`,
  })
);
router.post("/register", register_user);

//GET /auth/google - Initiate google auth flow
router.get(
  "/google",
  storeReturnTo,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// /auth/google/callback - handle google callback
router.get("/google/callback", handleOAuthCallback("google"));

//GET /auth/github - Initiate github auth flow
router.get(
  "/github",
  storeReturnTo,
  passport.authenticate("github", { scope: ["user:email"] })
);
//GET /auth/github/callback - handle github callback
router.get("/github/callback", handleOAuthCallback("github"));

export default router;
