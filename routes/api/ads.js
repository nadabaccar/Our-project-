const express = require("express");
const router = express.Router();

// Import ad Schema
const Ad = require("../../models/ad");

// @route GET api/ads
// @desc Get All Ads
// @access Public

router.get("/", (req, res) => {
  Ad.find()
    .sort({ date: -1 })
    .then(ad => res.json(ad))
    .catch(err => res.json(err));
});

// @route POST api/ads
// @desc Creat An ad
// @access Public

//AJOUT D'UNE ANNONCE
router.post("/", (req, res) => {
  const newAd = new Ad({
    typeofAd: req.body.typeofAd,
    title: req.body.title,
    description: req.body.description,
    remuneration: req.body.remuneration,
    date: req.body.date,
    UserID: req.body.UserIDs
  });

  newAd
    .save()
    .then(ad => res.json(ad))
    .catch(err => res.json(err));
});

// @route DELETE api/ads/:id
// @desc Delete an ad
// @access Public

router.delete("/:id", (req, res) => {
  Ad.findById(req.params.id)
    .then(ad => ad.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/ads/:id
// @desc Update an ad
// @access Public

// router.put("/:id", (req, res) => {
//   const updatedAd = new Ad({
//     title: req.body.title,
//     description: req.body.description,
//     remuneration: req.body.remuneration
//   });
//   Ad.findOneAndUpdate(req.params.id, { $set: updatedAd }, function(err, ad) {
//     if (err) return res.json(err);
//     res.send("Ad udpated.", ad);
//   });
// });

router.put("/:id", (req, res) => {
  const updatedAd = {
    typeofAd: req.body.typeofAd,
    title: req.body.title,
    description: req.body.description,
    remuneration: req.body.remuneration,
    date: req.body.date,
    UserID: req.body.UserID
  };
  Ad.findOneAndUpdate({ _id: req.params.id }, updatedAd)
    .then(ad => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
