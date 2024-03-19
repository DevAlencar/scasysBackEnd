const express = require("express");
const routes = express.Router();
const middleware = require("../middleware/checkToken");

const UserController = require("../src/controllers/UserController");

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);
routes.delete("/delete/:id", middleware.checkToken, UserController.delete);

module.exports = routes;
