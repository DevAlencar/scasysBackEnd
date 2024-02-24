const express = require("express");
const routes = express.Router();
require("dotenv/config");

const ExpController = require("../src/controllers/ExpController");

routes.get("/test", ExpController.test);
routes.post("/newExp/:id", ExpController.new_procedure);
routes.post("/invetoryStage/:id", ExpController.add_inventory_stage);
routes.post("/ppgrstage/:id", ExpController.add_ppgr_stage);
routes.post("/securitystageone/:id", ExpController.add_security_stage_one);

module.exports = routes;
