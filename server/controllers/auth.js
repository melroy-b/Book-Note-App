import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import AppleStrategy from "passport-apple";
import bcrypt from "bcrypt";
import db from "../db/index.js";

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

        console.log(user.rows[0]);
        if (user.rows.length > 0) {
          const storedHashPassword = user.rows[0].password_hash;
          bcrypt.compare(password, storedHashPassword, (err, valid) => {
            if (err) cb(err);
            if (valid) return cb(null, user.rows[0]);
            else return cb(null, false);
          });
        } else cb("User not found", false);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

export const register_user = async (req, res) => {
  const {
    form_username: username,
    form_email: email,
    form_password: password,
  } = req.body;

  try {
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
          res.redirect(`${process.env.CLIENT_URL}`);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  cb(null, user.rows[0]);
});
