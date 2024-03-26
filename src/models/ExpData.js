const mongoose = require("mongoose");

const ExpDataSchema = new mongoose.Schema(
    {
        autor: {
            type: String,
        },
        autor_id: {
            type: String,
        },
        name_of_experiment: {
            type: String,
            required: [true, "É necessário um nome"],
        },
        modo_de_calculo: {
            type: String,
            required: [true, "É necessário um modo de calculo"],
        },
        inventory_stage: [
            {
                name: {
                    type: String,
                },
                etapa: [
                    {
                        type: Array,
                        name: {
                            type: String,
                        },
                        num_of_reps: {
                            type: Number,
                        },
                        elements: [
                            {
                                especifity: {
                                    type: String,
                                },
                                isRecyclable: {
                                    type: Boolean,
                                },
                                isBioDeposited: {
                                    type: Boolean,
                                },
                                isDegradable: [
                                    {
                                        verification: {
                                            type: Boolean,
                                        },
                                        ft: {
                                            type: Number,
                                        },
                                        src: {
                                            type: String,
                                        },
                                    },
                                ],
                                item: {
                                    type: String,
                                },
                                chem_form: {
                                    type: String,
                                },
                                quantity: [
                                    {
                                        type: Array,
                                        value: {
                                            type: Number,
                                        },
                                    },
                                ],
                                unit: {
                                    type: String,
                                },
                                observation: {
                                    type: String,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
        //todo:verificar se é necessário guardar esses valores de ppwg
        ppwg_stage: [
            {
                mtdr: {
                    type: Number,
                },
                mrr: {
                    type: Number,
                },
                mtad: {
                    type: Number,
                },
                mtr: {
                    type: Number,
                },
                ft: {
                    type: Number,
                },
                src: {
                    type: String,
                },
            },
        ],
        security_stage_one: [
            {
                exposition: {
                    type: Object,
                    quim_comp: {
                        type: String,
                    },
                    conc_tox_lim: [
                        {
                            type: Object,
                            value: {
                                type: String,
                            },
                            unit: {
                                type: String,
                            },
                        },
                    ],
                    exp_time: [
                        {
                            type: Object,
                            value: {
                                type: String,
                            },
                            unit: {
                                type: String,
                            },
                        },
                    ],
                    src: {
                        type: String,
                    },
                },
                acumulation: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        fa: [
                            {
                                type: Object,
                                value: {
                                    type: String,
                                },
                                unit_esp: {
                                    type: String,
                                },
                                unit_met: {
                                    type: String,
                                },
                            },
                        ],
                        src: {
                            type: String,
                        },
                    },
                ],
            },
        ],
        cm_stage: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                cancer: {
                    type: Boolean,
                },
                src: {
                    type: String,
                },
            },
        ],
        security_stage_two: [
            {
                exp_pot: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        fe: [
                            {
                                type: Object,
                                value: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        src: {
                            type: String,
                        },
                    },
                ],
                rgc: [
                    {
                        quim_comp: {
                            type: String,
                        },
                        quantity: [
                            {
                                type: Object,
                                value: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        gas_pressure: [
                            {
                                type: Object,
                                value: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        atm_pressure: [
                            {
                                type: Object,
                                value: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        gas_state: {
                            type: String,
                        },
                        amb_temp: {
                            type: Number,
                        },
                        comp_tem: {
                            type: Number,
                        },
                    },
                ],
                fri: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        inc_risc: {
                            type: Boolean,
                        },
                        epa: [
                            {
                                type: Object,
                                entalpia: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                                src: {
                                    type: String,
                                },
                            },
                        ],
                        lie: [
                            {
                                type: Object,
                                limit: {
                                    type: String,
                                },
                                src: {
                                    type: String,
                                },
                            },
                        ],
                        fu_point: [
                            {
                                type: Object,
                                fulgor: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                                src: {
                                    type: String,
                                },
                            },
                        ],
                    },
                ],
                fg_factor: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        quantity: {
                            type: String,
                        },
                        unity: {
                            type: String,
                        },
                        vgf: [
                            {
                                type: Object,
                                qtt: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        atm_pressure: [
                            {
                                type: Object,
                                qtt: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        src: {
                            type: String,
                        },
                    },
                ],
                corros_factor: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        corros_tax: [
                            {
                                type: Object,
                                qtt: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        temperature: [
                            {
                                type: Object,
                                qtt: {
                                    type: String,
                                },
                                unit: {
                                    type: String,
                                },
                            },
                        ],
                        aacaa: {
                            type: Boolean,
                        },
                        src: {
                            type: String,
                        },
                    },
                ],
                security_items: [
                    {
                        type: Object,
                        quim_comp: {
                            type: String,
                        },
                        number_of_security: {
                            type: Number,
                        },
                    },
                ],
            },
        ],
        ce_stage: [
            {
                type: Object,
                cata_ocorren: {
                    type: Boolean,
                },
                dur_time_wo_cata: [
                    {
                        type: Object,
                        time: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                src: {
                    type: String,
                },
            },
        ],
        energy_stage: [
            {
                type: Object,
                cmd: [
                    {
                        type: Object,
                        quantity: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                process_dur: [
                    {
                        type: Object,
                        quantity: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                src: {
                    type: String,
                },
            },
        ],
        global_warm: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                co2_mass: {
                    type: String,
                },
                src: {
                    type: String,
                },
            },
        ],
        oz_dan: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                cfc_mass: {
                    type: String,
                },
                src: {
                    type: String,
                },
            },
        ],
        pot_foto: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                oz_mass: {
                    type: String,
                },
                src: {
                    type: String,
                },
            },
        ],
        pot_ac: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                ac_mols: {
                    type: String,
                },
                src: {
                    type: String,
                },
            },
        ],
        water_cons: [
            {
                type: Object,
                total_vol: [
                    {
                        type: Object,
                        qtt: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                amb_temperature: [
                    {
                        type: Object,
                        qtt: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                water_temperature: [
                    {
                        type: Object,
                        qtt: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
                water_garb_temperature: [
                    {
                        type: Object,
                        qtt: {
                            type: String,
                        },
                        unit: {
                            type: String,
                        },
                    },
                ],
            },
        ],
        rad_ion: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                radio: {
                    type: String,
                },
                amb_radio: [
                    {
                        type: Object,
                        value: {
                            type: String,
                        },
                        src: {
                            type: String,
                        },
                    },
                ],
            },
        ],
        resor_cosum: [
            {
                type: Object,
                quim_comp: {
                    type: String,
                },
                mtcd: [
                    {
                        type: Object,
                        value: {
                            type: String,
                        },
                        src: {
                            type: String,
                        },
                    },
                ],
                menup: {
                    type: String,
                },
            },
        ],
        hol_amb: [
            {
                type: Object,
                value: {
                    type: String,
                },
                unit: {
                    type: String,
                },
            },
        ],
        ppwg_result: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("exp", ExpDataSchema);
