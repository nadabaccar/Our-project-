const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//passport = main authentification module
const passport = require("passport");

const path = require("path");
const ads = require("./routes/api/ads");
const zab = require("./routes/api/zab");
const register = require("./routes/api/registeruser");

const users = require("./routes/api/users");
const login = require("./routes/api/login");
const profile = require("./routes/api/profile");
const app = express();

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db Config
const db = require("./config/keys").mongoURI;
console.log("test", db);

// Connect to Mongo

mongoose
  .connect(db)
  .then(() => console.log("MongoDb Connected..."))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

// Use Routes
// app.get("/", (req, res) => {
//   res.send("heloooo");
//   console.log("sdfsdf");
// });

app.use("/api/users", users);
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profQZile", profile);
app.use("/api/ads", ads);

// Serve static assets if in production

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
