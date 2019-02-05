const express = require("express");
const router = express.Router();

// 1. Import User Schema
const User = require("../../models/user");

// 2.@route GET api/user
// 3.@desc Get All users
// 4.@access Public

router.get("/users", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// 5.@route POST api/user
// 6.@desc Create a user
// 7.@access Public

router.post("/users", (req, res) => {
  const newUser = new User({
    isAdmin: req.body.isAdmin,
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
});
// 8.@route DELETE api/users/:id
// 9.@desc Delete a user
// 10.@access Public

router.delete("/users/:id", (req, res) => {
  Ad.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// 11.@route PUT api/ads/:id
// 12.@desc Update an ad
// 13.@access Public

router.put("/users/:id", (req, res) => {
  const updatedUser = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    DateBirth: req.body.DateBirth,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Adress: req.body.Adress,
    Occupation: req.body.Occupation,
    Motivation: req.body.Motivation,
    PhotoIdentity: req.body.PhotoIdentity,
    PieceIdentity: req.body.PieceIdentity,
    CV: req.body.CV,
    B3: req.body.B3
  };
  User.findOneAndUpdate({ _id: req.params.id }, updatedUser)
    .then(user => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
