const Exp = require("../models/ExpData");
const User = require("../models/UserData");

module.exports = {
    async read(req, res) {
        return res.status(200).json({ msg: "deu certo" });
    },

    async new_procedure(req, res) {
        const { name, calc } = req.body;

        if (!name) {
            return res.status(422).json("msg: É necessário um nome");
        }
        if (!calc) {
            return res.status(422).json("msg: É necessário um modo de calculo");
        }

        const id = req.params.id;
        const user = await User.findById({ _id: id });

        const exp = new Exp({
            autor: user.name,
            name_of_experiment: name,
            modo_de_calculo: calc,
        });

        try {
            await exp.save();
            return res
                .status(200)
                .json({ msg: "Experimento criado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },
};
