const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const adSchema = new Schema({
  typeofAd: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  remuneration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  UserID: {
    type: String,
    required: true
  }
});

module.exports = ad = mongoose.model("ad", adSchema);
