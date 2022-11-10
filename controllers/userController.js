const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
const User = require("../models/userSignUpModel");
const bcrypt = require("bcryptjs");

const register = async (req, res, next) => {
  console.log(req.file);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    picture: req.file.filename,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", " name", "email", "role", "picture"]));
};

const auth = async (req, res, next) => {
  const email = req.body.email;
  let user = await User.findOne({ email }).exec();
  if (!user) return res.status(400).send("Invalid Email");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  const token = user.generateAuthToken();
  res.send(token);
};

const currentUser = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};

exports.register = register;
exports.auth = auth;
exports.currentUser = currentUser;
