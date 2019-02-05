const isEmpty = require("./isEmpty");
const isNumber = require("./isNumber");
const validator = require("validator");
module.exports = function ValidateProfileInput(data) {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.FirstName = !isEmpty(data.FirstName) ? data.FirstName : "";
  data.DateBirth = !isEmpty(data.DateBirth) ? data.DateBirth : "";
  data.Email = !isEmpty(data.Email) ? data.Email : "";
  data.Phone = !isEmpty(data.Phone) ? data.Phone : "";
  data.Adress = !isEmpty(data.Adress) ? data.Adress : "";
  data.Occupation = !isEmpty(data.Occupation) ? data.Occupation : "";
  data.Motivation = !isEmpty(data.Motivation) ? data.Motivation : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile handler is required";
  }

  if (!validator.isLength(data.FirstName, { min: 2, max: 15 })) {
    errors.FirstName = "Firstname is invalid";
  }

  if (validator.isEmpty(data.FirstName)) {
    errors.handle = "Firstname is required";
  }

  if (!validator.isEmpty(data.DateBirth)) {
    errors.DateBirth = "Date of birth is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!isNumber(data.Phone)) {
    errors.Phone = "Phone number is invalid";
  }

  if (validator.isEmpty(data.Phone)) {
    errors.Phone = "Phone field is required";
  }

  if (!validator.isLength(data.Adress, { min: 4, max: 400 })) {
    errors.Adress = "Adress must contain between 4 and 400 characters";
  }

  if (validator.isEmpty(data.Adress)) {
    errors.Adress = "Adress is required";
  }

  if (!validator.isLength(data.Occupation, { min: 4, max: 400 })) {
    errors.Occupation = "Occupation must contain between 4 and 400 characters";
  }

  if (validator.isEmpty(data.Occupation)) {
    errors.Occupation = "Occupation is required";
  }

  if (!validator.isLength(data.Motivation, { min: 4, max: 400 })) {
    errors.Motivation = "Motivation must contain between 4 and 400 characters";
  }
  if (validator.isEmpty(data.Motivation)) {
    errors.Motivation = "Motivation is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
