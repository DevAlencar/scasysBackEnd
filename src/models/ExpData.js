const mongoose = require("mongoose");

const ExpDataSchema = new mongoose.Schema(
    {
        autor: {
            type: String,
            required: true,
        },
        name_of_experiment: {
            type: String,
            required: true,
        },
        modo_de_calculo: {
            type: String,
            required: true,
        },
        inventory_stage: {
            type: Array,
            properties: {
                stage: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                num_of_reps: {
                    type: Number,
                    required: true,
                },
                //TODO:perguntar sobre etapa procedimental
                especifity: {
                    type: String,
                    required: true,
                },
                item: {
                    type: String,
                    required: true,
                },
                chem_form: {
                    type: String,
                    required: true,
                },
                //TODO:perguntar sobre página 4
                quantity: {
                    type: Array,
                    value: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                },
                observation: {
                    type: String,
                },
            },
        },
        ppgr_stage: {
            mmr: {
                type: String,
                required: true,
            }, //TODO:Verificar campos de seleção
            mtdr: {
                type: String,
                required: true,
            },
            mtad: {
                type: String,
                required: true,
            },
            td: {
                type: String,
                required: true,
            },
            f: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        security_stage: {
            quim_comp: {
                type: String,
                required: true,
            },
            conc_tox_lim: {
                type: Object,
                value: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            exp_time: {
                type: Object,
                value: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
                src: {
                    type: String,
                    required: true,
                }, //TODO:Verificar sobre as fontes bibliog´raficas
            },
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("exp", ExpDataSchema);

/*TODO:
    falar com guilherme para modelar os experimentos
*/
