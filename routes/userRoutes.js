const express = require("express");
const routes = express.Router();
const middleware = require("../middleware/checkToken");
const Validate = require("../validations/userValidations");
const User = require("../src/models/UserData");

const UserController = require("../src/controllers/UserController");

routes.post("/register", UserController.register);
routes.get("/login", UserController.login);
routes.delete("/delete/:id", middleware.checkToken, UserController.delete);

module.exports = routes;
