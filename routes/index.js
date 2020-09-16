const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const loginCheck = require("./middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
