const Exp = require("../models/ExpData");
const User = require("../models/UserData");
const TdData = require("../models/TdData");
const EeData = require("../models/EeData");

const toISUnits = require("../toISUnits/toSIUnits");

module.exports = {
    //Create new experiment
    async new_procedure(req, res) {
        let { name, calc } = req.body;

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
            return res.status(201).json({ msg: "Experimento criado com sucesso", id: exp._id });
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    async delete_procedure(req, res) {
        const expId = req.params.expId;
        const userId = req.params.userId;

        const [exp, user] = await Promise.all([Exp.findById({ _id: expId }), User.findById({ _id: userId })]);

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
            return res.status(201).json({ msg: "Experimento deletado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError: experimento não deletado" });
        }
    },

    async add_inventory_stage(req, res) {
        const { inventory_stage } = req.body;
        const id = req.params.id;
        let indicesElemDeg = [];
        let indicesInvStDeg = [];
        let indicesEtapa = [];

        //validations
        for (let i = 0; i < inventory_stage.length; i++) {
            //falar p arthur essa linha
            if (!inventory_stage[i].name) {
                return res.status(422).json({ msg: "É necessário um estágio" });
            }
            for (let l = 0; l < inventory_stage[i].etapa.length; l++) {
                if (!inventory_stage[i].etapa[l].name) {
                    return res.status(422).json({ msg: "É necessário um nome" });
                }

                if (!inventory_stage[i].etapa[l].num_of_reps) {
                    return res.status(422).json({ msg: "É necessário um numero de repetições" });
                }

                for (let j = 0; j < inventory_stage[i].etapa[l].elements.length; j++) {
                    //verificando e guardando os indices dos elementos que sao degradáveis
                    if (inventory_stage[i].etapa[l].elements[j].isDegradable !== undefined) {
                        indicesElemDeg.push(j);
                        indicesInvStDeg.push(i);
                        indicesEtapa.push(l);
                    }

                    if (!inventory_stage[i].etapa[l].elements[j].especifity) {
                        return res.status(422).json({ msg: "É necessário uma especificidade" });
                    }

                    if (!inventory_stage[i].etapa[l].elements[j].item) {
                        return res.status(422).json({ msg: "É necessário um item" });
                    }

                    if (!inventory_stage[i].etapa[l].elements[j].chem_form) {
                        return res.status(422).json({ msg: "É necessário uma formula quimica" });
                    }

                    for (let k = 0; k < inventory_stage[i].etapa[l].elements[j].quantity.length; k++) {
                        if (!inventory_stage[i].etapa[l].elements[j].quantity[k].value) {
                            return res.status(422).json({ msg: "É necessário valores" });
                        }
                    }

                    if (!inventory_stage[i].etapa[l].elements[j].unit) {
                        return res.status(422).json({ msg: "É necessário uma unidade" });
                    }
                }
            }
        }

        //calculando a concentracao de cada elemento em seu conjunto
        for (let i = 0; i < inventory_stage.length; i++) {
            for (let l = 0; l < inventory_stage[i].etapa.length; l++) {
                let massaDoConjuntoEmGrama = 0;
                for (let j = 0; j < inventory_stage[i].etapa[l].elements.length; j++) {
                    let massaDoElementoEmGrama = 0;
                    for (let k = 0; k < inventory_stage[i].etapa[l].elements[j].quantity.length; k++) {
                        //verificacao de unidade de medida
                        let massaEmGrama = 0;
                        if (inventory_stage[i].etapa[l].elements[j].unit !== "gramas") {
                            if (inventory_stage[i].etapa[l].elements[j].density === null) {
                                //verificando se tem ou nao densidade, se nao tiver, se trata de um valor em massa e segue o fluxo normal, se tiver, é outra conversao;
                                massaEmGrama = toISUnits.conversions(
                                    inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas"
                                );
                            } else {
                                //precisa de alteracao na funcao chamada para funcionar
                                massaEmGrama = toISUnits.conversions(
                                    inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas",
                                    inventory_stage[i].etapa[l].elements[j].density
                                );
                            }
                        } else {
                            massaEmGrama = inventory_stage[i].etapa[l].elements[j].quantity[k].value;
                        }
                        massaDoConjuntoEmGrama += massaEmGrama;
                    }
                }
                for (let j = 0; j < inventory_stage[i].etapa[l].elements.length; j++) {
                    let massaDoElementoEmGrama = 0;
                    for (let k = 0; k < inventory_stage[i].etapa[l].elements[j].quantity.length; k++) {
                        //verificacao de unidade de medida
                        let massaEmGrama = 0;
                        if (inventory_stage[i].etapa[l].elements[j].unit !== "gramas") {
                            if (inventory_stage[i].etapa[l].elements[j].density === null) {
                                //verificando se tem ou nao densidade, se nao tiver, se trata de um valor em massa e segue o fluxo normal, se tiver, é outra conversao;
                                massaEmGrama = toISUnits.conversions(
                                    inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas"
                                );
                            } else {
                                //precisa de alteracao na funcao chamada para funcionar
                                massaEmGrama = toISUnits.conversions(
                                    inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas",
                                    inventory_stage[i].etapa[l].elements[j].density
                                );
                            }
                        } else {
                            massaEmGrama = inventory_stage[i].etapa[l].elements[j].quantity[k].value;
                        }
                        massaDoElementoEmGrama += massaEmGrama;
                    }
                    inventory_stage[i].etapa[l].elements[j].concentrationInSet =
                        massaDoElementoEmGrama / massaDoConjuntoEmGrama;
                }
            }
        }

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
            //create TD Data
            for (let i = 0; i < indicesInvStDeg.length; i++) {
                let tdSave = new TdData({
                    exp_id: id,
                    quim_component:
                        inventory_stage[indicesInvStDeg[i]].etapa[indicesEtapa[i]].elements[indicesElemDeg[i]]
                            .chem_form,
                    td: inventory_stage[indicesInvStDeg[i]].etapa[indicesEtapa[i]].elements[indicesElemDeg[i]]
                        .isDegradable[0].td,
                    src: inventory_stage[indicesInvStDeg[i]].etapa[indicesEtapa[i]].elements[indicesElemDeg[i]]
                        .isDegradable[0].src,
                });
                await tdSave.save();
            }
            await exp.save();
            return res.status(200).json({ msg: "Fase de invetário adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_bombona_stage(req, res) {
        const { bombona_stage } = req.body;
        const id = req.params.id;

        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                bombona_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        try {
            await exp.save();
            return res.status(200).json({ msg: "Fase bombona adicionada com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_etc_stage(req, res) {
        const { etc_stage } = req.body;
        const id = req.params.id;

        const exp = await Exp.findByIdAndUpdate(
            { _id: id },
            {
                etc_stage,
            }
        );

        if (!exp) {
            return res.status(404).json({ msg: "Experimento não encontrado" });
        }

        //save
        try {
            //create ee Data
            for (let i = 0; i < etc_stage.length; i++) {
                let eeSave = new EeData({
                    exp_id: id,
                    quim_component: etc_stage[i].quim_component,
                    ee: etc_stage[i].ee,
                    src: etc_stage[i].src,
                });
                await eeSave.save();
            }
            await exp.save();
            return res.status(200).json({ msg: "Fase etc adicionada com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    /*async add_ppwg_stage(req, res) {
        const { ppwg_stage, mdtrWithFt, ft_data, totalMass } = req.body;
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
            (ppwg_stage.mtr - ppwg_stage.mrr - ppwg_stage.mtad - mdtrWithFt) /
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
    },*/

    async add_security_stage_one(req, res) {
        const { security_stage_one } = req.body;
        const id = req.params.id;

        //validations
        if (!security_stage_one.exposition.quim_comp) {
            return res.status(422).json({ msg: "É necessário um componente químico" });
        }
        if (!security_stage_one.exposition.conc_tox_lim.value) {
            return res.status(422).json({ msg: "É necessário o valor de limite tóxico" });
        }
        if (!security_stage_one.exposition.conc_tox_lim.unit) {
            return res.status(422).json({ msg: "É necessário uma unidade para limite tóxico" });
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
            return res.status(500).json({ msg: "Fase de segurança 1 adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async add_cm_stage(req, res) {
        const { cm_stage } = req.body;
        const id = req.params.id;

        //validations
        if (!cm_stage.quim_comp) {
            return res.status(422).json({ msg: "É necessário um componente químico" });
        }
        if (!cm_stage.cancer) {
            return res.status(422).json({ msg: "É necessário o valor de cancer" });
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
            return res.status(500).json({ msg: "Fase CM adicionado com sucesso" });
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
            return res.status(201).json({ msg: "Fase de Segurança 2 adicionada com sucesso" });
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
            return res.status(500).json({ msg: "Fase CE adicionado com sucesso" });
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
            return res.status(500).json({ msg: "Fase Energia adicionado com sucesso" });
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
            return res.status(500).json({ msg: "Fases Ambientais adicionadas com sucesso" });
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
            return res.status(500).json({ msg: "Fase Agua adicionado com sucesso" });
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
            return res.status(500).json({ msg: "Fase Radio adicionada com sucesso" });
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
            return res.status(500).json({ msg: "Fase resor_cosum adicionado com sucesso" });
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
            return res.status(500).json({ msg: "Fase hol_amb adicionado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async get_calc1(req, res) {
        const id = req.params.id;
        const exp = await Exp.findById({ _id: id });

        //calc 1 itens;
        let mtrSum = 0;
        let mrrSum = 0;
        let mtadWithF = 0;
        let mdtrWithFt = 0;
        let totalMass = 0;

        //início do cálculo 1;
        for (let i = 0; i < exp.inventory_stage.length; i++) {
            for (let l = 0; l < exp.inventory_stage[i].etapa.length; l++) {
                for (let j = 0; j < exp.inventory_stage[i].etapa[l].elements.length; j++) {
                    for (let k = 0; k < exp.inventory_stage[i].etapa[l].elements[j].quantity.length; k++) {
                        //verificacao de unidade de medida
                        let massaEmGrama = 0;
                        if (exp.inventory_stage[i].etapa[l].elements[j].unit !== "gramas") {
                            if (exp.inventory_stage[i].etapa[l].elements[j].density === null) {
                                //verificando se tem ou nao densidade, se nao tiver, se trata de um valor em massa e segue o fluxo normal, se tiver, é outra conversao;
                                massaEmGrama = toISUnits.conversions(
                                    exp.inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    exp.inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas"
                                );
                            } else {
                                //precisa de alteracao na funcao chamada para funcionar
                                massaEmGrama = toISUnits.conversions(
                                    exp.inventory_stage[i].etapa[l].elements[j].quantity[k].value,
                                    exp.inventory_stage[i].etapa[l].elements[j].unit,
                                    "gramas",
                                    exp.inventory_stage[i].etapa[l].elements[j].density
                                );
                            }
                        } else {
                            massaEmGrama = exp.inventory_stage[i].etapa[l].elements[j].quantity[k].value;
                        }
                        //criação de somatórios
                        if (exp.inventory_stage[i].stage == "final") {
                            totalMass += massaEmGrama;
                        }
                        if (exp.inventory_stage[i].etapa[l].elements[j].especifity === "Residuo") {
                            mtrSum += massaEmGrama;
                        }
                        if (
                            exp.inventory_stage[i].etapa[l].elements[j].isRecyclable === true &&
                            exp.inventory_stage[i].etapa[l].elements[j].especifity === "Residuo"
                        ) {
                            mrrSum += exp.massaEmGrama;
                            for (let h = 0; h < exp.bombona_stage.length; h++) {
                                if (exp.bombona_stage[h].isToxic === true) {
                                    for (let r = 0; r < exp.bombona_stage[h].bombona.length; r++) {
                                        let massaEmGramaBombona = 0;
                                        if (
                                            exp.inventory_stage[i].etapa[l].elements[j].item ===
                                            exp.bombona_stage[h].bombona[r].quim_component
                                        ) {
                                            if (exp.bombona_stage[h].bombona[r].unit !== "gramas") {
                                                if (exp.inventory_stage[i].etapa[l].elements[j].density === null) {
                                                    massaEmGramaBombona = toISUnits.conversions(
                                                        exp.bombona_stage[h].bombona[r].value,
                                                        exp.bombona_stage[h].bombona[r].unit,
                                                        "gramas"
                                                    );
                                                } else {
                                                    //precisa de alteracao na funcao chamada para funcionar
                                                    massaEmGramaBombona = toISUnits.conversions(
                                                        exp.bombona_stage[h].bombona[r].value,
                                                        exp.bombona_stage[h].bombona[r].unit,
                                                        "gramas",
                                                        exp.inventory_stage[i].etapa[l].elements[j].density
                                                    );
                                                }
                                            } else {
                                                massaEmGramaBombona = exp.bombona_stage[h].bombona[r].value;
                                            }
                                            mrrSum -= massaEmGramaBombona;
                                        }
                                    }
                                }
                            }
                        }
                        if (exp.inventory_stage[i].etapa[l].elements[j].isBioDeposited.f !== null) {
                            mtadWithF += massaEmGrama * exp.inventory_stage[i].etapa[l].elements[j].isBioDeposited[0].f;
                        }
                        if (exp.inventory_stage[i].etapa[l].elements[j].isDegradable.td !== null) {
                            mdtrWithFt +=
                                massaEmGrama * (28 / exp.inventory_stage[i].etapa[l].elements[j].isDegradable[0].td);
                        }
                    }
                }
            }
        }

        //console em todas as variaveis
        console.log(
            "mtrSum: ",
            mtrSum,
            "mrrSum: ",
            mrrSum,
            "mtadWithF: ",
            mtadWithF,
            "mdtrWithFt: ",
            mdtrWithFt,
            "totalMass: ",
            totalMass
        );

        let ppwg_result = 0;

        if (totalMass !== 0) {
            ppwg_result = (mtrSum - mrrSum - mtadWithF - mdtrWithFt) / totalMass;
            console.log("ppwg_result 1: ", ppwg_result);
            ppwg_result = 1 - ppwg_result;
        }

        console.log("ppwg_result: ", ppwg_result);
        //término do cálculo 1;

        await exp.updateOne({
            ppwg_result,
        });

        try {
            await exp.save();
            return res.status(200).json({ msg: "Cálculo 1 realizado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },

    async get_calc2(req, res) {
        const id = req.params.id;
        const exp = await Exp.findById({ _id: id });

        //calc 2 itens;
        let qttEleDif = exp.etc_stage.length;
        let etc_result = 0;
        let produtorioEeCre = 1;

        //início do cálculo 2;
        for (let f = 0; f < qttEleDif; f++) {
            let cre = 0;
            for (let i = 0; i < exp.inventory_stage.length; i++) {
                for (let l = 0; l < exp.inventory_stage[i].etapa.length; l++) {
                    for (let j = 0; j < exp.inventory_stage[i].etapa[l].elements.length; j++) {
                        if (exp.etc_stage.quim_component === exp.inventory_stage[i].etapa[l].elements[j].item) {
                            if (cre < exp.inventory_stage[i].etapa[l].elements[j].concentrationInSet) {
                                cre = exp.inventory_stage[i].etapa[l].elements[j].concentrationInSet;
                            }
                        }
                    }
                }
            }
            produtorioEeCre = produtorioEeCre * (exp.etc_stage[f].ee / cre);
        }

        etc_result = (1 / qttEleDif) * Math.pow(produtorioEeCre, 1 / qttEleDif);

        //Fim cálculo 2;

        await exp.updateOne({
            etc_result,
        });

        try {
            await exp.save();
            return res.status(200).json({ msg: "Cálculo 2 realizado com sucesso" });
        } catch (err) {
            return res.status(500).json({ msg: "serverError" });
        }
    },
};
