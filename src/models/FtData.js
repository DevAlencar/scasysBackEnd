const mongoose = require("mongoose");

const FtDataSchema = new mongoose.Schema(
    {
        exp_id: {
            type: String,
        },
        ft_data: [
            {
                quim_component: {
                    type: String,
                },
                ft: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("ftStorage", FtDataSchema);
