const User = require("../models/UserData");
const Msg = require("../models/MsgData");
require("dotenv/config");

module.exports = {
    async send_msg(req, res) {
        const { msg, reason, page, user_email } = req.body;

        const information = new Msg({
            msg,
            reason,
            page,
            user_email,
        });

        try {
            await information.save();
            return res.status(201).json("msg: msg enviada com sucesso");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
};
