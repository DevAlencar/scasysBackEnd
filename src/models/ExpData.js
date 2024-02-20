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
                quantity: {
                    type: Array,
                    value: {
                        type: String,
                        required: true,
                    },
                },
                unit: {
                    type: String,
                    required: true,
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
            },
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
        security_stage_one: {
            exposition: {
                type: Object,
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
                },
                src: {
                    type: String,
                    required: true,
                },
            },
            acumulation: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                fa: {
                    type: Object,
                    value: {
                        type: String,
                        required: true,
                    },
                    unit_esp: {
                        type: String,
                        required: true,
                    },
                    unit_met: {
                        type: String,
                        required: true,
                    },
                },
                src: {
                    type: String,
                    required: true,
                },
            },
        },
        cm_stage: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            cancer: {
                type: Boolean,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        security_stage_two: {
            exp_pot: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                fe: {
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
                src: {
                    type: String,
                    required: true,
                },
            },
            rgc: {
                quim_comp: {
                    type: String,
                    required: true,
                },
                quantity: {
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
                gas_pressure: {
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
                atm_pressure: {
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
                gas_state: {
                    type: String,
                    required: true,
                },
                amb_temp: {
                    type: Number,
                    required: true,
                },
                comp_tem: {
                    type: Number,
                    required: true,
                },
            },
            fri: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                inc_risc: {
                    type: Boolean,
                    required: true,
                },
                epa: {
                    type: Object,
                    entalpia: {
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
                    },
                },
                lie: {
                    type: Object,
                    limit: {
                        type: String,
                        required: true,
                    },
                    src: {
                        type: String,
                        required: true,
                    },
                },
                fu_point: {
                    type: Object,
                    fulgor: {
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
                    },
                },
            },
            fg_factor: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: String,
                    required: true,
                },
                unity: {
                    type: String,
                    required: true,
                },
                vgf: {
                    type: Object,
                    qtt: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                },
                atm_pressure: {
                    type: Object,
                    qtt: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                },
                src: {
                    type: String,
                    required: true,
                },
            },
            corros_factor: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                corros_tax: {
                    type: Object,
                    qtt: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                },
                temperature: {
                    type: Object,
                    qtt: {
                        type: String,
                        required: true,
                    },
                    unit: {
                        type: String,
                        required: true,
                    },
                },
                aacaa: {
                    type: Boolean,
                    required: true,
                },
                src: {
                    type: String,
                    required: true,
                },
            },
            corros_factor: {
                type: Object,
                quim_comp: {
                    type: String,
                    required: true,
                },
                number_of_security: {
                    type: Number,
                    required: true,
                },
            },
        },
        ce_stage: {
            type: Object,
            cata_ocorren: {
                type: Boolean,
                required: true,
            },
            dur_time_wo_cata: {
                type: Object,
                time: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            src: {
                type: String,
                required: true,
            },
        },
        energy_stage: {
            type: Object,
            cmd: {
                type: Object,
                quantity: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            process_dur: {
                type: Object,
                quantity: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            src: {
                type: String,
                required: true,
            },
        },
        global_warm: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            co2_mass: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        oz_dan: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            cfc_mass: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        pot_foto: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            oz_mass: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        pot_ac: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            ac_mols: {
                type: String,
                required: true,
            },
            src: {
                type: String,
                required: true,
            },
        },
        water_cons: {
            type: Object,
            total_vol: {
                type: Object,
                qtt: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            amb_temperature: {
                type: Object,
                qtt: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            water_temperature: {
                type: Object,
                qtt: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
            water_garb_temperature: {
                type: Object,
                qtt: {
                    type: String,
                    required: true,
                },
                unit: {
                    type: String,
                    required: true,
                },
            },
        },
        rad_ion: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            radio: {
                type: String,
                required: true,
            },
            amb_radio: {
                type: Object,
                value: {
                    type: String,
                    required: true,
                },
                src: {
                    type: String,
                    required: true,
                },
            },
        },
        rad_ion: {
            type: Object,
            quim_comp: {
                type: String,
                required: true,
            },
            mtcd: {
                type: Object,
                value: {
                    type: String,
                    required: true,
                },
                src: {
                    type: String,
                    required: true,
                },
            },
            menup: {
                type: String,
                required: true,
            },
        },
        hol_amb: {
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
    },
    { timestamps: true }
);

module.exports = mongoose.model("exp", ExpDataSchema);
