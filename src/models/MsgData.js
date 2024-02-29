const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        msg: {
            type: String,
            required: [true, "É necessário uma msg"],
        },
        reason: {
            type: String,
            required: [true, "É necessário uma reason"],
        },
        page: {
            type: String,
            required: [true, "É necessário uma página"],
        },
        user_email: {
            type: String,
            required: [true, "É necessário um email"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("msgs", UserDataSchema);
