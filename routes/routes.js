const express = require("express");
const routes = express.Router();

const AnnotationController = require("../src/controllers/AnnotationController");
const PriorityController = require("../src/controllers/PriorityController");
const ContentController = require("../src/controllers/ContentController");

//annotations
routes.get("/annotations", AnnotationController.read);
routes.post("/annotations", AnnotationController.create);
routes.delete("/annotations/:id", AnnotationController.delete);

//priority
routes.get("/priorities", PriorityController.read);
routes.post("/priorities/:id", PriorityController.update);

//content
routes.post("/contents/:id", ContentController.update);

module.exports = routes;
