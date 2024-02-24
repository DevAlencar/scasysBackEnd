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

        console.log(exp);

        //experiment save
        try {
            await exp.save();
            return res
                .status(201)
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

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                inventory_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

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

    async add_ppgr_stage(req, res) {
        const { ppgr_stage } = req.body;
        const id = req.params.id;

        //validations
        if (!ppgr_stage.mmr) {
            return res.status(422).json({ msg: "É necessário o valor de MMR" });
        }
        if (!ppgr_stage.mtdr) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de MTDR" });
        }
        if (!ppgr_stage.mtad) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de MTAD" });
        }
        if (!ppgr_stage.td) {
            return res.status(422).json({ msg: "É necessário o valor de TD" });
        }
        if (!ppgr_stage.f) {
            return res.status(422).json({ msg: "É necessário o valor de F" });
        }
        if (!ppgr_stage.src) {
            return res.status(422).json({ msg: "É necessário uma fonte" });
        }

        //TODO: adicionar métodos de calculo

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                ppgr_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(201)
                .json({ msg: "Fase de ppgr adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_security_stage_one(req, res) {
        const { security_stage_one } = req.body;
        const id = req.params.id;

        //validations
        if (!security_stage_one.exposition.quim_comp) {
            return res
                .status(422)
                .json({ msg: "É necessário um componente químico" });
        }
        if (!security_stage_one.exposition.conc_tox_lim.value) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de limite tóxico" });
        }
        if (!security_stage_one.exposition.conc_tox_lim.unit) {
            return res
                .status(422)
                .json({ msg: "É necessário uma unidade para limite tóxico" });
        }
        if (!security_stage_one.exposition.exp_time.value) {
            return res.status(422).json({
                msg: "É necessário o valor para o tempo de exposição",
            });
        }
        if (!security_stage_one.exposition.exp_time.unit) {
            return res.status(422).json({
                msg: "É necessário uma unidade para o tempo de exposição",
            });
        }
        if (!security_stage_one.exposition.src) {
            return res.status(422).json({ msg: "É necessário uma fonte" });
        }

        //TODO: adicionar métodos de calculo

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                security_stage_one,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fase de segurança 1 adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_cm_stage(req, res) {
        const { cm_stage } = req.body;
        const id = req.params.id;

        //validations
        if (!cm_stage.quim_comp) {
            return res
                .status(422)
                .json({ msg: "É necessário um componente químico" });
        }
        if (!cm_stage.cancer) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de cancer" });
        }
        if (!cm_stage.src) {
            return res.status(422).json({ msg: "É necessário uma fonte" });
        }

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                cm_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fase CM adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_security_stage_two(req, res) {
        const { security_stage_two } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                security_stage_two,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fase CM adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_ce_stage(req, res) {
        const { ce_stage } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                ce_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fase CE adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_energy_stage(req, res) {
        const { energy_stage } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                energy_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fase Energia adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_amb_stages(req, res) {
        const { global_warm, oz_dan, pot_foto, pot_ac } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = Exp.findByIdAndUpdate(
            { _id: id },
            {
                global_warm,
                oz_dan,
                pot_foto,
                pot_ac,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            exp.save;
            return res
                .status(500)
                .json({ msg: "Fases Ambientais adicionadas com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },
};
