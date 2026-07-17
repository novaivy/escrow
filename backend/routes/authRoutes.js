const express = require('express');
const { register, login } =require("../controllers/authController.js");
const auth = require('../middleware/auth.js');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;