const express = require("express");
const routes = express.Router();
require("dotenv/config");

const ExpController = require("../src/controllers/ExpController");

routes.get("/1", ExpController.test);
routes.post("/2/:id", ExpController.new_procedure);

module.exports = routes;
