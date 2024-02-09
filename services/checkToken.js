const jwt = require("jsonwebtoken");
require("dotenv/config");

function checkToken(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado" });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(400).json({ msg: "token inválido" });
    }
}
