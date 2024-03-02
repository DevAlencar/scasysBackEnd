const mongoose = require("mongoose");

const FaDataSchema = new mongoose.Schema(
    {
        quim_component: {
            type: String,
        },
        fa: {
            type: String,
        },
        src: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("msgs", FaDataSchema);
