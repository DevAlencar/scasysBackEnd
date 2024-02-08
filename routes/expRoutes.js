const express = require("express");
const routes = express.Router();
require("dotenv/config");
const jwt = require("jsonwebtoken");

const ExpController = require("../src/controllers/ExpController");

routes.get("/1", checkToken, ExpController.read);

//permitir acesso aos métodos referentes aos experimentos
function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado" });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(400).json({ msg: "token inválido" });
    }
}

module.exports = routes;
