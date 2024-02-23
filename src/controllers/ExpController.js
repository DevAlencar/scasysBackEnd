const Exp = require("../models/ExpData");
const User = require("../models/UserData");

module.exports = {
    async test(req, res) {
        return res.status(200).json({ msg: "deu certo" });
    },

    //Create new experiment
    async new_procedure(req, res) {
        const { name, calc } = req.body;

        //name validation
        if (!name) {
            return res.status(422).json("msg: É necessário um nome");
        }
        //calc validation
        if (!calc) {
            return res.status(422).json("msg: É necessário um modo de calculo");
        }

        //User  search
        const id = req.params.id;
        const user = await User.findById({ _id: id });

        //create experiment
        const exp = new Exp({
            autor: user.name,
            name_of_experiment: name,
            modo_de_calculo: calc,
        });

        //experiment save
        try {
            await exp.save();
            return res
                .status(200)
                .json({ msg: "Experimento criado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_inventory_stage(req, res) {
        const { inventory_stage } = req.body;
        const id = req.params.id;

        //validations
        for (let i = 0; i < inventory_stage.properties.length; i++) {
            if (!inventory_stage.properties[i].stage) {
                return res.status(422).json({ msg: "É necessário um estágio" });
            }
            if (!inventory_stage.properties[i].name) {
                return res.status(422).json({ msg: "É necessário um nome" });
            }
            if (!inventory_stage.properties[i].num_of_reps) {
                return res
                    .status(422)
                    .json({ msg: "É necessário um numero de repetições" });
            }
            if (!inventory_stage.properties[i].especifity) {
                return res
                    .status(422)
                    .json({ msg: "É necessário uma especificidade" });
            }
            if (!inventory_stage.properties[i].item) {
                return res.status(422).json({ msg: "É necessário um item" });
            }
            if (!inventory_stage.properties[i].chem_form) {
                return res
                    .status(422)
                    .json({ msg: "É necessário uma formula quimica" });
            }
            for (
                let x = 0;
                x < inventory_stage.properties[i].quantity.length;
                x++
            ) {
                if (!inventory_stage.properties[i].quantity[x].value) {
                    return res
                        .status(422)
                        .json({ msg: "É necessário valores" });
                }
            }
            if (!inventory_stage.properties[i].unit) {
                return res
                    .status(422)
                    .json({ msg: "É necessário uma unidade" });
            }
            if (!inventory_stage.properties[i].observation) {
                return res
                    .status(422)
                    .json({ msg: "É necessário uma observação" });
            }
        }

        //TODO: adicionar etapa de calculo;

        //find experiment
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                inventory_stage,
            }
        );

        //save
        try {
            await exp.save();
            return res
                .status(200)
                .json({ msg: "Fase de invetário adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },
};
