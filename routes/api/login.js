var express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const ExistingUser = require("../../models/register");

const ValidateLoginInput = require("../../validation/login");
router.post("/", (req, res) => {
  console.log("ya bnti chbiki");
  const { errors, isValid } = ValidateLoginInput(req.body);
  //Check Validation
  if (!isValid) {
    res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  ExistingUser.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched
        const payload = { id: user.id, email: user.email }; //Create JWT Payload
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 21600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/login/currentuser
// @desc Return current user
// @access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("hzzzzzzi ya 5ra ");
    res.json({ id: req.user._id, email: req.user.email });
  }
);

router.get("/lol", (req, res) => {
  res.json({ lol: "loooooooool" });
});

module.exports = router;
