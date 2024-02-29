const express = require("express");
const routes = express.Router();

const MsgController = require("../src/controllers/MsgController");

routes.post("/sendMsg", MsgController.send_msg);

module.exports = routes;
