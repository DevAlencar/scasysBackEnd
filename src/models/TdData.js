const mongoose = require("mongoose");

const TdDataSchema = new mongoose.Schema(
    {
        exp_id: {
            type: String,
        },
        quim_component: {
            type: String,
        },
        td: {
            type: String,
        },
        src: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("tdStorage", TdDataSchema);

// schema responsável por organizar o dado "TD" separadamente.
