var mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema
const RegisterSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = register = mongoose.model("register", RegisterSchema);
