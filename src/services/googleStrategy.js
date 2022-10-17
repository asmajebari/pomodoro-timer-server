const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/user.model');

const serverUrl = process.env.SERVER_URL_DEV;

// google strategy
const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}/auth/google/callback`,
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const oldUser = await User.findOne({ email: profile.email });
        if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const newUser = await new User({
        username: profile.displayName,
        email: profile.email,
        avatar: profile.picture,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  },
);

passport.use(googleLogin);