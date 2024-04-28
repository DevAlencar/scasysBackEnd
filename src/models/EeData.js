const mongoose = require("mongoose");

const EeDataSchema = new mongoose.Schema(
    {
        exp_id: {
            type: String,
        },
        quim_component: {
            type: String,
        },
        ee: {
            type: String,
        },
        src: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("eeStorage", EeDataSchema);

// schema responsável por organizar o dado "TD" separadamente.
