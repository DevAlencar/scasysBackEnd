const mongoose = require("mongoose");

const FtDataSchema = new mongoose.Schema(
    {
        exp_id: {
            type: String,
        },
        quim_component: {
            type: String,
        },
        ft: {
            type: String,
        },
        src: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ftStorage", FtDataSchema);
