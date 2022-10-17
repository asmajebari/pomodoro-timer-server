const express = require("express");
const auth = require("../middleware/auth");
const {
  httpAddUser,
  httpDeleteUser,
  httpUpdateUser,
  httpGetUser,
  httpLogin,
  httpLogout,
} = require("../controllers/user.controller");
const router = new express.Router();

router.post("/register", httpAddUser);

router.post("/login", httpLogin);

router.get("/me", auth, httpGetUser);

router.post("/logout", auth, httpLogout);

router.patch("/me", auth, httpUpdateUser);

router.delete("/me", auth, httpDeleteUser);

module.exports = router;
