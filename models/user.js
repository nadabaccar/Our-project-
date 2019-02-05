const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const UserSchema = new Schema({
  user: {
    //associate the user with his ID
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  isAdmin: {
    type: Boolean
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  DateBirth: {
    type: Date,
    default: Date.now
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Phone: {
    type: Number,
    required: true
  },
  Adress: {
    type: String,
    required: true
  },
  Occupation: {
    type: String,
    required: true
  },
  Motivation: {
    type: String,
    required: true
  },
  PhotoIdentity: {
    type: String,
    required: true
  },
  PieceIdentity: {
    type: String,
    required: true
  },
  CV: {
    type: String,
    required: true
  },
  B3: {
    type: String,
    required: true
  }
});

module.exports = user = mongoose.model("user", UserSchema);
