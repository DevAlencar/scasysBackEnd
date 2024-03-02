const mongoose = require("mongoose");

const CltDataSchema = new mongoose.Schema(
    {
        quim_component: {
            type: String,
        },
        clt: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("msgs", CltDataSchema);
