import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import GithubStrategy from "passport-github2";
import bcrypt from "bcrypt";
import db from "../db/index.js";
import env from "dotenv";

env.config();

/**
 * Returns the current session user when authenticated, otherwise responds 401.
 */
export const isAuthenticated = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

/**
 * Logs the current user out and redirects back to the client app.
 */
export const logout = (req, res) => {
  try {
    req.logout((err) => {
      if (err) next(err);
      res.redirect(`${process.env.CLIENT_URL}`);
    });
  } catch (error) {
    console.log("Error logging out: ", error);
  }
};

/**
 * Creates a local user account, logs the new user in, and redirects to the client.
 */
export const register_user = async (req, res) => {
  try {
    const {
      form_username: username,
      form_email: email,
      form_password: password,
    } = req.body;

    const user = await db.query(
      "SELECT * FROM users WHERE LOWER(email)=LOWER($1)",
      [email]
    );

    if (user.rows.length > 0) {
      console.log("User exists, redirecting to login page");
      res.redirect(`${process.env.CLIENT_URL}/login?info=user_already_exists`);
    } else {
      bcrypt.hash(password, 10, async (err, password_hash) => {
        if (err) console.log("Error hashing password: ", err);
        const user = await db.query(
          "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
          [username, password_hash, email]
        );

        req.logIn(user.rows[0], (err) => {
          if (err) console.log(err);
          res.redirect(`${process.env.CLIENT_URL}`);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Local strategy for username/email and password authentication.
passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "form_username", passwordField: "form_password" },
    async (identifier, password, cb) => {
      try {
        const user = await db.query(
          "SELECT * FROM users WHERE LOWER(email) = LOWER($1) OR LOWER(username) = LOWER($1) LIMIT 1",
          [identifier.trim()]
        );

        if (user.rows.length > 0) {
          const storedHashPassword = user.rows[0].password_hash;
          bcrypt.compare(password, storedHashPassword, (err, valid) => {
            if (err) cb(err);
            if (valid) return cb(null, user.rows[0]);
            else return cb(null, false);
          });
        } else return cb("User not found", false);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

// Google strategy creates or finds a user from the OAuth profile email.
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await db.query(
          "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
          [profile.email]
        );

        if (user.rows.length == 0) {
          user = await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [profile.displayName, profile.email, "google"]
          );
        }

        console.log("google auth successful, user: ", user.rows[0]);
        return cb(null, user.rows[0]);
      } catch (error) { 
        console.log(error);
        return cb(error);
      }
    }
  )
);

// GitHub strategy creates or finds a user from the OAuth profile email.
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        let user = await db.query(
          "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
          [profile._json.email]
        );

        if (user.rows.length == 0) {
          user = await db.query(
            "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
            [profile.username, profile._json.email, "github"]
          );
        }

        console.log("github auth successful, user: ", user.rows[0]);
        return cb(null, user.rows[0]);
      } catch (error) {
        console.log(error);
        return cb(error);
      }
    }
  )
);

// Store only the database user id in the session cookie.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Rehydrate the full user record for requests with an active session.
passport.deserializeUser(async (id, cb) => {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  cb(null, user.rows[0]);
});
