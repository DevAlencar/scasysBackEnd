const mongoose = require("mongoose");

const EtDataSchema = new mongoose.Schema(
    {
        quim_component: {
            type: String,
        },
        et: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("msgs", EtDataSchema);
