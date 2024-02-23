const express = require("express");
const routes = express.Router();
require("dotenv/config");

const ExpController = require("../src/controllers/ExpController");

routes.get("/test", ExpController.test);
routes.post("/newExp/:id", ExpController.new_procedure);
routes.post("/invetoryStage/:id", ExpController.add_inventory_stage);

module.exports = routes;
