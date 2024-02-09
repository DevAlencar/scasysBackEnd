const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = {
    checkToken(req, res, next) {
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
    },
};
