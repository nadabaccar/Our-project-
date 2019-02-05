var express = require("express");
const router = express.Router();

const Ad = require("../../models/ad");

// @route GET api/ads
// @desc Get All Ads
// @access Public

console.log("i am here");

router.get("/frfr", (req, res) => {
  console.log("frrfrf");
  Ad.find()
    .sort({ date: -1 })
    .then(ad => res.json(ad))
    .catch(err => res.json(err));
});

router.get("/krkr", (req, res) => {
  res.json({ lol: "loooooooool" });
});

module.exports = router;
