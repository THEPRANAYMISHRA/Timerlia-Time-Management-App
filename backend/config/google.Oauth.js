const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");


const client_id="628827310944-75rkruaato5218tphqtmtqnsvjqqfv2e.apps.googleusercontent.com"
const client_secret="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"




passport.use(
  new GoogleStrategy(

    {
      clientID: client_id,
      clientSecret: client_secret,
      // callbackURL: "http://localhost:9006/users/auth/google/callback",
      callbackURL: "https://timerlia.onrender.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = {
        name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        avatar: profile._json.picture,
      };
      
      return cb(null, user);
    }
  )
);

module.exports = passport ;