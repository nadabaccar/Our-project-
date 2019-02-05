var express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const ExistingUser = require("../../models/user");

//load input validation
const ValidateProfileInput = require("../../validation/ValidateProfile");

// 5.@route POST api/user
// 6.@desc Create a user
// 7.@access Public

router.post("/", (req, res) => {
  const { errors, isValid } = ValidateProfileInput(req.body);
  //Check Validation
  if (!isValid) {
    res.status(400).json(errors);
  }
  ExistingUser.findOne({ email: req.body.email }).then(user => {
    if (user) return res.status(400).json({ email: "Email already exists" });
    else {
      const newUser = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        DateBirth: req.body.DateBirth,
        Email: req.body.Email,
        Password: req.body.Password,
        Phone: req.body.Phone,
        Adress: req.body.Adress,
        Occupation: req.body.Occupation,
        Motivation: req.body.Motivation,
        PhotoIdentity: req.body.PhotoIdentity,
        PieceIdentity: req.body.PieceIdentity,
        CV: req.body.CV,
        B3: req.body.B3
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(ExistingUser => res.json(ExistingUser))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
