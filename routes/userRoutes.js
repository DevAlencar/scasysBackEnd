const express = require("express");
const routes = express.Router();

const UserController = require("../src/controllers/UserController");

routes.post("/register", UserController.register);
routes.get("/login", UserController.login);

module.exports = routes;
