const mongoose = require("mongoose");

const ExpDataSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    institution: String,
});

module.exports = mongoose.model("exp", ExpDataSchema);

/*TODO:
    falar com guilherme para modelar os experimentos
*/
