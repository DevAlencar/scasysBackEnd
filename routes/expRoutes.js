const express = require("express");
const routes = express.Router();
require("dotenv/config");

const ExpController = require("../src/controllers/ExpController");

routes.get("/1", ExpController.read);

module.exports = routes;
