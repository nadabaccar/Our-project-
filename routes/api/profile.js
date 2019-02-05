var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const ValidateProfileInput = require("../../validation/ValidateProfile");

//Load user profile model
const User = require("../../models/user");

// @route GET api/profile
// @desc Gets current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    User.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/profile
// @desc Create user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return any error with 400 status
      return res.status(400).json(errors);
    }
    //get fields
    const profilefields = {};
    profilefields.id = req.user.id;
    profilefields.FirstName = req.body.FirstName;
    profilefields.LastName = req.body.LastName;
    profilefields.DateBirth = req.body.DateBirth;
    profilefields.Phone = req.body.Phone;
    profilefields.Adress = req.body.Adress;
    profilefields.Occupation = req.body.Occupation;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
router.delete("/users/:id", (req, res) => {
  Ad.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
