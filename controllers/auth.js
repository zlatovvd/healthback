const { HttpError, controllerWrapper } = require("../helpers");
const { User } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email is in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const payload = { id: newUser._id, name: newUser.name };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });

  await User.findByIdAndUpdate(newUser._id, { token }, { new: true });

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      name: newUser.name
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id, name: user.name };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });

  await User.findByIdAndUpdate(user._id, { token }, { new: true });

  res.status(200).json({
    token,
    user: {
      id: user._id,
      email,
      name: user.name
    },
  });
};

const logout = async (req, res) => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  //res.status(204).json({ message: "Logout success" });
  res.json({
    status: "success",
    code: 204,
    data: {
      message: "Logout success",
    },
  });
};

const current = (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current,
};
