import express from "express";
import passport from "passport";
import { register_user, isAuthenticated, logout } from "../controllers/auth.js";

const router = express.Router();

/**
 * Normalizes redirect targets so auth flows only redirect within the client app.
 */
const getSafeReturnTo = (returnTo) => {
  if (typeof returnTo !== "string" || !returnTo.startsWith("/")) return "/";
  if (returnTo.startsWith("//")) return "/";
  return returnTo;
};

/**
 * Stores the requested client-side return path in the session before login.
 */
const storeReturnTo = (req, res, next) => {
  req.session.oauthReturnTo = getSafeReturnTo(req.query.returnTo);
  console.log("Return to : " + req.session.oauthReturnTo);
  req.session.save((err) => {
    if (err) return next(err);
    next();
  });
};

/**
 * Runs a Passport strategy and redirects the user back to their original page.
 */
const handleOAuthCallback = (provider) => (req, res, next) => {
  passport.authenticate(provider, (err, user) => {
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
  })(req, res, next);
};

// GET /auth/me - check if the user is already authenticated.
router.get("/me", isAuthenticated);
// POST /auth/register - register a new user with local credentials.
router.post("/register", register_user);

//---------- LOCAL AUTH -------------//

// POST /auth/login - authenticate username/email and password credentials.
router.post("/login", storeReturnTo, handleOAuthCallback("local"));

//---------- GOOGLE OAUTH2 -------------//

// GET /auth/google - initiate the Google OAuth flow.
router.get(
  "/google",
  storeReturnTo,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// GET /auth/google/callback - complete Google OAuth authentication.
router.get("/google/callback", handleOAuthCallback("google"));

//---------- GITHUB OAUTH -------------//

// GET /auth/github - initiate the GitHub OAuth flow.
router.get(
  "/github",
  storeReturnTo,
  passport.authenticate("github", { scope: ["user:email"] })
);
// GET /auth/github/callback - complete GitHub OAuth authentication.
router.get("/github/callback", handleOAuthCallback("github"));

//---------- LOGOUT -------------//

// GET /auth/logout - end the current authenticated session.
router.get("/logout", logout);

export default router;
