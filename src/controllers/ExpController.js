const Exp = require("../models/ExpData");
const User = require("../models/UserData");
const FtData = require("../models/FtData");

module.exports = {
    async test(req, res) {
        return res.status(200).json({ msg: "deu certo" });
    },

    //Create new experiment
    async new_procedure(req, res) {
        const { name, calc } = req.body;

        //User  search
        const id = req.params.id;
        const user = await User.findById({ _id: id });

        //create experiment
        const exp = new Exp({
            autor: user.name,
            autor_id: id,
            name_of_experiment: name,
            modo_de_calculo: calc,
        });

        //experiment save
        try {
            await exp.save();
            return res
                .status(201)
                .json({ msg: "Experimento criado com sucesso" });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    async delete_procedure(req, res) {
        const expId = req.params.expId;
        const userId = req.params.userId;

        const [exp, user] = await Promise.all([
            Exp.findById({ _id: expId }),
            User.findById({ _id: userId }),
        ]);

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }
        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        try {
            if (user.id === exp.autor_id) {
                await Exp.deleteOne({ _id: expId });
            }
            return res
                .status(201)
                .json({ msg: "Experimento deletado com sucesso" });
        } catch (err) {
            return res
                .status(500)
                .json({ msg: "serverError: experimento não deletado" });
        }
    },

    async add_inventory_stage_with_ppwg(req, res) {
        const { inventory_stage } = req.body;
        const id = req.params.id;
        let { mmrSum, mtdrSum, mtadSum, mtrWithFt } = 0;
        let { indicesInvStDeg, indicesElemDeg } = [];

        //validations
        for (let i = 0; i < inventory_stage.properties.length; i++) {
            if (!inventory_stage[i].stage) {
                return res.status(422).json({ msg: "É necessário um estágio" });
            }
            if (!inventory_stage[i].name) {
                return res.status(422).json({ msg: "É necessário um nome" });
            }
            if (!inventory_stage[i].num_of_reps) {
                return res
                    .status(422)
                    .json({ msg: "É necessário um numero de repetições" });
            }
            for (let j = 0; j < inventory_stage[i].elements.length; j++) {
                //contador de elementos que sao degradáveis
                if (
                    inventory_stage[i].elements[j].isDegradable[0]
                        .verification === true
                ) {
                    indicesElemDeg.push(i);
                    indicesInvStDeg.push(j);
                }
                if (!inventory_stage[i].elements[j].especifity) {
                    return res
                        .status(422)
                        .json({ msg: "É necessário uma especificidade" });
                }
                if (!inventory_stage[i].elements[j].item) {
                    return res
                        .status(422)
                        .json({ msg: "É necessário um item" });
                }
                if (!inventory_stage[i].elements[j].chem_form) {
                    return res
                        .status(422)
                        .json({ msg: "É necessário uma formula quimica" });
                }
                for (
                    let k = 0;
                    k < inventory_stage[i].elements[j].quantity.length;
                    k++
                ) {
                    if (!inventory_stage[i].elements[j].quantity[x].value) {
                        return res
                            .status(422)
                            .json({ msg: "É necessário valores" });
                    }
                    //criação de somatórios
                    if (
                        inventory_stage[i].elements[j].especifity === "Residuo"
                    ) {
                        mmrSum =
                            mmrSum +
                            inventory_stage[i].elements[j].quantity[x].value;
                    }
                    if (inventory_stage[i].elements[j].isRecyclable === true) {
                        mtdrSum =
                            mtdrSum +
                            inventory_stage[i].elements[j].quantity[x].value;
                    }
                    if (
                        inventory_stage[i].elements[j].isBioDeposited === true
                    ) {
                        mtadSum =
                            mtadSum +
                            inventory_stage[i].elements[j].quantity[x].value;
                    }
                    if (
                        inventory_stage[i].elements[j].isDegradable[0]
                            .verification === true
                    ) {
                        mtrWithFt +=
                            inventory_stage[i].elements[j].quantity[x].value *
                            inventory_stage[i].elements[j].isDegradable[0].ft;
                    }
                }
                if (!inventory_stage[i].elements[j].unit) {
                    return res
                        .status(422)
                        .json({ msg: "É necessário uma unidade" });
                }
            }
        }

        //create Ft Data
        for (let i = 0; i < indicesInvStDeg.length; i++) {
            for (let j = 0; j < indicesElemDeg.length; j++) {
                let ftSave = new FtData({
                    exp_id: id,
                    quim_component: inventory_stage[i].elements[j].chem_form,
                    ft: inventory_stage[i].elements[j].isDegradable[0].ft,
                    src: inventory_stage[i].elements[j].isDegradable[0].src,
                });

                await ftSave.save();
            }
        }

        let ppwg_result = (mmrSum - mtdrSum - mtadSum - mtrWithFt) / totalMass;
        ppwg_result = 1 - ppwg_result;

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                inventory_stage,
                ppwg_result,
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

    async add_ppwg_stage(req, res) {
        const { ppwg_stage, mtrWithFt, ft_data, totalMass } = req.body;
        const id = req.params.id;

        //todo: verificar se é necessário salvar os dados dos somatorios

        //validations
        if (!ppwg_stage.mrr) {
            return res.status(422).json({ msg: "É necessário o valor de mrr" });
        }
        if (!ppwg_stage.mtdr) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de MTDR" });
        }
        if (!ppwg_stage.mtad) {
            return res
                .status(422)
                .json({ msg: "É necessário o valor de MTAD" });
        }
        if (!ppwg_stage.mtr) {
            return res.status(422).json({ msg: "É necessário o valor de mtr" });
        }
        if (!ppwg_stage.ft) {
            return res.status(422).json({ msg: "É necessário o valor de ft" });
        }
        if (!ppwg_stage.src) {
            return res.status(422).json({ msg: "É necessário uma fonte" });
        }

        let ppwg_result =
            (ppwg_stage.mtr - ppwg_stage.mrr - ppwg_stage.mtad - mtrWithFt) /
            totalMass;
        ppwg_result = 1 - ppwg_result;

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                ppwg_stage,
                ppwg_result,
            }
        );
        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        const ftSave = new FtData({
            exp_id: id,
            ft_data,
        });

        //save
        try {
            await ftSave.save();
            return res
                .status(201)
                .json({ msg: "Fase de ppwg adicionado com sucesso" });
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
        const exp = await Exp.findByIdAndUpdate(
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
        const exp = await Exp.findByIdAndUpdate(
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
        const exp = await Exp.findByIdAndUpdate(
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
                .status(201)
                .json({ msg: "Fase de Segurança 2 adicionada com sucesso" });
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
        const exp = await Exp.findByIdAndUpdate(
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
        const exp = await Exp.findByIdAndUpdate(
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
        const exp = await Exp.findByIdAndUpdate(
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

    async add_water_cons(req, res) {
        const { water_cons } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                water_cons,
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
                .json({ msg: "Fase Agua adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_rad_ion_stage(req, res) {
        const { rad_ion } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                rad_ion,
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
                .json({ msg: "Fase Radio adicionada com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_resor_cosum_stage(req, res) {
        const { resor_cosum } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                resor_cosum,
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
                .json({ msg: "Fase resor_cosum adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_hol_amb_stage(req, res) {
        const { hol_amb } = req.body;
        const id = req.params.id;

        //TODO:validations

        //TODO:adicionar os calculos

        //find experiment and update
        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                hol_amb,
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
                .json({ msg: "Fase hol_amb adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_results(req, res) {
        const id = req.params.id;
        const exp = await Exp.findById({ _id: id });
    },

    async get_results(req, res) {
        const id = req.params.id;
        const exp = await Exp.findById({ _id: id });
    },
};
