const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const loginCheck = require("./middleware");

router.get("/", loginCheck(), (req, res, next) => {
  console.log("it enters ");
  res.render("auth/onboarding", { user: req.session.user });
});

router.post("/", loginCheck(), async (req, res, next) => {
  try {
    const { username, keyword } = req.body;
    const id = req.session.user._id;
    await console.log("it finished the onboarding");
    // const user = await User.findById(id);
    // await console.log(user);
    await User.findOneAndUpdate({ _id: id }, { keyword: keyword });
    await res.redirect("/dashboard");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
