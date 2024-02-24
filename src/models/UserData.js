const mongoose = require("mongoose");

const UserDataSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "É necessário um email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "É necessário uma senha"],
        },
        name: {
            type: String,
            required: [true, "É necessário um nome"],
        },
        institution: {
            type: String,
            required: [true, "É necessário uma instituição"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", UserDataSchema);
