const express = require("express");
const { register, login, logout, current } = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", authenticate, logout);

authRouter.get("/current", authenticate, current);

module.exports = authRouter;
