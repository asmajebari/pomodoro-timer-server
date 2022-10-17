const express = require ('express');
const passport = require('passport');

const router = new express.Router();
const clientUrl = process.env.CLIENT_URL_DEV;

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);


router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateAuthToken();
    user = req.user;
    token.then((token) => {
      cookiePayload = { user, token };
      res.cookie('auth', JSON.stringify(cookiePayload));
      res.redirect(`${clientUrl}/auth/google`);
    });
  },
);

module.exports = router;