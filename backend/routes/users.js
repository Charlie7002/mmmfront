var express = require("express");
var router = express.Router();

var uid2 = require("uid2");
var bcrypt = require("bcrypt");

var userModel = require("../models/users");

// SIGNUP
router.post("/signup", async function (req, res, next) {
  let errors = [];
  let result = false;
  let saveUser = null;
  let token = null;

  const data = await userModel.findOne({
    email: req.body.emailFromFront,
  });

  if (
    req.body.usernameFromFront == "" ||
    req.body.emailFromFront == "" ||
    req.body.passwordFromFront == ""
  ) {
    errors.push("Veuillez remplir tous les champs.");
  }

  if (errors.length == 0) {
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
      password: hash,
      token: uid2(32),
    });

    saveUser = await newUser.save();

    if (saveUser) {
      result = true;
      token = saveUser.token;
    }
  }
  res.json({ result, saveUser, error, token });
});

// SIGNIN
router.post("/signin", async function (req, res, next) {
  let errors = [];
  let result = false;
  let user = null;
  let token = null;

  if (req.body.emailFromFront == "" || req.body.passwordFromFront == "") {
    errors.push("Veuillez remplir tous les champs.");
  }

  if (errors.length == 0) {
    user = await userModel.findOne({
      email: req.body.emailFromFront,
    });
    if (user) {
      if (bcrypt.compareSync(req.body.passwordFromFront, user.password)) {
        result = true;
        token = user.token;
      } else {
        result = false;
        errors.push("Mot de passe incorrect.");
      }
    } else {
      errors.push("Email incorrecte.");
    }
  }
  res.json({ result, user, errors, token });
});

// ADD MOVIE TO WISHLIST
router.post("/wishlist", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (
    user !== null &&
    !user.wishlist.find((movie) => movie.title === req.body.title)
  ) {
    user.wishlist.push({
      title: req.body.title,
      duration: req.body.duration,
      genre: req.body.genre,
      year: req.body.year,
    });

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});

// GET USER WISHLIST
router.get("/wishlist/:token", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.params.token });
  var movies = [];

  if (user !== null) {
    movies = user.wishlist;
    result = true;
  }

  res.json({ result, movies });
});

// DELETE MOVIES FROM WISHLIST
router.delete("/wishlist", async function (req, res) {
  var result = false;
  var user = await userModel.findOne({ token: req.body.token });

  if (user !== null) {
    user.wishlist = user.wishlist.filter((movie) => movie.title !== req.body.title);

    var userUpdated = await user.save();
    if (userUpdated) {
      result = true;
    }
  }

  res.json({ result });
});

module.exports = router;
