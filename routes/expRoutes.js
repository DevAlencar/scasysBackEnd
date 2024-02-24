const express = require("express");
const routes = express.Router();
require("dotenv/config");

const ExpController = require("../src/controllers/ExpController");

routes.get("/test", ExpController.test);
routes.post("/newExp/:id", ExpController.new_procedure);
routes.post("/invetoryStage/:id", ExpController.add_inventory_stage);
routes.post("/ppgrStage/:id", ExpController.add_ppgr_stage);
routes.post("/securityStageOne/:id", ExpController.add_security_stage_one);
routes.post("/cmStage/:id", ExpController.add_cm_stage);
routes.post("/securityStageTwo/:id", ExpController.add_security_stage_two);
routes.post("/ceStage/:id", ExpController.add_ce_stage);
routes.post("/energyStage/:id", ExpController.add_energy_stage);
routes.post("/ambStages/:id", ExpController.add_amb_stages);
routes.post("/waterCons/:id", ExpController.add_water_cons);
routes.post("/radIonStage/:id", ExpController.add_rad_ion_stage);
routes.post("/resorCosumStage/:id", ExpController.add_resor_cosum_stage);
routes.post("/holAmbStage/:id", ExpController.add_hol_amb_stage);
routes.post("/results/:id", ExpController.add_results);

module.exports = routes;
