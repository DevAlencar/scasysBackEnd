const express = require("express");
const routes = express.Router();

const UserController = require("../src/controllers/UserController");

routes.post("/user/auth/register", UserController.register);
routes.get("/user/auth/", UserController.read);

module.exports = routes;
